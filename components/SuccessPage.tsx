import React, { useEffect, useState } from 'react';
import { CheckCircle2, Smartphone, Laptop, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';

interface SuccessPageProps {
  onNavigate: (page: 'home' | 'download' | 'success') => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|iphone|ipad|ipod/i;
    setIsMobile(mobileRegex.test(userAgent.toLowerCase()));

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    if (isMobile) {
      // Deep Link para abrir o App instalado
      window.location.href = "biopeak://";
      
      // Fallback para as lojas caso o app não abra
      setTimeout(() => {
        console.log("Deep link fallback ativado");
      }, 2500);
    } else {
      // Redirecionamento para Login Web no Desktop
      window.location.href = "https://biopeak-ai.com/auth";
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white pt-24 pb-12 px-4 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-emerald blur-2xl opacity-40 animate-pulse rounded-full"></div>
          <div className="w-24 h-24 bg-surface border-2 border-emerald rounded-full flex items-center justify-center text-emerald shadow-[0_0_30px_rgba(52,211,153,0.4)] relative z-10 animate-bounce">
            <CheckCircle2 size={48} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Assinatura Ativa! <br/>
          <span className="aurora-text">Bem-vindo ao BioPeak Pro.</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Seu pagamento foi confirmado com sucesso. Estamos preparando seu acesso aos recursos de elite.
        </p>

        <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto mb-10 shadow-2xl">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-3 text-emerald bg-emerald/10 px-4 py-2 rounded-full border border-emerald/20">
              <Loader2 size={18} className="animate-spin" />
              <span className="font-semibold text-sm">
                Redirecionando em {countdown}s...
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              {isMobile ? <Smartphone className="text-emerald" size={28} /> : <Laptop className="text-emerald" size={28} />}
              {isMobile ? "Abrir o App BioPeak" : "Ir para o BioPeak Web"}
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleRedirect}
              className="flex items-center justify-center gap-3 bg-emerald text-navy px-8 py-5 rounded-2xl hover:bg-emeraldDark transition-all hover:scale-105 shadow-[0_0_20px_rgba(52,211,153,0.4)] font-bold text-xl w-full"
            >
              {isMobile ? "Abrir App Agora" : "Acessar Dashboard Web"}
              <ExternalLink size={20} />
            </button>

            {isMobile && (
              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest font-bold">Ou baixe/atualize se necessário</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://apps.apple.com/us/app/biopeak-ai/id6752911184" target="_blank" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 transition-all text-sm font-medium">
                    App Store
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.biopeakai.performance" target="_blank" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 transition-all text-sm font-medium">
                    Google Play
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => onNavigate('home')}
            className="text-gray-500 hover:text-emerald transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;