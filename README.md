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
