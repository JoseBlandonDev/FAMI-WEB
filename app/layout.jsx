import { Montserrat } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
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
        <Navbar />
        <SocialSidebar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
