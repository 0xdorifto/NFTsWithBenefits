const hre = require("hardhat");

async function main() {
  const baseURI = "https://4icer-eiaaa-aaaal-ar7lq-cai.icp0.io/agents/";

  const MyNFT = await hre.ethers.getContractFactory("NftsWithBenefits");
  const myNFT = await MyNFT.deploy(baseURI);

  await myNFT.waitForDeployment();

  const contractAddress = await myNFT.getAddress();
  console.log("MyNFT deployed to:", contractAddress);

  // Wait for a few block confirmations to ensure the deployment is confirmed
  console.log("Waiting for block confirmations...");
  await myNFT.deploymentTransaction().wait(5);

  // Verify the contract
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [baseURI],
    });
    console.log("Contract verified successfully");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract is already verified!");
    } else {
      console.error("Error verifying contract:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
