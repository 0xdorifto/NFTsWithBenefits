import { Logo } from "./Logo";

const Topbar = () => {
  return (
    <div className="z-30 fixed w-full top-0">
      <div className="flex w-full justify-between gap-4 px-6 py-4 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <Logo />
       
{/* 
        <div>
          <button className="relative inline-flex group items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-lg overflow-hidden">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">Connect Wallet</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Topbar;
