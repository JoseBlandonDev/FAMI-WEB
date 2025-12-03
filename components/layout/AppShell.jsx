"use client";

import { usePathname } from 'next/navigation';

export default function AppShell({ navbar, whatsapp, footer, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      {whatsapp}
      <main className="min-h-screen">
        {children}
      </main>
      {footer}
    </>
  );
}
