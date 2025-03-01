import * as chains from "wagmi/chains";

export const chainDetails: Record<
  number,
  { explorer: string; nftContractAddress: string }
> = {
  [chains.base.id]: {
    nftContractAddress: "0xc5d0C25f49010D7C250AF970Ea241701be9d4E05",
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
