import React from 'react';
import { CheckCircle2, Smartphone, Shield, Zap, ArrowLeft } from 'lucide-react';
import Button from './Button';

interface DownloadPageProps {
  onNavigate: (page: 'home' | 'download') => void;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-navy text-white pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purpleAurora/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-gray-400 hover:text-emerald transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald/10 text-emerald px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-emerald/20">
              <Zap size={14} fill="currentColor" />
              <span>Comece Gratuitamente</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Entenda sua performance <br/>
              <span className="aurora-text">sem gastar nada.</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Baixe o BioPeak agora e tenha acesso imediato ao GPS tracker, sincronização com Garmin e seu Fitness Score inicial. Sem cartão de crédito necessário.
            </p>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="flex items-center justify-center gap-3 bg-white text-navy px-6 py-3.5 rounded-xl hover:bg-gray-200 transition-all hover:scale-105 shadow-glow font-bold w-full sm:w-auto min-w-[180px]">
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-medium opacity-80">Baixar na</span>
                  <span className="block text-lg">App Store</span>
                </div>
              </button>

              <button className="flex items-center justify-center gap-3 bg-surfaceHighlight border border-white/10 text-white px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all hover:scale-105 w-full sm:w-auto min-w-[180px]">
                <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-medium opacity-70">DISPONÍVEL NO</span>
                  <span className="block text-lg">Google Play</span>
                </div>
              </button>
            </div>

            {/* Free Tier Features */}
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Shield size={20} className="text-emerald" />
                O que está incluído no plano Grátis:
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                {[
                  "Rastreamento GPS ilimitado",
                  "Cálculo de Fitness Score",
                  "Sincronização Garmin/Strava",
                  "Diário de treinos básico",
                  "Feedback de áudio (Ritmo)",
                  "Sem anúncios intrusivos"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="mt-6 text-sm text-gray-500">
              * O teste do Coach de IA (Plano Pro) pode ser ativado dentro do app.
            </p>
          </div>

          {/* Right Column: Visual */}
          <div className="relative mt-12 lg:mt-0 flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald/10 to-purpleAurora/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            
            <div className="relative w-full max-w-sm mx-auto">
                {/* Floating Elements */}
                <div className="absolute -left-4 top-20 bg-surface border border-white/10 p-4 rounded-xl shadow-xl z-20 animate-bounce delay-700 hidden sm:block">
                  <p className="text-emerald font-bold text-lg">100% Grátis</p>
                  <p className="text-xs text-gray-400">para baixar e rastrear</p>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                   <img 
                    src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/app-screenshots/1.png" 
                    alt="BioPeak Free App" 
                    className="w-full h-auto object-cover"
                   />
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DownloadPage;