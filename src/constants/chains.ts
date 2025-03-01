import * as chains from "wagmi/chains";

export const chainDetails: Record<
  number,
  { explorer: string; nftContractAddress: string }
> = {
  [chains.base.id]: {
    nftContractAddress: "0x27B20F4D9De56E21f632b9A61429B03d9D93aBc6",
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
