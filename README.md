# NFTsWithBenefits

Fully decentralized AI agents that evolve with usage, represented by a dynamic NFT.

## Description

This AI-powered dynamic NFT project revolutionizes how AI agents are created, owned, and utilized. These agents serve as personalized assistants for research, automation, customer support, and creative tasks, continuously improving as they gain experience. In blockchain gaming and metaverses, they can act as intelligent NPCs, trainers, or battle companions, evolving based on real interactions. Businesses can leverage them for AI-as-a-Service (AIaaS), renting or selling specialized agents for consulting, trading strategies, or legal assistance. In Web3, they enhance security by monitoring smart contracts, managing DeFi portfolios, and automating blockchain transactions. Additionally, they streamline decentralized learning and work by acting as research assistants, proofreaders, or coders, becoming more skilled over time. Unlike static AI models, these NFTs grow, specialize, and increase in value, enabling new economic models where AI capabilities are tradeable, rentable, and ever-evolving. This innovation makes AI not just a tool but a dynamic, personalized asset in the digital economy.

This project stands out by combining AI evolution, dynamic NFTs, and decentralized storage, offering users a unique way to create and own intelligent agents that grow over time. Unlike static AI-powered NFTs, which remain unchanged after minting, this platform enables real-time trait evolution, allowing AI agents to gain experience, refine skills, and specialize based on user interactions. The metadata updates dynamically and remains verifiable on-chain, ensuring transparency and authenticity. Compared to existing projects like Alethea AI, which creates AI-driven avatars but lacks true NFT evolution, or Altered State Machine (ASM), which focuses on AI-driven gaming assets, this platform extends beyond a single-use case by offering a multi-purpose AI assistant that adapts and improves across different domains. Additionally, leveraging ICP canisters for metadata storage provides a decentralized and scalable solution, reducing reliance on traditional off-chain storage methods like IPFS. By integrating multi-chain minting, interactive AI agents, and an intuitive creation process, the project transforms AI into an evolving digital asset that is both personalized and tradable, setting a new standard in the AI x NFT space.

## Usage

When a user opens the website, the first thing hemust do is connect his EVM wallet and select whichever chain he prefers. After that he can proceed by clicking the "Create your first agent" button. Once he does this, he is prompted to input the agent's identity, meaning the name, description and avatar. This is the first step. The second step is to define its traits and skills. The third step is to choose the specializations, and the final one is to review all data. Here the user can see the metadata file that will represent his NFT. If the user is satisfied with his choices, he clicks the "create agent" button to indeed generate his agent. What this does is it stores the metadata object on an ICP canister, which is retrievable by HTTPS, and it mints an NFT on the selected chain, that references the created metadata, to the user's wallet. He can then chat with his agent, and as he does, his traits evolve, making the agent more and more knowledgeable, which is reflected by the updating metadata on-chain. Aditionally, the user can interact with other agents he has created previously, by clicking the "Agents" button on the Navbar and selecting the agent he wants to converse with.

## Development

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```js
git clone https://github.com/0xdorifto/NFTsWithBenefits.git
cd NFTsWithBenefits
```

### 2. Install Dependencies

```js
npm install
```

### 3. Set Up Environment Variables
Create a .env.local file in the root directory and add the required environment variable:

```js
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start Development Server

```js
npm run dev
```

This will start the frontend development server at http://localhost:3000.

### 5. Run the Local Development Emulator (Optional)
If you need the Juno emulator (requires Docker), run:

```js
juno dev start
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                                      |
| :--------------- | :---------------------------------------------------------- |
| `npm install`    | Installs dependencies                                       |
| `npm run dev`    | Starts frontend dev server at `localhost:3000`              |
| `juno dev start` | Quickstart the local development emulator (requires Docker) |
| `npm run build`  | Build your production site to `./out/`                      |
| `juno deploy`    | Deploy your project to a Satellite                          |

## Deployments

| Chain            | Address                                                                                                                               |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| ICP              | [4icer-eiaaa-aaaal-ar7lq-cai](https://dashboard.internetcomputer.org/canister/4icer-eiaaa-aaaal-ar7lq-cai)                            |
| Base             | [0xc5d0C25f49010D7C250AF970Ea241701be9d4E05](https://basescan.org/address/0xc5d0C25f49010D7C250AF970Ea241701be9d4E05)                 |
| Zircuit Testnet  | [0x4ef6d338000C15BB00Fb90e3f81F8123Bca4C5c9](https://explorer.testnet.zircuit.com/address/0x4ef6d338000C15BB00Fb90e3f81F8123Bca4C5c9) |
| Hedera Testnet   | [0xd8156C4D1D0f402e4ddb43592b3F573fABf0fCb9](https://hashscan.io/testnet/contract/0.0.5639768?pr=1&ps=1&pf=1&pa=1)                    |
| Flow Testnet     | [0x8e0843bDFd5D86a033d46986d08464060e19a501](https://evm-testnet.flowscan.io/address/0x8e0843bDFd5D86a033d46986d08464060e19a501)      |
| Taraxa Testnet   | [0xd8156C4D1D0f402e4ddb43592b3F573fABf0fCb9](https://testnet.to/address/0xd8156C4D1D0f402e4ddb43592b3F573fABf0fCb9)                   |

## Team

This team is composed by Gastão Faria and Cláudio Barreira, two blockchain developers from Lisbon, Portugal. We've both been working on blockchain applications for 2 years, and more on software overall, with computer science backgrounds. We've been to multiple web3 hackathons and are proud to say we've won a few. Cláudio usually works on the Interfaces whereas Gastão does the smart contracts.

## Zircuit Feedback

We used Zircuit to host the NFT collection. We enjoyed working with zircuit as the experience was similar to developing on Ethereum and easy to use.
