'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';

const links = [
  { label: 'Guests',         href: '#guests'      },
  { label: 'Information',    href: '#acces'       },
  { label: 'Notre histoire', href: '#histoire'    },
  { label: 'FAQ',            href: '#faq'         },
  { label: 'Mon ticket',     href: '#billetterie' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo-img">
          <Image src="/img/logo.png" alt="Vano Baby" width={48} height={48} priority />
        </Link>

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

        <Link href="/" className="nav-logo-img nav-logo-right" aria-hidden="true" tabIndex={-1}>
          <Image src="/img/logo.png" alt="" width={48} height={48} />
        </Link>

        <button
          className={`nav-burger${open ? ' is-open' : ''}`}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {mounted &&
        createPortal(
          <>
            <div className={`nav-drawer${open ? ' is-open' : ''}`}>
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
          </>,
          document.body
        )}
    </>
  );
}
