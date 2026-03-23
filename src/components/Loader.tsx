'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 2200);
    const unmountTimer = setTimeout(() => setMounted(false), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`loading-screen${visible ? '' : ' hidden'}`}>
      <div className="logo-container">
        <Image src="/img/logo.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
        <div className="loader" />
      </div>
    </div>
  );
}
