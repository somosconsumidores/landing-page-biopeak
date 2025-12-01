import React from 'react';
import Button from './Button';
import { ChevronRight, Star, TrendingUp, Download } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: 'home' | 'download' | 'success') => void;
  onOpenModal?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenModal }) => {
  // Array para repetir a imagem e garantir que cubra telas largas
  const tickerItems = [1, 2, 3, 4, 5, 6];

  return (
    <section className="relative pt-32 pb-0 lg:pt-40 overflow-hidden flex flex-col justify-between min-h-screen lg:min-h-0 lg:block">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purpleAurora/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0 z-10 relative">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-emerald px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Star size={16} fill="currentColor" />
              <span>O Personal Coach no seu bolso</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Treine, analise e evolua com <span className="aurora-text">Inteligência Artificial</span>.
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              O BioPeak cria planos de treino personalizados, analisa sua fadiga e te guia em cada passo. Sem relógios caros. Sem complicação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="primary"
                onClick={onOpenModal}
              >
                Download Gratuito
                <Download className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/10 text-white hover:bg-white/20 border-0"
                onClick={() => {
                  const element = document.getElementById('funcionalidades');
                  if(element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Conhecer Recursos
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-navy bg-gray-800 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all" />
                  </div>
                ))}
              </div>
              <p>+ 1.600 atletas treinam com BioPeak</p>
            </div>
          </div>

          {/* Right Content - Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[340px]">
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald/20 to-purpleAurora/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
              
              {/* Image Container - Clean Screen Style */}
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 bg-navy">
                  <img 
                    src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/app-screenshots/1.png" 
                    alt="BioPeak App Interface" 
                    className="w-full h-auto object-cover"
                  />
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute bottom-10 -left-4 lg:-left-12 bg-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 max-w-[200px] animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald/20 rounded-full flex items-center justify-center text-emerald">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Fitness Score</p>
                  <p className="font-bold text-white text-lg">+1.37 pts</p>
                </div>
              </div>
              <p className="text-xs text-emerald font-medium">Você está evoluindo!</p>
            </div>

          </div>
        </div>
      </div>

      {/* Infinite Scroll Ticker */}
      <div className="w-full bg-surfaceHighlight/30 border-y border-white/5 py-6 overflow-hidden mt-auto relative z-20 backdrop-blur-sm">
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {/* First set of images */}
          {tickerItems.map((item) => (
             <img 
               key={`orig-${item}`}
               src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/Geral/faixa2.png" 
               alt="Metricas BioPeak" 
               className="h-12 md:h-16 w-auto mx-8 opacity-60 hover:opacity-100 transition-opacity" 
             />
          ))}
          {/* Second set of images for seamless loop */}
          {tickerItems.map((item) => (
             <img 
               key={`copy-${item}`}
               src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/Geral/faixa2.png" 
               alt="Metricas BioPeak" 
               className="h-12 md:h-16 w-auto mx-8 opacity-60 hover:opacity-100 transition-opacity" 
             />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;