import { useWallet } from '@/hooks/useWallet';

const WalletButton = () => {
  const { isConnected, isConnecting, address, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <button
        onClick={disconnect}
        className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white disabled:opacity-50"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton;
