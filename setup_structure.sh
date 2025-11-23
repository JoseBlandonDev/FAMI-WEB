#!/bin/bash

# Scaffolding script for FAMI Web (Next.js 14 + Tailwind CSS)

echo "Starting FAMI Web scaffolding..."

# 1. Create Folder Structure
echo "Creating directory structure..."
mkdir -p app/nosotros
mkdir -p app/servicios-ips
mkdir -p app/salud-ocupacional
mkdir -p app/contacto
mkdir -p components/ui
mkdir -p components/layout
mkdir -p components/sections
mkdir -p public/logos
mkdir -p public/images

# 2. Create Configuration Files

# A. tailwind.config.js
echo "Generating tailwind.config.js..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fami: {
          blue: '#2E3A8C',
          cyan: '#6C8CD5',
          orange: '#FF7F32',
          gray: '#F8F9FA',
          text: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};
EOF

# B. .cursorrules
echo "Generating .cursorrules..."
cat > .cursorrules << 'EOF'
You are a Senior Frontend Developer expert in Next.js 14 and Healthcare UX.
- **Style Guide:** Strictly follow the FAMI Identity. Use `bg-fami-blue` for primary headers and `bg-fami-orange` for CTA buttons.
- **Vibe:** Clinical, Professional, Symmetric. Avoid "playful" or cluttered designs.
- **Content:** Do not invent text. Use strictly the provided content from revision documents.
- **Code Quality:** Create modular components in `/components`. Prioritize mobile responsiveness.
EOF

# C. components/ui/Button.jsx
echo "Generating components/ui/Button.jsx..."
cat > components/ui/Button.jsx << 'EOF'
import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-fami-orange text-white hover:bg-orange-600 focus:ring-fami-orange",
    outline: "border-2 border-fami-blue text-fami-blue hover:bg-fami-blue hover:text-white focus:ring-fami-blue",
    ghost: "text-fami-blue hover:bg-fami-gray focus:ring-fami-blue",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
EOF

# D. app/layout.jsx
echo "Generating app/layout.jsx..."
cat > app/layout.jsx << 'EOF'
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
EOF

# Extra: app/globals.css (Required for Tailwind)
echo "Generating app/globals.css..."
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# E. README.md
echo "Generating README.md..."
cat > README.md << 'EOF'
# FAMI Web

## Project Context
A professional healthcare website for an IPS (Clinic) and Foundation in Colombia.

## Folder Structure (Business Domain Based)
- `/app`: App Router pages
  - `layout.jsx`: Root layout (Montserrat font & Metadata)
  - `page.jsx`: Home Page
  - `/nosotros`: Institutional: Mission/Vision/Allies
  - `/servicios-ips`: B2C: Medical Services & Pricing
  - `/salud-ocupacional`: B2B: Corporate Services & Wellness Plans
  - `/contacto`: Contact Form & Locations
- `/components`: React Components
  - `/ui`: Atomic UI (Buttons, Cards, Inputs)
  - `/layout`: Global (Navbar, Footer)
  - `/sections`: Organisms (Hero, AlliesGrid, etc.)
- `/public`: Static assets

## Design Tokens
- **Primary Blue:** `#2E3A8C` (Headers/Brand)
- **Accent Cyan:** `#6C8CD5` (Details/Decorations)
- **Action Orange:** `#FF7F32` (Buttons/CTA)
- **Clinical Gray:** `#F8F9FA` (Backgrounds)
- **Text Color:** `#1F2937`
- **Font:** Montserrat

## Setup
1. Run `npm install`
2. Run `npm run dev`
EOF

# Generate Placeholder Pages
echo "Generating placeholder pages..."

# app/page.jsx
cat > app/page.jsx << 'EOF'
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold text-fami-blue mb-6">FAMI Web</h1>
      <div className="w-full max-w-4xl h-64 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-dashed border-fami-cyan mb-8">
        <span className="text-fami-cyan font-medium">Hero Carousel Placeholder</span>
      </div>
      <div className="flex gap-4">
        <Button variant="primary">Agendar Cita</Button>
        <Button variant="outline">Conocer Más</Button>
      </div>
    </div>
  );
}
EOF

# Generic page generator function
create_page() {
  local path=$1
  local title=$2
  cat > "$path" << EOF
import React from 'react';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-fami-blue mb-6">$title</h1>
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <p className="text-fami-text">Contenido de la sección: $title</p>
      </div>
    </div>
  );
}
EOF
}

create_page "app/nosotros/page.jsx" "Nosotros"
create_page "app/servicios-ips/page.jsx" "Servicios IPS"
create_page "app/salud-ocupacional/page.jsx" "Salud Ocupacional"
create_page "app/contacto/page.jsx" "Contacto"

echo "Scaffolding complete! Don't forget to install dependencies if this is a fresh project."
echo "Recommended: npm install next react react-dom tailwindcss postcss autoprefixer lucide-react"
