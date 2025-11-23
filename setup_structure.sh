#!/bin/bash

# FAMI Web - Project Structure Setup Script
# Healthcare Website for IPS and Foundation in Colombia
# Next.js 14 + Tailwind CSS + Lucide React

set -e

echo "🏥 Setting up FAMI Web project structure..."

# Create directory structure
echo "📁 Creating folder structure..."

# App Router structure
mkdir -p app/nosotros
mkdir -p app/servicios-ips
mkdir -p app/salud-ocupacional
mkdir -p app/contacto

# Components structure
mkdir -p components/ui
mkdir -p components/layout
mkdir -p components/sections

# Public assets
mkdir -p public/logos
mkdir -p public/images

# Styles
mkdir -p styles

echo "✅ Folder structure created"

# ============================================
# PACKAGE.JSON
# ============================================
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "fami-web",
  "version": "1.0.0",
  "description": "Healthcare website for IPS and Foundation in Colombia",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3"
  }
}
EOF

# ============================================
# TAILWIND CONFIG
# ============================================
echo "🎨 Creating tailwind.config.js..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fami: {
          blue: '#2E3A8C',      // Primary Blue (Headers/Brand)
          cyan: '#6C8CD5',      // Accent Cyan (Details/Decorations)
          orange: '#FF7F32',    // Action Orange (Buttons/CTA)
          gray: '#F8F9FA',      // Clinical Gray (Backgrounds)
          text: '#1F2937',      // Text Color
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF

# ============================================
# POSTCSS CONFIG
# ============================================
echo "⚙️  Creating postcss.config.js..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# ============================================
# GLOBALS CSS
# ============================================
echo "🎨 Creating globals.css..."
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-fami-text bg-white;
  }
}
EOF

# ============================================
# .CURSORRULES (AI Behavior Guide)
# ============================================
echo "🤖 Creating .cursorrules..."
cat > .cursorrules << 'EOF'
You are a Senior Frontend Developer expert in Next.js 14 and Healthcare UX.

**FAMI Web Identity & Style Guide:**
- **Style Guide:** Strictly follow the FAMI Identity. Use `bg-fami-blue` for primary headers and `bg-fami-orange` for CTA buttons.
- **Color Palette:**
  - Primary Blue (Headers/Brand): #2E3A8C → `bg-fami-blue`
  - Accent Cyan (Details/Decorations): #6C8CD5 → `bg-fami-cyan`
  - Action Orange (Buttons/CTA): #FF7F32 → `bg-fami-orange`
  - Clinical Gray (Backgrounds): #F8F9FA → `bg-fami-gray`
  - Text Color: #1F2937 → `text-fami-text`
- **Design Vibe:** Clinical, Professional, Symmetric, High-Trust. Avoid "playful" or cluttered designs. Reference: Clínica Imbanaco style.
- **Typography:** Use Montserrat font family throughout.
- **Content Policy:** Do not invent text. Use strictly the provided content from revision documents.
- **Code Quality:** 
  - Create modular components in `/components`
  - Prioritize mobile responsiveness (mobile-first approach)
  - Use semantic HTML for accessibility
  - Follow Next.js 14 App Router conventions
  - Keep components small and focused

**Project Structure:**
- `/app` - Next.js App Router pages
- `/components/ui` - Atomic UI components (Buttons, Cards, Inputs)
- `/components/layout` - Global layout components (Navbar, Footer)
- `/components/sections` - Page sections/organisms (Hero, AlliesGrid, ServiceList)
- `/public` - Static assets (logos, images)

**Business Domains:**
- `/nosotros` - Institutional information (Mission, Vision, Allies)
- `/servicios-ips` - B2C Medical Services & Pricing
- `/salud-ocupacional` - B2B Corporate Services & Wellness Plans
- `/contacto` - Contact Form & Locations
EOF

