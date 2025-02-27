import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4">
      <Link href="/" className="flex items-center">
        <Image src="/assets/logo.svg" alt="AI Arena Logo" width={150} height={40} />
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/challenges" className="hover:text-primary">Challenges</Link>
        <Link href="/agents" className="hover:text-primary">Agents</Link>
        <Link href="/leaderboard" className="hover:text-primary">Leaderboard</Link>
        <Link href="/profile" className="hover:text-primary">Profile</Link>
      </nav>

      <button className="rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/90 transition-colors">
        Connect
      </button>
    </header>
  );
}
