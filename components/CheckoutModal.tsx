import React, { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, User, Mail, Key, ArrowRight, CheckCircle2, Phone, Zap } from 'lucide-react';
import Button from './Button';
import { createClient } from '@supabase/supabase-js';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planPrice: string;
  flow?: 'free' | 'pro';
}

// CONFIGURAÇÃO DE AMBIENTE
const SUPABASE_URL = "https://grcwlmltlcltmwbhdpky.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyY3dsbWx0bGNsdG13YmhkcGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjQ1NjksImV4cCI6MjA2Nzc0MDU2OX0.vz_wCV_SEfsvWG7cSW3oJHMs-32x_XQF5hAYBY-m8sM";

// Inicializar cliente Supabase para Auth
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, planPrice, flow = 'pro' }) => {
  // Steps: signup -> processing (redirecting) -> download (only free)
  const [step, setStep] = useState<'signup' | 'processing' | 'download'>('signup');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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

  // LÓGICA PRINCIPAL: CRIAR CONTA E DIRECIONAR
  const handleSignupAndCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setLoadingMessage('Criando sua conta...');

    try {
      // 1. Validar e Formatar Telefone (E.164)
      let formattedPhone = phone.replace(/\D/g, ''); 
      if (!formattedPhone) throw new Error("Por favor, insira um telefone válido.");
      
      if (!phone.includes('+')) {
         if (formattedPhone.length <= 11) { 
            formattedPhone = `+55${formattedPhone}`;
         } else {
            formattedPhone = `+${formattedPhone}`;
         }
      } else {
         formattedPhone = `+${formattedPhone}`;
      }

      // 2. Chamada para Criar Usuário (Edge Function)
      const createUserRes = await fetch(`${SUPABASE_URL}/functions/v1/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phone: formattedPhone, 
          data: { display_name: name, phone: formattedPhone },
          metadata: { display_name: name, phone: formattedPhone }
        })
      });

      const userData = await createUserRes.json();
      if (!createUserRes.ok) {
        throw new Error(userData.error || userData.message || "Erro ao criar conta.");
      }

      // SE FOR FLUXO GRATUITO: ACABOU AQUI
      if (flow === 'free') {
        setIsLoading(false);
        setStep('download');
        return;
      }

      // SE FOR FLUXO PRO: INICIAR CHECKOUT
      setLoadingMessage('Iniciando sessão segura...');
      setStep('processing');

      // 3. Fazer Login para pegar Token (Necessário para o Checkout)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw new Error("Erro ao autenticar para pagamento.");

      setLoadingMessage('Gerando link de pagamento...');

      // 4. Chamar Edge Function para criar Sessão do Stripe
      const checkoutRes = await fetch(`${SUPABASE_URL}/functions/v1/create-flash-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.session?.access_token}` // Token do usuário logado
        },
        body: JSON.stringify({
          price_id: 'price_1S85CZI6QbtlS9WtNAIvlP4h'
        }) 
      });

      const checkoutData = await checkoutRes.json();
      
      if (!checkoutRes.ok) {
        throw new Error(checkoutData.error || "Erro ao gerar checkout.");
      }

      if (checkoutData.url) {
        setLoadingMessage('Redirecionando para o Stripe...');
        // 5. Redirecionar usuário para o Stripe
        window.location.href = checkoutData.url;
      } else {
        throw new Error("URL de pagamento não retornada.");
      }

    } catch (err: any) {
      console.error(err);
      setStep('signup'); // Voltar para o form em caso de erro
      setError(err.message || "Ocorreu um erro inesperado.");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMounted(false);
    setTimeout(onClose, 300);
  };

  const renderStepTitle = () => {
    if (step === 'signup') return flow === 'free' ? 'Criar Conta' : 'Passo 1: Cadastro';
    if (step === 'processing') return 'Processando...';
    if (step === 'download') return 'Download Gratuito';
    return 'BioPeak';
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
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-navy/50">
          <div className="flex items-center gap-2">
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

          {/* FORMULÁRIO DE CADASTRO */}
          {step === 'signup' && (
            <form onSubmit={handleSignupAndCheckout} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-6">
                 <h3 className="text-xl font-bold text-white">
                   {flow === 'free' ? 'Criar Conta Gratuita' : 'Comece sua Evolução'}
                 </h3>
                 <p className="text-gray-400 text-sm mt-1">
                   {flow === 'free' ? 'Preencha para baixar o app.' : 'Crie sua conta para prosseguir ao pagamento seguro.'}
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

          {/* TELA DE PROCESSAMENTO (LOADING / REDIRECT) */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald/20 blur-xl rounded-full animate-pulse"></div>
                <Loader2 size={64} className="text-emerald animate-spin relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{loadingMessage}</h3>
              <p className="text-gray-400 max-w-xs text-sm">
                Estamos preparando seu checkout seguro. Você será redirecionado para o Stripe em instantes.
              </p>
            </div>
          )}

          {/* TELA DE DOWNLOAD (APENAS FLUXO FREE) */}
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

        </div>
        
        {/* Footer decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald to-purpleAurora"></div>
      </div>
    </div>
  );
};

export default CheckoutModal;