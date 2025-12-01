import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos M.",
    role: "Corredor Amador",
    text: "Eu gastava R$ 300 com personal. O BioPeak me dá a mesma estrutura por uma fração do preço. Baixei meu tempo nos 10K em 4 minutos em 3 meses.",
    image: "https://picsum.photos/seed/carlos/150/150"
  },
  {
    name: "Fernanda L.",
    role: "Ciclista de Estrada",
    text: "A análise de overtraining é incrível. Antes eu vivia lesionada por exagerar. O app me manda descansar na hora certa. Recomendo demais!",
    image: "https://picsum.photos/seed/fernanda/150/150"
  },
  {
    name: "Ricardo S.",
    role: "Maratonista",
    text: "Uso junto com meu Garmin. O relógio coleta, mas o BioPeak é quem 'pensa' o treino. A integração é perfeita e os insights são muito mais claros.",
    image: "https://picsum.photos/seed/ricardo/150/150"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Resultados Reais</h2>
          <p className="text-gray-400">Junte-se a milhares de atletas que transformaram sua performance.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-surface p-8 rounded-2xl shadow-lg border border-white/5 hover:border-emerald/30 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-emerald shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="flex gap-1 mb-4 text-emerald">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-white">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;