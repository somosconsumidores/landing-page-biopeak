import React from 'react';
import Button from './Button';
import { CheckCircle2 } from 'lucide-react';

interface PricingProps {
  onOpenModal: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  const planPrice = "12,90";

  const benefits = [
    "Planos de treino adaptativos (IA)",
    "Plano Nutricional com base em seu Plano de Treino",
    "Coach de IA ilimitado (chat)",
    "Rastreamento GPS e áudio",
    "Fitness Score e Análise de Fadiga",
    "Monitoramento de Overtraining",
    "Sincronização com Garmin",
    "Calendário de provas"
  ];

  return (
    <section id="precos" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald/5 skew-x-12 transform translate-x-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:gap-16">
          
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-4xl font-bold text-white mb-6">Investimento Inteligente</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Treinamento de elite não precisa custar uma fortuna. Por menos que o preço de um café por dia, você tem um treinador dedicado 24h no seu bolso.
            </p>
            <div className="p-6 bg-white/5 rounded-2xl border border-emerald/20">
              <h4 className="font-bold text-emerald mb-2">Garantia de Satisfação</h4>
              <p className="text-sm text-gray-400">
                Experimente o Plano Pro. Cancele quando quiser, sem taxas ocultas ou multas. Confiamos que você vai amar os resultados.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-[#0b0e14] rounded-3xl p-8 md:p-12 shadow-2xl text-white relative border border-white/10 hover:border-emerald/30 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-emerald text-navy text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-2xl">
                OFERTA ESPECIAL
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-gray-400 mb-2">Plano Pro</h3>
                <div className="flex items-center justify-center gap-1">
                   <span className="text-lg text-gray-500">R$</span>
                   <span className="text-6xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{planPrice}</span>
                   <span className="text-gray-500 self-end mb-2">/mês</span>
                </div>
                <p className="text-emerald text-sm mt-2 font-medium">Economize R$ 3.000+ comparado a um Personal</p>
              </div>

              <div className="space-y-4 mb-10">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald shrink-0 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" size={20} />
                    <span className="text-gray-300 text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="primary" 
                fullWidth 
                className="py-4 text-lg"
                onClick={onOpenModal}
              >
                Começar Agora
              </Button>
              <p className="text-center text-gray-600 text-xs mt-4">Renovação automática. Cancele a qualquer momento.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;