# ============================================
# ROOT LAYOUT
# ============================================
echo "📄 Creating app/layout.jsx..."
cat > app/layout.jsx << 'EOF'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  title: 'FAMI - IPS y Fundación | Salud Integral en Colombia',
  description: 'Centro de atención médica integral y salud ocupacional en Colombia. Servicios de consulta especializada, exámenes ocupacionales y programas de bienestar corporativo.',
  keywords: 'IPS, salud ocupacional, servicios médicos, Colombia, exámenes médicos, bienestar corporativo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="antialiased">
        {/* TODO: Add <Navbar /> component here */}
        
        <main>
          {children}
        </main>
        
        {/* TODO: Add <Footer /> component here */}
      </body>
    </html>
  )
}
EOF

# ============================================
# HOME PAGE
# ============================================
echo "📄 Creating app/page.jsx..."
cat > app/page.jsx << 'EOF'
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Carousel Placeholder */}
      <section className="bg-fami-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a FAMI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-fami-cyan">
            IPS y Fundación - Salud Integral para Colombia
          </p>
          <div className="flex gap-4 justify-center">
            {/* TODO: Replace with actual Button component */}
            <button className="bg-fami-orange text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Nuestros Servicios
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-fami-blue transition">
              Contáctanos
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-fami-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fami-blue">
            Nuestras Áreas de Servicio
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* TODO: Replace with ServiceCard components */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-fami-blue">Servicios IPS</h3>
              <p className="text-gray-600">Atención médica integral para pacientes individuales</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-fami-blue">Salud Ocupacional</h3>
              <p className="text-gray-600">Programas corporativos de bienestar y prevención</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

