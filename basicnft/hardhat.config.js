require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/0OhHdpFcyUwIiM3bFlPdhNWgmfq1w8vk",
      accounts: [process.env.PRIVATE_KEY],
    },
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
      url: "https://base-sepolia.g.alchemy.com/v2/0OhHdpFcyUwIiM3bFlPdhNWgmfq1w8vk",
      accounts: [process.env.PRIVATE_KEY],
    },
    taraxa: {
      url: "https://rpc.testnet.taraxa.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    zksync: {
      url: "https://zksync-sepolia.g.alchemy.com/v2/0OhHdpFcyUwIiM3bFlPdhNWgmfq1w8vk",
      accounts: [process.env.PRIVATE_KEY],
    },
    U2U: {
      url: "https://rpc-mainnet.u2u.xyz",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

//zircuit, flow, hedera, base, taraxa, zksync, U2U
