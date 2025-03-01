const { Wallet, Provider } = require("zksync-web3");
const { Deployer } = require("@matterlabs/hardhat-zksync-deploy");
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const baseURI = "https://4icer-eiaaa-aaaal-ar7lq-cai.icp0.io/agents";

  // Initialize the wallet.
  const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
  if (!PRIVATE_KEY) {
    throw new Error("Please set PRIVATE_KEY in your .env file");
  }

  // Get provider
  const provider = new Provider("https://testnet.era.zksync.dev");

  // Initialize the wallet with provider
  const wallet = new Wallet(PRIVATE_KEY, provider);

  console.log("Wallet address:", wallet.address);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("NftsWithBenefits");

  // Estimate deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, [baseURI]);
  console.log(`Deployment fee: ${deploymentFee.toString()} ETH`);

  // Deploy this contract. Constructor args are: baseURI
  console.log("Deploying MyNFT...");
  const myNFT = await deployer.deploy(artifact, [baseURI]);

  // Show the contract info.
  const contractAddress = await myNFT.getAddress();
  console.log(`MyNFT deployed to: ${contractAddress}`);

  // Wait for the contract to be deployed
  await myNFT.waitForDeployment();
  console.log("Deployment completed");

  // Verify the contract
  console.log("Verifying contract...");
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [baseURI],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
