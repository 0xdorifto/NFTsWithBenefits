import { CenteredLayout } from '../components/layouts/CenteredLayout';
import { Logo } from '../components/Logo';

export const Login = () => {
  const handleLogin = () => {
    console.log('Login clicked');
  };

  return (
    <CenteredLayout>
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        <div className="relative px-12 py-10 bg-black/90 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
          <div className="space-y-8 w-[420px]">
            {/* Updated Logo/Title Section */}
            <div className="relative flex flex-col items-center">
              <Logo className="scale-150 mb-6" />
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Create and manage dynamic NFTs on the Internet Computer with unprecedented control and flexibility
              </p>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-px text-lg shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-black px-8 py-4 transition-all duration-200 group-hover:bg-opacity-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="text-white font-medium">Connect with Internet Identity</span>
              </span>
            </button>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              {["Dynamic", "Mutable", "Flexible", "Powerful"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full text-purple-400 border border-purple-800 bg-purple-900/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CenteredLayout>
  );
};
