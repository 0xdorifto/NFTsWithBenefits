import * as chains from "wagmi/chains";

export const chainDetails: Record<
  number,
  { explorer: string; nftContractAddress: string, gallery?: string }
> = {
  [chains.base.id]: {
    nftContractAddress: "0xc5d0C25f49010D7C250AF970Ea241701be9d4E05",
    explorer: chains.base.blockExplorers.default.url,
    gallery: "https://opensea.io/assets/base"
  },
  // zircuit testnet
  48899: {
    nftContractAddress: "0x4ef6d338000C15BB00Fb90e3f81F8123Bca4C5c9",
    explorer: "https://explorer.testnet.zircuit.com/",
  },
  // flow testnet
  545: {
    nftContractAddress: "0x8e0843bDFd5D86a033d46986d08464060e19a501",
    explorer: "https://evm-testnet.flowscan.io/",
  },
  // hedera testnet
  296: {
    nftContractAddress: "0xd8156C4D1D0f402e4ddb43592b3F573fABf0fCb9",
    explorer: "https://hashscan.io/testnet/",
  },
  // taraxa testnet
  842: {
    nftContractAddress: "0xd8156C4D1D0f402e4ddb43592b3F573fABf0fCb9",
    explorer: "https://testnet.to/",
  },
  // [chains.zksync.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
  // [chains.u2u.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
};
