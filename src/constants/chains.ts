import * as chains from "wagmi/chains"

export const chainDetails: Record<number, {explorer: string; nftContractAddress:string}> = {
  [chains.base.id]: {
    nftContractAddress: "0xFd605672F433fbA1Fb044b3AB10027dF67f518e7",
    explorer: chains.base.blockExplorers.default.url 
  }
}


