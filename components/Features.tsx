import React from 'react';
import { Brain, Activity, Map, BarChart3, ShieldCheck, Watch } from 'lucide-react';

const features = [
  {
    icon: <Brain size={32} />,
    title: "Coach de IA Adaptativo",
    description: "Um treinador que conversa com você, entende seu nível e adapta os planos conforme sua evolução e feedback."
  },
  {
    icon: <Activity size={32} />,
    title: "Planos Inteligentes",
    description: "Periodização científica (base, construção, pico). Se você pular um treino ou ficar doente, o plano se reajusta automaticamente."
  },
  {
    icon: <Map size={32} />,
    title: "GPS e Rastreamento",
    description: "Use apenas seu smartphone. GPS preciso para distância, ritmo e rota com feedback de voz em tempo real."
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Análise Profunda",
    description: "Muito além do básico. Fitness Score, VO2 Max estimado e análise de ritmo cardíaco para garantir evolução constante."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Prevenção de Lesões",
    description: "Monitoramento de carga aguda e crônica para detectar sinais de overtraining antes que você se machuque."
  },
  {
    icon: <Watch size={32} />,
    title: "Integração Garmin e Apple Watch",
    description: "Já tem um relógio? O BioPeak sincroniza automaticamente e usa os dados do dispositivo para análises ainda mais ricas."
  }
];

const Features: React.FC = () => {
  return (
    <section id="funcionalidades" className="py-24 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-emerald uppercase tracking-widest mb-2">Recursos Premium</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Tudo que você precisa para evoluir, em um só app.</h3>
          <p className="text-gray-400 text-lg">
            Esqueça as planilhas estáticas e os apps que só registram distância. O BioPeak entende o <i className="text-emerald">contexto</i> do seu treino.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-emerald/30 hover:shadow-glow transition-all duration-300 group">
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-emerald mb-6 group-hover:bg-emerald group-hover:text-navy transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;