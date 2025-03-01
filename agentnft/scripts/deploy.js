const hre = require("hardhat");

async function main() {
  const baseURI = "https://4icer-eiaaa-aaaal-ar7lq-cai.icp0.io/agents";

  const MyNFT = await hre.ethers.getContractFactory("NftsWithBenefits");
  const myNFT = await MyNFT.deploy(baseURI);

  await myNFT.waitForDeployment();

  console.log("MyNFT deployed to:", await myNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
