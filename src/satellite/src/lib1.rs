use ic_cdk::api::management_canister::http_request::{
    http_request as http_request_outcall, CanisterHttpRequestArgument, HttpMethod,
};
use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, set_doc_store, OnSetDocContext, SetDoc};
use junobuild_utils::encode_doc_data;
use serde::{Deserialize, Serialize};

// The data of the document we are looking to update in the Satellite's Datastore.
#[derive(Serialize, Deserialize)]
struct ChatData {
    src: Option<String>,
}

// We are using the Dog CEO API in this example.
// https://dog.ceo/dog-api/
//
// Its endpoint "random" returns such JSON data:
// {
//     "message": "https://images.dog.ceo/breeds/mountain-swiss/n02107574_1118.jpg",
//     "status": "success"
// }
//
// That's why we declare a struct that matches the structure of the answer.
#[derive(Serialize, Deserialize)]
struct DogApiResponse {
    message: String,
    status: String,
}

#[derive(Serialize, Deserialize)]
struct OpenAiApiResponse {
    object: String,
    data: Vec<ChatCompletion>,
    first_id: String,
    last_id: String,
    has_more: bool,
}

#[derive(Serialize, Deserialize)]
struct ChatCompletion {
    object: String,
    id: String,
    model: String,
    created: i64,
    request_id: String,
    tool_choice: Option<serde_json::Value>,
    usage: Usage,
    seed: i64,
    top_p: f64,
    temperature: f64,
    presence_penalty: f64,
    frequency_penalty: f64,
    system_fingerprint: String,
    input_user: Option<serde_json::Value>,
    service_tier: String,
    tools: Option<serde_json::Value>,
    metadata: serde_json::Value,
    choices: Vec<Choice>,
    response_format: Option<serde_json::Value>,
}

#[derive(Serialize, Deserialize)]
struct Usage {
    total_tokens: i32,
    completion_tokens: i32,
    prompt_tokens: i32,
}

#[derive(Serialize, Deserialize)]
struct Choice {
    index: i32,
    message: Message,
    finish_reason: String,
    logprobs: Option<serde_json::Value>,
}

#[derive(Serialize, Deserialize)]
struct Message {
    content: String,
    role: String,
    tool_calls: Option<serde_json::Value>,
    function_call: Option<serde_json::Value>,
}

#[on_set_doc(collections = ["messages"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // 1. Prepare the HTTP GET request
    let url = "https://api.openai.com/v1/chat/completions".to_string();

    // Add required headers for OpenAI API
    let request_headers = vec![
        (
            "Authorization".to_string(),
            format!(
                "Bearer {}",
                std::env::var("OPENAI_API_KEY").map_err(|e| e.to_string())?
            ),
        ),
        ("Content-Type".to_string(), "application/json".to_string()),
    ];

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        // In this simple example we skip sanitizing the response with a custom function for simplicity reason.
        transform: None,
        // We do not require any particular HTTP headers in this example.
        headers: request_headers,
    };

    // 2. Execute the HTTP request. A request consumes Cycles(!). In this example we provide 2_000_000_000 Cycles (= 0.002 TCycles).
    // To estimate the costs see documentation:
    // - https://internetcomputer.org/docs/current/developer-docs/gas-cost#special-features
    // - https://internetcomputer.org/docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works#pricing
    // Total amount of cycles depends on the subnet size. Therefore, on mainnet it might cost ~13x more than what's required when developing locally. Source: https://forum.dfinity.org/t/http-outcalls-cycles/27439/4
    // Note: In the future we will have a UI logging panel in console.juno.build to help debug on production. Follow PR https://github.com/junobuild/juno/issues/415.
    //
    // We rename ic_cdk::api::management_canister::http_request::http_request to http_request_outcall because the Satellite already includes such a function's name.
    match http_request_outcall(request, 2_000_000_000).await {
        Ok((response,)) => {
            // 3. Use serde_json to transform the response to a structured object.
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");

            let response: OpenAiApiResponse =
                serde_json::from_str(&str_body).map_err(|e| e.to_string())?;

            // 4. Our goal is to update the document in the Datastore with an update that contains the link to the image fetched from the API we just called.
            let chat: ChatData = ChatData {
                src: Some(response.data[0].message.content),
            };

            println!("chat: {:?}", chat);

            // // 5. We encode those data back to blob because the Datastore holds data as blob.
            // let encode_data = encode_doc_data(&chat)?;

            // // 6. Then we construct the parameters required to call the function that save the data in the Datastore.
            // let doc: SetDoc = SetDoc {
            //     data: encode_data,
            //     description: context.data.data.after.description,
            //     version: context.data.data.after.version,
            // };

            // // 7. We store the data in the Datastore for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
            // set_doc_store(
            //     context.caller,
            //     context.data.collection,
            //     context.data.key,
            //     doc,
            // )?;

            Ok(())
        }
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            Err(message)
        }
    }
}

include_satellite!();
