import { useState, useEffect } from 'react';
import { createWalletClient, custom, WalletClient } from 'viem';
import { mainnet } from 'viem/chains';
import { toast } from 'react-hot-toast';

interface WalletState {
  address: `0x${string}` | null;
  isConnected: boolean;
  isConnecting: boolean;
  isInitialized: boolean;
  walletClient: WalletClient | null;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    isInitialized: false,
    walletClient: null,
  });

  useEffect(() => {
    const initWallet = async () => {
      await checkConnection();
      setWalletState(prev => ({ ...prev, isInitialized: true }));
    };
    
    initWallet();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        const walletClient = createWalletClient({
          chain: mainnet,
          transport: custom(window.ethereum)
        });

        const [address] = await walletClient.getAddresses();
        
        if (address) {
          setWalletState({
            address,
            isConnected: true,
            isConnecting: false,
            walletClient,
          });
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      setWalletState({
        address: null,
        isConnected: false,
        isConnecting: false,
        walletClient: null,
      });
      toast.error('Wallet disconnected');
    } else {
      setWalletState(prev => ({
        ...prev,
        address: accounts[0] as `0x${string}`,
        isConnected: true,
      }));
      toast.success('Wallet account changed');
    }
  };

  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Please install MetaMask to connect wallet');
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      });

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const [address] = await walletClient.getAddresses();

      setWalletState({
        address,
        isConnected: true,
        isConnecting: false,
        walletClient,
      });

      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnect = () => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      walletClient: null,
    });
    toast.success('Wallet disconnected');
  };

  return {
    ...walletState,
    connect,
    disconnect,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
