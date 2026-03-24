'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Guests',         href: '#guests'      },
  { label: 'Information',    href: '#acces'       },
  { label: 'Notre histoire', href: '#histoire'    },
  { label: 'FAQ',            href: '#faq'         },
  { label: 'Ma place',       href: '#billetterie' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav>
        {/* Logo gauche */}
        <Link href="/" className="nav-logo-img">
          <Image src="/img/logo.png" alt="Vano Baby" width={48} height={48} priority />
        </Link>

        {/* Liens desktop */}
        <ul className="nav-links">
          {links.map((l, i) => (
            <Fragment key={l.href}>
              <li>
                <Link
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  {l.label}
                </Link>
              </li>
              {i < links.length - 1 && (
                <li className="nav-sep" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </ul>

        {/* Logo droite */}
        <Link href="/" className="nav-logo-img nav-logo-right" aria-hidden="true" tabIndex={-1}>
          <Image src="/img/logo.png" alt="" width={48} height={48} />
        </Link>

        {/* Hamburger mobile */}
        <button
          className={`nav-burger${open ? ' is-open' : ''}`}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Overlay mobile */}
      <div className={`nav-drawer${open ? ' is-open' : ''}`}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => { e.preventDefault(); setOpen(false); document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
