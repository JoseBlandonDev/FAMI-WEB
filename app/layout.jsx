import { Montserrat } from 'next/font/google';
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'FAMI Web - Fundación y Clínica',
  description: 'Servicios de salud de alta calidad en Colombia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans bg-fami-gray text-fami-text antialiased`}>
        {/* <Navbar /> will be injected here */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* <Footer /> will be injected here */}
      </body>
    </html>
  );
}
