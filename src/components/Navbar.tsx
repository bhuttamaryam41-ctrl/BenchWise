import React, { useState } from 'react';
import { Dna, Moon, Sun, Menu, X, Microscope, Calculator, HelpCircle, FileCheck, Info } from 'lucide-react';
import { Page } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Microscope className="w-4 h-4" /> },
    { id: 'protocol-review', label: 'Protocol Review', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'troubleshooter', label: 'Troubleshooter', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'master-mix', label: 'Master Mix Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-[#E8E8EE] dark:border-slate-800/80 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 rounded-xl p-1 transition-all"
            aria-label="BenchWise Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C63FF] via-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Dna className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#1A1A1D] dark:text-white">
                  Bench<span className="bg-gradient-to-r from-[#6C63FF] to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300">Wise</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-md bg-[#E8E8FF] dark:bg-purple-950/80 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800/80">
                  Lab v1.0
                </span>
              </div>
              <span className="block text-[10px] text-[#626268] dark:text-slate-400 font-medium">
                Scientific Intelligence Platform
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                    isActive
                      ? 'bg-[#E8E8FF] dark:bg-purple-950/80 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800 shadow-2xs'
                      : 'text-[#626268] dark:text-slate-300 hover:text-[#1A1A1D] dark:hover:text-white hover:bg-[#FAF9FF] dark:hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-[#6C63FF] dark:text-violet-300' : 'text-[#626268] dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions (Theme Switcher + Mobile Menu button) */}
          <div className="flex items-center gap-2.5">
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-900 text-[#626268] dark:text-slate-300 hover:text-[#6C63FF] dark:hover:text-violet-300 hover:bg-[#E8E8FF] dark:hover:bg-slate-800 border border-[#E8E8EE] dark:border-slate-800 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Hamburger Menu button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-[#FAF9FF] dark:bg-slate-900 text-[#626268] dark:text-slate-300 hover:bg-[#E8E8FF] dark:hover:bg-slate-800 border border-[#E8E8EE] dark:border-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E8EE] dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E8E8FF] dark:bg-purple-950/80 text-[#6C63FF] dark:text-violet-300 border border-[#C6C8FF] dark:border-purple-800'
                    : 'text-[#1A1A1D] dark:text-slate-200 hover:bg-[#FAF9FF] dark:hover:bg-slate-900'
                }`}
              >
                <span className={isActive ? 'text-[#6C63FF] dark:text-violet-300' : 'text-[#626268]'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

