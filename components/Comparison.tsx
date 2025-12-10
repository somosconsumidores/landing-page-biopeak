import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

const Comparison: React.FC = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Por que escolher o BioPeak?</h2>
          <p className="text-gray-400 text-lg">Compare e veja como democratizamos o acesso à alta performance.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-left text-gray-500 font-medium w-1/4">Recurso</th>
                <th className="py-6 px-4 text-center bg-white/5 rounded-t-xl w-1/4 border-t border-x border-white/5">
                  <span className="text-xl font-bold text-white block">BioPeak</span>
                  <span className="text-sm text-emerald font-semibold">A Escolha Inteligente</span>
                </th>
                <th className="py-6 px-4 text-center text-gray-500 font-medium w-1/4">Strava Premium</th>
                <th className="py-6 px-4 text-center text-gray-500 font-medium w-1/4">Garmin Connect</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Preço Mensal", bio: "R$ 12,90", strava: "R$ 22,90", garmin: "Grátis (requer relógio R$2k+)" },
                { name: "Coach de IA", bio: true, strava: false, garmin: false },
                { name: "Planos Adaptativos", bio: true, strava: "limitado", garmin: "básico" },
                { name: "Plano Nutricional", bio: true, strava: false, garmin: false },
                { name: "Funciona sem Relógio", bio: true, strava: true, garmin: false },
                { name: "Análise de Fadiga", bio: true, strava: false, garmin: "básico" },
                { name: "Fitness Score", bio: true, strava: false, garmin: true },
              ].map((row, idx) => (
                <tr key={idx} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                  <td className="py-4 px-4 font-medium text-gray-300">{row.name}</td>
                  
                  {/* BioPeak Column */}
                  <td className="py-4 px-4 text-center bg-white/5 font-bold text-white border-x border-white/5">
                    {row.bio === true ? <Check className="inline text-emerald drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" size={24} strokeWidth={3} /> : row.bio}
                  </td>
                  
                  {/* Strava Column */}
                  <td className="py-4 px-4 text-center text-gray-500">
                     {row.strava === true ? <Check className="inline text-gray-600" /> : 
                      row.strava === false ? <X className="inline text-gray-700" /> : 
                      row.strava === "limitado" ? <span className="flex items-center justify-center gap-1 text-yellow-600/80"><AlertTriangle size={16}/> Limitado</span> :
                      row.strava}
                  </td>
                  
                  {/* Garmin Column */}
                  <td className="py-4 px-4 text-center text-gray-500">
                    {row.garmin === true ? <Check className="inline text-gray-600" /> : 
                     row.garmin === false ? <X className="inline text-gray-700" /> : 
                     row.garmin === "básico" ? <span className="flex items-center justify-center gap-1 text-yellow-600/80"><AlertTriangle size={16}/> Básico</span> :
                     row.garmin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center text-gray-600 text-sm">
          * Comparação baseada em recursos públicos em Nov/2025.
        </div>
      </div>
    </section>
  );
};

export default Comparison;