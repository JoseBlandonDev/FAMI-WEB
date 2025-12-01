import { Montserrat } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import AppShell from '@/components/layout/AppShell';
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'FAMI - Fundación y Servicios de Salud',
  description: 'Servicios de salud de alta calidad en Colombia. Salud ocupacional, apoyos pedagógicos y servicios IPS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans bg-white text-fami-text antialiased`}>
        <AuthProvider>
          <AppShell
            navbar={<Navbar />}
            sidebar={<SocialSidebar />}
            footer={<Footer />}
          >
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
