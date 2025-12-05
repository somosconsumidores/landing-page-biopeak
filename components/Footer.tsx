import React from 'react';
import { TrendingUp, Instagram, Twitter, Facebook } from 'lucide-react';
import Button from './Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000205] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer CTA */}
        <div className="text-center mb-20 border-b border-white/5 pb-20">
          <h2 className="text-4xl font-bold mb-6">Pronto para sua melhor versão?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Junte-se ao BioPeak hoje e transforme seus dados em performance real.
          </p>
          
          {/* Hero Image Insertion */}
          <div className="relative max-w-4xl mx-auto mb-12 group">
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald/20 to-purpleAurora/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <img 
               src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/Geral/HeroSection2.png" 
               alt="BioPeak Dashboard Preview" 
               className="relative rounded-2xl border border-white/10 shadow-2xl w-full h-auto object-cover"
             />
          </div>

          <Button variant="primary" className="px-10 py-4 text-lg">
            Começar Gratuitamente
          </Button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald rounded-lg flex items-center justify-center text-navy shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                <TrendingUp size={20} strokeWidth={3} />
              </div>
              <span className="text-2xl font-bold tracking-tight">BioPeak</span>
            </div>
            <p className="text-gray-400 text-sm">
              Treinamento inteligente para atletas reais. Tecnologia de ponta acessível a todos.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-emerald transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Planos de Treino</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Preços</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-emerald transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-emerald transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-emerald transition-colors">Termos de Uso</a></li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-emerald transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm pt-8 border-t border-white/5">
          © 2025 BioPeak. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;