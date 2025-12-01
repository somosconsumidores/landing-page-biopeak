import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Já tenho Strava, por que preciso do BioPeak?",
    a: "O Strava é excelente para registrar e compartilhar (rede social), mas ele não planeja seu treino. O BioPeak é o seu treinador: ele diz o que fazer, quando descansar e analisa sua evolução real. Eles funcionam muito bem juntos!"
  },
  {
    q: "Já tenho um Garmin, não preciso de app.",
    a: "O BioPeak se integra perfeitamente ao Garmin. Pense no Garmin como o hardware (coleta dados) e no BioPeak como o cérebro (analisa e planeja). Nossa IA oferece insights de overtraining e planejamento futuro que o Connect faz apenas de forma básica."
  },
  {
    q: "O app funciona se eu não tiver relógio GPS?",
    a: "Sim! Você pode usar apenas seu smartphone. O app tem um rastreador GPS preciso integrado que fornece ritmo, distância e feedback de áudio em tempo real."
  },
  {
    q: "Sou iniciante, o BioPeak serve para mim?",
    a: "Com certeza. Nossos planos de 'Couch to 5K' são muito populares. A IA avalia seu nível atual e cria uma progressão segura para evitar lesões, ideal para quem está começando."
  },
  {
    q: "Como funciona o cancelamento?",
    a: "Simples e sem burocracia. Você pode cancelar sua assinatura diretamente no app a qualquer momento. Sem multas e sem perguntas."
  }
];

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-200 group-hover:text-emerald transition-colors pr-8">{q}</span>
        {isOpen ? <Minus className="text-emerald shrink-0" /> : <Plus className="text-gray-500 group-hover:text-emerald shrink-0 transition-colors" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Perguntas Frequentes</h2>
        <div className="bg-surface rounded-2xl p-6 md:p-10 shadow-lg border border-white/5">
          {faqs.map((item, i) => (
            <FAQItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;