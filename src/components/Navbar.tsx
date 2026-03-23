import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <div className="nav-logo">VANO <span>BABY</span></div>
      <ul className="nav-links">
        <li><Link href="#">La Hype</Link></li>
        <li><Link href="#">L'Artiste</Link></li>
        <li><Link href="#">Tickets</Link></li>
        <li><Link href="#">AccÃ¨s</Link></li>
      </ul>
      <Link href="#" className="nav-pill">RÃ©server</Link>
    </nav>
  );
}
