import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, CheckCircle2, Loader2, AlertCircle, User, Mail, Key, ArrowRight, ArrowLeft, Phone, Download } from 'lucide-react';
import Button from './Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planPrice: string;
  flow?: 'free' | 'pro';
}

// CONFIGURAÇÃO DE AMBIENTE
const SUPABASE_URL = "https://grcwlmltlcltmwbhdpky.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyY3dsbWx0bGNsdG13YmhkcGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjQ1NjksImV4cCI6MjA2Nzc0MDU2OX0.vz_wCV_SEfsvWG7cSW3oJHMs-32x_XQF5hAYBY-m8sM";

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, planPrice, flow = 'pro' }) => {
  // Steps: signup -> payment (only pro) -> processing -> success -> download (only free)
  const [step, setStep] = useState<'signup' | 'payment' | 'processing' | 'success' | 'download'>('signup');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // Handle animation mounting
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setStep('signup'); // Reset to start
      setError(null);
    } else {
      setTimeout(() => setStep('signup'), 300);
    }
  }, [isOpen]);

  if (!isOpen && !mounted) return null;

  // PASSO 1: CRIAR USUÁRIO
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Validar e Formatar Telefone (E.164)
      let formattedPhone = phone.replace(/\D/g, ''); // Remove tudo que não é número
      if (!formattedPhone) {
        throw new Error("Por favor, insira um telefone válido.");
      }
      // Se não começar com +, adicionar código do país (assumindo BR +55 se faltar)
      if (!phone.includes('+')) {
         if (formattedPhone.length <= 11) { // Ex: 11999999999
            formattedPhone = `+55${formattedPhone}`;
         } else {
            formattedPhone = `+${formattedPhone}`;
         }
      } else {
         formattedPhone = `+${formattedPhone}`;
      }

      console.log("Criando usuário em:", `${SUPABASE_URL}/functions/v1/create-user`);

      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phone: formattedPhone, // Auth Phone
          data: { // Metadata no padrão do cliente JS
            display_name: name,
            phone: formattedPhone
          },
          metadata: { // Metadata redundante para function
            display_name: name,
            phone: formattedPhone
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Falha ao criar conta. Verifique os dados.");
      }

      // Sucesso na criação
      console.log("Usuário criado com sucesso:", data);
      setUserId(data.id || data.user?.id);

      // LÓGICA DE FLUXO
      if (flow === 'free') {
        setStep('download'); // Pula pagamento
      } else {
        setStep('payment'); // Vai para pagamento
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao criar conta.");
    } finally {
      setIsLoading(false);
    }
  };

  // PASSO 2: PAGAMENTO
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setError(null);
    
    try {
      // Simulação de pagamento Pro
      console.log("Processando pagamento para:", email);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (Math.random() > 0.05) { 
        setStep('success');
      } else {
        throw new Error("O cartão foi recusado pelo banco emissor.");
      }

    } catch (err: any) {
      setStep('payment');
      setError(err.message || "Ocorreu um erro no processamento.");
    }
  };

  const handleClose = () => {
    setMounted(false);
    setTimeout(onClose, 300);
  };

  const renderStepTitle = () => {
    if (step === 'signup') return 'Passo 1: Criar Conta';
    if (step === 'payment' || step === 'processing') return 'Passo 2: Assinatura Pro';
    if (step === 'download') return 'Download Gratuito';
    return 'Concluído';
  }

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div className={`relative bg-surface w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header with Progress */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-navy/50">
          <div className="flex items-center gap-2">
             {(step === 'signup' || step === 'payment') && <div className="h-2 w-2 rounded-full bg-emerald animate-pulse"></div>}
             <span className="text-sm font-bold text-white uppercase tracking-wider">
               {renderStepTitle()}
             </span>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 text-red-200 text-sm mb-6 animate-in slide-in-from-top-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* STEP 1: SIGN UP FORM */}
          {step === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-6">
                 <h3 className="text-xl font-bold text-white">
                   {flow === 'free' ? 'Criar Conta Gratuita' : 'Comece sua Jornada'}
                 </h3>
                 <p className="text-gray-400 text-sm mt-1">
                   {flow === 'free' ? 'Cadastre-se para baixar o app e começar a treinar.' : 'Crie sua conta BioPeak para acessar o Plano Pro.'}
                 </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Nome Completo</label>
                <div className="relative group">
                  <User size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-emerald transition-colors" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-navy border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Email</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-emerald transition-colors" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-navy border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Celular</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-emerald transition-colors" />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-navy border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Senha</label>
                <div className="relative group">
                  <Key size={18} className="absolute left-3 top-3 text-gray-500 group-focus-within:text-emerald transition-colors" />
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-navy border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                  />
                </div>
              </div>

              <Button type="submit" fullWidth className="py-4 mt-2" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {flow === 'free' ? 'Criar Conta e Baixar' : 'Continuar para Pagamento'} <ArrowRight size={18} />
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* STEP: DOWNLOAD (FREE FLOW) */}
          {step === 'download' && (
            <div className="text-center animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="w-16 h-16 bg-emerald/20 rounded-full flex items-center justify-center text-emerald mx-auto mb-6 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Conta Criada!</h3>
              <p className="text-gray-400 mb-8">
                Tudo pronto, <strong>{name.split(' ')[0]}</strong>. Baixe o BioPeak agora e faça login com seu email.
              </p>

              <div className="space-y-3">
                 <a 
                   href="https://apps.apple.com/us/app/biopeak-ai/id6752911184?ct=cta&mt=lpmarketing" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-3 bg-white text-navy px-4 py-3 rounded-xl hover:bg-gray-200 transition-all font-bold w-full"
                 >
                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6 shrink-0">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                    </svg>
                    <span>Baixar na App Store</span>
                 </a>

                 <a 
                   href="https://play.google.com/store/apps/details?id=com.biopeakai.performance&pcampaignid=homepage" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-3 bg-surfaceHighlight border border-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all w-full"
                 >
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6 shrink-0">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                    <span>Baixar no Google Play</span>
                 </a>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT FORM (PRO ONLY) */}
          {step === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
              
              <button 
                type="button" 
                onClick={() => setStep('signup')}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft size={12} /> Voltar e editar dados
              </button>

              {/* Order Summary */}
              <div className="flex justify-between items-baseline mb-6 pb-6 border-b border-white/5 bg-white/5 p-4 rounded-xl">
                <div>
                  <h3 className="text-white font-bold text-lg">BioPeak Pro</h3>
                  <p className="text-emerald text-sm font-medium">{email}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">R$ {planPrice}</span>
                  <span className="text-gray-500 text-sm">/mês</span>
                </div>
              </div>

              {/* Fake Stripe Elements Container */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Cartão de Crédito</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald transition-colors">
                      <CreditCard size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-navy border border-white/10 rounded-t-lg px-4 py-3 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all z-10 relative"
                    />
                    <div className="flex -mt-[1px]">
                      <input 
                        type="text" 
                        required
                        placeholder="MM / AA"
                        className="w-1/2 bg-navy border border-white/10 rounded-bl-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="CVC"
                        className="w-1/2 bg-navy border border-white/10 border-l-0 rounded-br-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Titular do Cartão</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nome impresso no cartão"
                    className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all"
                  />
                </div>
              </div>

              <Button type="submit" fullWidth className="py-4 mt-4 text-lg shadow-lg shadow-emerald/20">
                Finalizar Assinatura
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                <Lock size={12} />
                <span>Ambiente Seguro (256-bit SSL)</span>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 size={48} className="text-emerald animate-spin mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Processando Pagamento...</h3>
              <p className="text-gray-400">Não feche esta janela.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald/20 rounded-full flex items-center justify-center text-emerald mb-6 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 size={40} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Bem-vindo ao Time!</h3>
              <p className="text-gray-400 mb-8 max-w-xs">
                Sua conta foi criada e a assinatura confirmada. Baixe o app e faça login com <strong>{email}</strong>.
              </p>
              <Button onClick={handleClose} fullWidth variant="outline">
                Fechar
              </Button>
            </div>
          )}

        </div>
        
        {/* Footer decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald to-purpleAurora"></div>
      </div>
    </div>
  );
};

export default CheckoutModal;