# ============================================
# NOSOTROS PAGE
# ============================================
echo "📄 Creating app/nosotros/page.jsx..."
cat > app/nosotros/page.jsx << 'EOF'
export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-fami-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Nosotros</h1>
          <p className="text-xl text-fami-cyan">Conoce nuestra historia, misión y visión</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-fami-blue">Misión</h2>
            <p className="text-lg text-gray-700">
              {/* TODO: Add actual mission content */}
              Contenido de la misión institucional.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-fami-blue">Visión</h2>
            <p className="text-lg text-gray-700">
              {/* TODO: Add actual vision content */}
              Contenido de la visión institucional.
            </p>
          </div>

          {/* Allies */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fami-blue">Nuestros Aliados</h2>
            {/* TODO: Add AlliesGrid component */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-fami-gray p-4 rounded-lg">Logo 1</div>
              <div className="bg-fami-gray p-4 rounded-lg">Logo 2</div>
              <div className="bg-fami-gray p-4 rounded-lg">Logo 3</div>
              <div className="bg-fami-gray p-4 rounded-lg">Logo 4</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

# ============================================
# SERVICIOS IPS PAGE
# ============================================
echo "📄 Creating app/servicios-ips/page.jsx..."
cat > app/servicios-ips/page.jsx << 'EOF'
export default function ServiciosIPSPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-fami-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Servicios IPS</h1>
          <p className="text-xl text-fami-cyan">Atención médica integral para ti y tu familia</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-fami-blue">Nuestros Servicios</h2>
          {/* TODO: Add ServiceList component */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-fami-blue">Consulta Especializada</h3>
              <p className="text-gray-600 mb-4">Descripción del servicio</p>
              <button className="bg-fami-orange text-white px-6 py-2 rounded-lg font-semibold">
                Ver Precios
              </button>
            </div>
          </div>

          {/* TODO: Add PricingTable component */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-fami-blue">Lista de Precios</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-fami-blue text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Servicio</th>
                    <th className="px-6 py-3 text-right">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4">Ejemplo Servicio</td>
                    <td className="px-6 py-4 text-right">$00.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

# ============================================
# SALUD OCUPACIONAL PAGE
# ============================================
echo "📄 Creating app/salud-ocupacional/page.jsx..."
cat > app/salud-ocupacional/page.jsx << 'EOF'
export default function SaludOcupacionalPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-fami-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Salud Ocupacional</h1>
          <p className="text-xl text-fami-cyan">Programas corporativos de bienestar y prevención</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-fami-blue">Servicios Corporativos</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-fami-blue">Exámenes Ocupacionales</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Ingreso</li>
                <li>• Periódicos</li>
                <li>• Egreso</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-fami-blue">Programas de Bienestar</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Capacitaciones</li>
                <li>• Actividades preventivas</li>
                <li>• Seguimiento</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-fami-blue">Asesoría SG-SST</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Implementación</li>
                <li>• Auditoría</li>
                <li>• Mejora continua</li>
              </ul>
            </div>
          </div>

          <div className="bg-fami-gray p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-fami-blue">¿Interesado en nuestros servicios?</h3>
            <p className="mb-6 text-gray-700">Contáctanos para diseñar un programa a la medida de tu empresa</p>
            <button className="bg-fami-orange text-white px-8 py-3 rounded-lg font-semibold">
              Solicitar Cotización
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

# ============================================
# CONTACTO PAGE
# ============================================
echo "📄 Creating app/contacto/page.jsx..."
cat > app/contacto/page.jsx << 'EOF'
export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-fami-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-fami-cyan">Estamos aquí para atenderte</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fami-blue">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-fami-text">Nombre completo</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-fami-blue"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-fami-text">Correo electrónico</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-fami-blue"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-fami-text">Teléfono</label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-fami-blue"
                  placeholder="300 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-fami-text">Mensaje</label>
                <textarea 
                  rows="5" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-fami-blue"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-fami-orange text-white px-8 py-3 rounded-lg font-semibold w-full hover:opacity-90 transition"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-fami-blue">Información de Contacto</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-fami-blue">Sede Principal</h3>
                <p className="text-gray-700">
                  {/* TODO: Add actual address */}
                  Dirección completa<br />
                  Ciudad, Colombia
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-fami-blue">Teléfono</h3>
                <p className="text-gray-700">
                  +57 (000) 000-0000
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-fami-blue">Correo</h3>
                <p className="text-gray-700">
                  contacto@fami.com.co
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-fami-blue">Horario de Atención</h3>
                <p className="text-gray-700">
                  Lunes a Viernes: 7:00 AM - 5:00 PM<br />
                  Sábados: 8:00 AM - 12:00 PM
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-fami-gray rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Google Maps iframe aquí</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

# ============================================
# BUTTON COMPONENT
# ============================================
echo "📄 Creating components/ui/Button.jsx..."
cat > components/ui/Button.jsx << 'EOF'
/**
 * Button Component - FAMI Design System
 * 
 * Usage:
 * <Button variant="primary">Agendar Cita</Button>
 * <Button variant="outline">Ver Más</Button>
 * <Button variant="ghost">Cancelar</Button>
 */

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-fami-orange text-white hover:opacity-90 focus:ring-fami-orange',
    outline: 'border-2 border-fami-blue text-fami-blue hover:bg-fami-blue hover:text-white focus:ring-fami-blue',
    ghost: 'text-fami-blue hover:bg-fami-gray focus:ring-fami-cyan',
    secondary: 'bg-fami-blue text-white hover:bg-opacity-90 focus:ring-fami-blue',
  }

  const variantStyles = variants[variant] || variants.primary

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
EOF

# ============================================
# PLACEHOLDER COMPONENTS
# ============================================
echo "📄 Creating placeholder layout components..."

# Navbar placeholder
cat > components/layout/Navbar.jsx << 'EOF'
/**
 * Navbar Component
 * TODO: Implement navigation with logo, menu items, and mobile responsiveness
 */

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-fami-blue font-bold text-xl">FAMI</div>
          {/* TODO: Add navigation menu */}
        </div>
      </div>
    </nav>
  )
}
EOF

# Footer placeholder
cat > components/layout/Footer.jsx << 'EOF'
/**
 * Footer Component
 * TODO: Implement footer with contact info, social links, and legal information
 */

export default function Footer() {
  return (
    <footer className="bg-fami-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-fami-cyan">© 2024 FAMI - IPS y Fundación. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
EOF

# ============================================
# NEXT.JS CONFIG
# ============================================
echo "📄 Creating next.config.js..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
EOF

# ============================================
# ESLINT CONFIG
# ============================================
echo "📄 Creating .eslintrc.json..."
cat > .eslintrc.json << 'EOF'
{
  "extends": "next/core-web-vitals"
}
EOF

# ============================================
# GITIGNORE
# ============================================
echo "📄 Creating .gitignore..."
cat > .gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOF

# ============================================
# README
# ============================================
echo "📄 Creating README.md..."
cat > README.md << 'EOF'
# FAMI Web - IPS y Fundación

Healthcare website for an IPS (Clinic) and Foundation in Colombia.

## 🎨 Design System

### Color Palette
```
Primary Blue (Headers/Brand):    #2E3A8C  →  bg-fami-blue
Accent Cyan (Details):           #6C8CD5  →  bg-fami-cyan
Action Orange (CTA Buttons):     #FF7F32  →  bg-fami-orange
Clinical Gray (Backgrounds):     #F8F9FA  →  bg-fami-gray
Text Color:                      #1F2937  →  text-fami-text
```

### Typography
- **Font Family:** Montserrat (Google Fonts)
- **Usage:** Applied via CSS variable `--font-montserrat`

### Design Philosophy
- **Style:** Clinical, Professional, Symmetric
- **Reference:** Clínica Imbanaco aesthetic
- **Vibe:** High-trust, clean, no clutter

## 📁 Project Structure

```
/app
  layout.jsx              # Root layout with Montserrat font
  page.jsx                # Home page with hero carousel
  /nosotros               # Institutional (Mission/Vision/Allies)
  /servicios-ips          # B2C Medical Services & Pricing
  /salud-ocupacional      # B2B Corporate Wellness Programs
  /contacto               # Contact form & locations

/components
  /ui                     # Atomic UI (Button, Card, Input)
  /layout                 # Global (Navbar, Footer)
  /sections               # Organisms (Hero, ServiceList, PricingTable)

/public
  /logos                  # SVG storage
  /images                 # Optimized photos
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production
```bash
npm run build
npm start
```

## 🧩 Component Usage

### Button Component
```jsx
import Button from '@/components/ui/Button'

// Primary CTA (Orange)
<Button variant="primary">Agendar Cita</Button>

// Outline (Blue border)
<Button variant="outline">Ver Más</Button>

// Ghost (Transparent)
<Button variant="ghost">Cancelar</Button>
```

## 📝 Development Guidelines

1. **Content:** Never invent text. Use only provided content from revision documents.
2. **Responsiveness:** Mobile-first approach (use Tailwind responsive prefixes: `md:`, `lg:`)
3. **Components:** Keep modular and reusable in `/components`
4. **Colors:** Use only the FAMI palette classes (e.g., `bg-fami-blue`, `text-fami-orange`)
5. **AI Guidance:** Follow `.cursorrules` for consistent development practices

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Font:** Montserrat (next/font/google)

## 📚 Key Pages

| Route | Purpose | Target Audience |
|-------|---------|-----------------|
| `/` | Home with hero & services overview | All |
| `/nosotros` | Mission, vision, allies | All |
| `/servicios-ips` | Medical services & pricing | B2C (Patients) |
| `/salud-ocupacional` | Corporate wellness programs | B2B (Companies) |
| `/contacto` | Contact form & locations | All |

## 🎯 Next Steps

- [ ] Add hero carousel images to `/public/images`
- [ ] Populate content from provided documents
- [ ] Implement Navbar with logo and navigation
- [ ] Implement Footer with contact info
- [ ] Create reusable Card components
- [ ] Build ServiceList section component
- [ ] Build PricingTable component
- [ ] Add Google Maps integration to contact page
- [ ] Optimize images (use Next.js Image component)
- [ ] Add form validation to contact form

---

**Reference Style:** Clínica Imbanaco  
**Target Market:** Colombian healthcare (IPS) and corporate wellness (B2B)
EOF

# ============================================
# JSCONFIG
# ============================================
echo "📄 Creating jsconfig.json..."
cat > jsconfig.json << 'EOF'
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
EOF

# ============================================
# FINISH
# ============================================
echo ""
echo "✅ FAMI Web structure created successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Run: npm install"
echo "   2. Run: npm run dev"
echo "   3. Open: http://localhost:3000"
echo ""
echo "📖 Check README.md for design tokens and component usage"
echo "🤖 AI developers: Follow .cursorrules for style guidelines"
echo ""
echo "🏥 Happy coding!"
