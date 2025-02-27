import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Web3Provider } from '../providers/web3Provider';
import dynamic from "next/dynamic";


const Navigation = dynamic(
  () => import("@/components/common/Navigation").then((res) => res.default),
  { ssr: false }
);


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <div className="flex flex-col h-screen">
      <Navigation />
      <div className="pt-16 flex-1 flex"> {/* Add padding to account for fixed navbar */}
        <Component {...pageProps} />
      </div>
      </div>
    </Web3Provider>
  );
}
