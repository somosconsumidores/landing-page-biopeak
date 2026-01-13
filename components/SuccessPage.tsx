import React from 'react';
import { CheckCircle2, Smartphone, Apple, PlayCircle, ArrowLeft, Info } from 'lucide-react';

interface SuccessPageProps {
  onNavigate: (page: 'home' | 'download' | 'success') => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-navy text-white pt-24 pb-12 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purpleAurora/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        {/* Success Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-emerald blur-3xl opacity-40 animate-pulse rounded-full"></div>
          <div className="w-24 h-24 bg-surface border-2 border-emerald rounded-full flex items-center justify-center text-emerald shadow-[0_0_30px_rgba(52,211,153,0.4)] relative z-10">
            <CheckCircle2 size={48} strokeWidth={3} className="animate-in zoom-in duration-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Pagamento Confirmado! <br/>
          <span className="aurora-text">Sua evolução começa agora.</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Você agora é um membro **BioPeak Pro**. O próximo passo é baixar o aplicativo para começar seu plano de elite.
        </p>

        <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto mb-12">
          {/* Download Box */}
          <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-8 text-emerald">
              <Smartphone size={28} />
              <h3 className="text-2xl font-bold text-white">Baixe o Aplicativo</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              {/* App Store Button */}
              <a 
                href="https://apps.apple.com/us/app/biopeak-ai/id6752911184" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-navy px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all hover:scale-105 font-bold text-lg flex-1"
              >
                <Apple size={24} fill="currentColor" />
                <div className="text-left leading-tight">
                  <span className="block text-[10px] uppercase opacity-70">Baixar na</span>
                  <span className="block">App Store</span>
                </div>
              </a>

              {/* Google Play Button */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.biopeakai.performance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-surfaceHighlight border border-white/10 text-white px-8 py-4 rounded-2xl hover:bg-white/10 transition-all hover:scale-105 font-bold text-lg flex-1"
              >
                <PlayCircle size={24} />
                <div className="text-left leading-tight">
                  <span className="block text-[10px] uppercase opacity-70">Disponível no</span>
                  <span className="block">Google Play</span>
                </div>
              </a>
            </div>

            {/* Login Instruction */}
            <div className="mt-8 flex items-start gap-3 bg-emerald/5 border border-emerald/10 p-4 rounded-xl text-left">
              <Info className="text-emerald shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-gray-400">
                <strong className="text-white">Importante:</strong> Use o mesmo e-mail utilizado na compra para fazer login no aplicativo e liberar automaticamente os recursos Pro.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-gray-500 text-sm">Problemas com o acesso? Entre em contato com suporte@biopeak-ai.com</p>
          <button 
            onClick={() => onNavigate('home')}
            className="text-gray-400 hover:text-emerald transition-colors flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            <ArrowLeft size={16} /> Voltar para o site oficial
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;