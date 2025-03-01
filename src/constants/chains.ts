import * as chains from "wagmi/chains"

export const chainDetails: Record<number, {explorer: string; nftContractAddress:string}> = {
  [chains.base.id]: {
    nftContractAddress: "0x7Ae0FC7Afc033517FdbE8Ef1d81C91031df0E4DA",
    explorer: chains.base.blockExplorers.default.url 
  }
}


