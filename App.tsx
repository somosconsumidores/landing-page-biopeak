import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppShowcase from './components/AppShowcase';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DownloadPage from './components/DownloadPage';
import CheckoutModal from './components/CheckoutModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'download'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFlow, setModalFlow] = useState<'free' | 'pro'>('pro');

  const handleNavigate = (page: 'home' | 'download') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (flow: 'free' | 'pro') => {
    setModalFlow(flow);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-navy text-textMain flex flex-col scroll-smooth selection:bg-emerald selection:text-navy">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow relative">
        {/* Global ambient glow */}
        <div className="fixed top-0 left-0 w-full h-screen bg-dark-gradient -z-50 opacity-50 pointer-events-none"></div>
        
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} onOpenModal={() => openModal('free')} />
            <Features />
            <HowItWorks />
            <AppShowcase />
            <Comparison />
            <Testimonials />
            <Pricing onOpenModal={() => openModal('pro')} />
            <FAQ />
          </>
        ) : (
          <DownloadPage onNavigate={handleNavigate} />
        )}
      </main>
      
      {currentPage === 'home' && <Footer />}

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planPrice="12,90"
        flow={modalFlow}
      />
    </div>
  );
};

export default App;