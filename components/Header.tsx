import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

interface HeaderProps {
  onNavigate: (page: 'home' | 'download') => void;
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    onNavigate('home');
    setIsOpen(false);
    // Pequeno delay para permitir a renderização da home antes do scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32 md:h-40">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img 
              src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/Geral/BioPeak%2010124%20White%20Icon.png" 
              alt="BioPeak" 
              className="h-24 md:h-32 w-auto object-contain"
            />
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <button onClick={() => handleNavClick('#funcionalidades')} className="text-gray-300 hover:text-emerald font-medium transition-colors">Funcionalidades</button>
            <button onClick={() => handleNavClick('#como-funciona')} className="text-gray-300 hover:text-emerald font-medium transition-colors">Como Funciona</button>
            <button onClick={() => handleNavClick('#depoimentos')} className="text-gray-300 hover:text-emerald font-medium transition-colors">Resultados</button>
            <button onClick={() => handleNavClick('#precos')} className="text-gray-300 hover:text-emerald font-medium transition-colors">Planos</button>
            <Button 
              variant="primary" 
              className="py-2 px-6 text-sm"
              onClick={onOpenModal}
            >
              Baixar App
            </Button>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:text-emerald transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 absolute w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <button onClick={() => handleNavClick('#funcionalidades')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald hover:bg-white/5 rounded-md">Funcionalidades</button>
            <button onClick={() => handleNavClick('#como-funciona')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald hover:bg-white/5 rounded-md">Como Funciona</button>
            <button onClick={() => handleNavClick('#depoimentos')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald hover:bg-white/5 rounded-md">Resultados</button>
            <button onClick={() => handleNavClick('#precos')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald hover:bg-white/5 rounded-md">Planos</button>
            <div className="pt-2">
              <Button 
                fullWidth 
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  onOpenModal();
                }}
              >
                Baixar App
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;