"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Image,
  Newspaper,
  Video,
  Award,
  FileText,
  Menu,
  X,
  LogOut,
  Home,
  Bell,
  PanelLeftClose,
  PanelLeft,
  MessageSquare
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Encuestas', href: '/admin/encuestas', icon: MessageSquare },
  { name: 'Noticias', href: '/admin/noticias', icon: Newspaper },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Hero / Slider', href: '/admin/hero', icon: Image },
  { name: 'Certificaciones', href: '/admin/certificaciones', icon: Award },
  { name: 'Videos', href: '/admin/videos', icon: Video },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // No aplicar layout en la página de login
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [user, loading, isLoginPage, router]);

  // Si es la página de login, mostrar solo el contenido
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Si no hay usuario y no es login, mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-fami-blue/30 border-t-fami-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transform transition-all duration-300
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-fami-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-bold text-fami-blue">Admin Panel</h1>
                  <p className="text-xs text-gray-400">FAMI Fundación</p>
                </div>
              )}
            </Link>
            <button
              className="hidden lg:block text-gray-400 hover:text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
            </button>
            <button
              className="lg:hidden text-gray-400"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-fami-blue text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileSidebarOpen(false)}
                  title={!sidebarOpen ? item.name : ''}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title={!sidebarOpen ? 'Ver Sitio' : ''}
            >
              <Home size={20} />
              {sidebarOpen && <span>Ver Sitio</span>}
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full"
              title={!sidebarOpen ? 'Salir' : ''}
            >
              <LogOut size={20} />
              {sidebarOpen && <span>Salir</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.email || 'Admin'}</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-fami-blue text-white flex items-center justify-center font-bold">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
              </div>

              <button
                onClick={logout}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
