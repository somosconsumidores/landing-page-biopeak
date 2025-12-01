import React from 'react';

const AppShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-navy overflow-hidden relative">
      {/* Background aurora */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-purpleAurora/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Treino é físico.<br />
              <span className="aurora-text">Evolução é nos dados.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              O BioPeak é o primeiro app que democratiza a ciência do esporte. 
              Visualize seu "Fitness Score", monitore riscos de overtraining e receba insights 
              que antes só atletas profissionais tinham acesso.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_10px_#34d399]"></div>
                <span className="text-gray-300">Monitoramento de carga aguda vs. crônica</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_10px_#34d399]"></div>
                <span className="text-gray-300">Análise de variação de ritmo cardíaco (VFC)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_10px_#34d399]"></div>
                <span className="text-gray-300">Previsão de tempo para provas (5K, 10K, 21K)</span>
              </li>
            </ul>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center items-center">
             {/* Abstract background shapes */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 w-full transform transition-transform hover:scale-105 duration-500">
                <img 
                  src="https://grcwlmltlcltmwbhdpky.supabase.co/storage/v1/object/public/Geral/combo.png" 
                  alt="BioPeak Interface Combo" 
                  className="w-full h-auto drop-shadow-2xl"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;