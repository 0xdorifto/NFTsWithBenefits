import { Chain, RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { base, baseGoerli } from 'viem/chains';

const chains: readonly [Chain, ...Chain[]] = [base, baseGoerli];

const config = getDefaultConfig({
  appName: 'AI Arena',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: any }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
