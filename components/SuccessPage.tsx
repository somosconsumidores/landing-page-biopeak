import React from 'react';
import { CheckCircle2, Zap, ArrowLeft, Smartphone } from 'lucide-react';

interface SuccessPageProps {
  onNavigate: (page: 'home' | 'download' | 'success') => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-navy text-white pt-24 pb-12 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        
        {/* Success Icon Animation */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-emerald blur-2xl opacity-40 animate-pulse rounded-full"></div>
          <div className="w-24 h-24 bg-surface border-2 border-emerald rounded-full flex items-center justify-center text-emerald shadow-[0_0_30px_rgba(52,211,153,0.4)] relative z-10 animate-bounce">
            <CheckCircle2 size={48} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Pagamento Confirmado! <br/>
          <span className="aurora-text">Sua assinatura está ativa.</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Bem-vindo ao time BioPeak Pro. Seu acesso aos recursos avançados de IA e análise de performance já foi liberado.
        </p>

        <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto mb-12">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Smartphone className="text-emerald" size={20} />
            Próximo Passo: Baixe o App
          </h3>
          <p className="text-gray-400 mb-8 text-sm">
            Instale o aplicativo e faça login com o email e senha que você acabou de cadastrar para acessar seu plano Pro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a 
               href="https://apps.apple.com/us/app/biopeak-ai/id6752911184?ct=cta&mt=homepage" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-3 bg-white text-navy px-6 py-4 rounded-xl hover:bg-gray-200 transition-all hover:scale-105 shadow-glow font-bold w-full sm:w-auto min-w-[200px]"
             >
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6 shrink-0">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-medium opacity-80">Baixar na</span>
                  <span className="block text-lg">App Store</span>
                </div>
             </a>

             <a 
               href="https://play.google.com/store/apps/details?id=com.biopeakai.performance&pcampaignid=homepage" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-3 bg-surfaceHighlight border border-white/10 text-white px-6 py-4 rounded-xl hover:bg-white/10 transition-all hover:scale-105 w-full sm:w-auto min-w-[200px]"
             >
                <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6 shrink-0">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-medium opacity-70">DISPONÍVEL NO</span>
                  <span className="block text-lg">Google Play</span>
                </div>
             </a>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="text-gray-500 hover:text-emerald transition-colors flex items-center gap-2 mx-auto text-sm"
        >
          <ArrowLeft size={16} /> Voltar para o site
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;