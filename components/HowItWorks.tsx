import React from 'react';
import { Target, CalendarCheck, Zap, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: <Target size={28} />,
    title: "Defina seu Objetivo",
    desc: "Cadastre-se e conte para o Coach: quer correr seus primeiros 5K? Uma maratona? Ou apenas manter a saúde?"
  },
  {
    icon: <CalendarCheck size={28} />,
    title: "Receba o Plano",
    desc: "A IA cria uma programação personalizada para sua rotina e nível atual, com dias de esforço e recuperação."
  },
  {
    icon: <Zap size={28} />,
    title: "Treine Guiado",
    desc: "Leve o celular ou use seu Garmin. Receba instruções de ritmo e zona cardíaca durante a atividade."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Evolua Sempre",
    desc: "O plano se adapta semanalmente baseado no seu desempenho real e feedback de sensação."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Como funciona na prática</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Uma jornada simples para resultados complexos. Você foca no esforço, nós focamos na ciência.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/5 -z-10 transform -translate-y-1/2"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-navy rounded-full flex items-center justify-center text-emerald shadow-lg border-4 border-surface mb-6 z-10 relative group-hover:border-emerald/30 transition-colors">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald text-navy rounded-full flex items-center justify-center text-sm font-bold border-4 border-surface">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;