require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");

module.exports = {
  solidity: "0.8.20",
  zksolc: {
    version: "1.5.11",
    compilerSource: "binary",
    settings: {},
  },
  networks: {
    zircuit: {
      url: "https://zircuit1-testnet.p2pify.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    flow: {
      url: "https://flow-testnet.g.alchemy.com/v2/0OhHdpFcyUwIiM3bFlPdhNWgmfq1w8vk",
      accounts: [process.env.PRIVATE_KEY],
    },
    hedera: {
      url: "https://testnet.hashio.io/api",
      accounts: [process.env.PRIVATE_KEY],
    },
    base: {
      url: "https://base-mainnet.g.alchemy.com/v2/0OhHdpFcyUwIiM3bFlPdhNWgmfq1w8vk",
      accounts: [process.env.PRIVATE_KEY],
    },
    taraxa: {
      url: "https://rpc.testnet.taraxa.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    zksync: {
      url: "https://zksync-sepolia.g.alchemy.com/v2/0OhHdpFcyUwIiM3bFlPdhNWgmfq1w8vk",
      accounts: [process.env.PRIVATE_KEY],
      zksync: true,
      ethNetwork: "sepolia",
    },
    U2U: {
      url: "https://rpc-mainnet.u2u.xyz",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "zircuit",
        chainId: 48899,
        urls: {
          apiURL:
            "https://explorer.testnet.zircuit.com/api/contractVerifyHardhat",
          browserURL: "https://explorer.testnet.zircuit.com",
        },
      },
      {
        network: "flow",
        chainId: 545,
        urls: {
          apiURL: "https://evm-testnet.flowscan.io/api",
          browserURL: "https://evm-testnet.flowscan.io/",
        },
      },
      {
        network: "taraxa",
        chainId: 842,
        urls: {
          apiURL: "https://testnet.to/api",
          browserURL: "https://testnet.to/",
        },
      },
    ],
  },
};
