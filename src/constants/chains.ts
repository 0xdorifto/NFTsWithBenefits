import * as chains from "wagmi/chains";

export const chainDetails: Record<
  number,
  { explorer: string; nftContractAddress: string }
> = {
  [chains.base.id]: {
    nftContractAddress: "0xD9618DD71869d8E6899C06a551BD1081454cF1C9",
    explorer: chains.base.blockExplorers.default.url,
  },
  // [chains.zircuit.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
  // [chains.flow.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
  // [chains.hedera.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
  // [chains.taraxa.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
  // [chains.zksync.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
  // [chains.u2u.id]: {
  //   nftContractAddress: "",
  //   explorer: chains.base.blockExplorers.default.url,
  // },
};
