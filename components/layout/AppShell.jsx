"use client";

import { usePathname } from 'next/navigation';

export default function AppShell({ navbar, sidebar, footer, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      {sidebar}
      <main className="min-h-screen">
        {children}
      </main>
      {footer}
    </>
  );
}

