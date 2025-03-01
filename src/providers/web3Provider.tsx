import {
  Chain,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseGoerli, sepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";

const chains: readonly [Chain, ...Chain[]] = [base, baseGoerli, sepolia];

const config = getDefaultConfig({
  appName: "AI Arena",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: any }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
