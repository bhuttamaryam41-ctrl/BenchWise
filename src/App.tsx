import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProtocolReviewPage } from './pages/ProtocolReviewPage';
import { TroubleshooterPage } from './pages/TroubleshooterPage';
import { MasterMixPage } from './pages/MasterMixPage';
import { AboutPage } from './pages/AboutPage';
import { Page } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'protocol-review':
        return <ProtocolReviewPage />;
      case 'troubleshooter':
        return <TroubleshooterPage />;
      case 'master-mix':
        return <MasterMixPage />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFEFC] dark:bg-slate-950 text-[#1A1A1D] dark:text-slate-100 transition-colors duration-200 selection:bg-[#6C63FF] selection:text-white">
        
        {/* Skip to Content for Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#6C63FF] focus:text-white focus:rounded-xl focus:shadow-lg"
        >
          Skip to main content
        </a>

        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={setCurrentPage} />
      </div>
    </ThemeProvider>
  );
}

