'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'La Hype',    href: '#hype'       },
  { label: "L'Artiste",  href: '#histoire'   },
  { label: 'Accès',      href: '#acces'      },
  { label: 'FAQ',        href: '#faq'        },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav>
        {/* Logo */}
        <Link href="/" className="nav-logo-img">
          <Image src="/img/logo.png" alt="Vano Baby" width={48} height={48} priority />
        </Link>

        {/* Liens desktop */}
        <ul className="nav-links">
          {links.map((l, i) => (
            <Fragment key={l.href}>
              <li>
                <Link href={l.href}>{l.label}</Link>
              </li>
              {i < links.length - 1 && (
                <li className="nav-sep" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </ul>

        {/* CTA */}
        <Link href="#billetterie" className="nav-cta">
          Prendre mes places
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
              <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="#billetterie" className="nav-cta" onClick={() => setOpen(false)}>
              Prendre mes places
            </Link>
          </li>
        </ul>
      </div>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
