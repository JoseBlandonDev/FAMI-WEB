import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Slides Table
    await sql`
      CREATE TABLE IF NOT EXISTS slides (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        subtitle VARCHAR(255),
        image_url TEXT,
        cta_text VARCHAR(50),
        cta_link VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Check if admin user exists
    const { rows } = await sql`SELECT * FROM users WHERE username = 'admin'`;
    
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('fami2024', 10);
      await sql`
        INSERT INTO users (username, password, name, role)
        VALUES ('admin', ${hashedPassword}, 'Administrador FAMI', 'admin')
      `;
      return NextResponse.json({ message: 'Database setup complete. Default admin created.' });
    }

    return NextResponse.json({ message: 'Database already setup.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

