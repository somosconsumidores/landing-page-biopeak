import React, { useState, useEffect } from 'react';
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
import SuccessPage from './components/SuccessPage';
import CheckoutModal from './components/CheckoutModal';

type PageRoute = 'home' | 'download' | 'success';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFlow, setModalFlow] = useState<'free' | 'pro'>('pro');
  const [utmSource, setUtmSource] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const params = new URLSearchParams(window.location.search);
      const path = window.location.pathname;
      
      const source = params.get('utm_source');
      if (source) {
        setUtmSource(source);
      }

      // Detecção de Sucesso: verifica o parâmetro ?success=true OU se o caminho é /paywall2
      if (params.get('success') === 'true' || path.includes('/paywall2')) {
        setCurrentPage('success');
        
        // Limpa a URL para a raiz para evitar loops ou erros 404 em refresh futuro
        // mas mantém a 'success page' ativa no estado do React
        if (path !== '/' || params.toString() !== '') {
          window.history.replaceState({}, document.title, '/');
        }
      }
    };

    checkStatus();
    // Escutar mudanças de navegação manual do usuário
    window.addEventListener('popstate', checkStatus);
    return () => window.removeEventListener('popstate', checkStatus);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (flow: 'free' | 'pro') => {
    setModalFlow(flow);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-navy text-textMain flex flex-col scroll-smooth selection:bg-emerald selection:text-navy">
      <Header 
        onNavigate={handleNavigate} 
        onOpenModal={() => openModal('pro')} 
      />
      
      <main className="flex-grow relative">
        <div className="fixed top-0 left-0 w-full h-screen bg-dark-gradient -z-50 opacity-50 pointer-events-none"></div>
        
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} onOpenModal={() => openModal('pro')} />
            <Features />
            <HowItWorks />
            <AppShowcase />
            <Comparison />
            <Testimonials />
            <Pricing onOpenModal={() => openModal('pro')} />
            <FAQ />
          </>
        )}

        {currentPage === 'download' && (
          <DownloadPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'success' && (
          <SuccessPage onNavigate={handleNavigate} />
        )}
      </main>
      
      {currentPage === 'home' && <Footer onOpenModal={() => openModal('free')} />}

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planPrice="12,90"
        flow={modalFlow}
        utmSource={utmSource}
      />
    </div>
  );
};

export default App;