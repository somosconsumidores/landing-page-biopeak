
import React, { useState, useEffect } from 'react';
// Added missing Smartphone import from lucide-react
import { X, Loader2, AlertCircle, User, Mail, Key, ArrowRight, CheckCircle2, Phone, Zap, Smartphone } from 'lucide-react';
import Button from './Button';
import { createClient } from '@supabase/supabase-js';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planPrice: string;
  flow?: 'free' | 'pro';
  utmSource?: string | null;
}

// CONFIGURAÇÃO DE AMBIENTE
const SUPABASE_URL = "https://grcwlmltlcltmwbhdpky.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyY3dsbWx0bGNsdG13YmhkcGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjQ1NjksImV4cCI6MjA2Nzc0MDU2OX0.vz_wCV_SEfsvWG7cSW3oJHMs-32x_XQF5hAYBY-m8sM";

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, planPrice, flow = 'pro', utmSource }) => {
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

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setStep('signup');
      setError(null);
    } else {
      setTimeout(() => setStep('signup'), 300);
    }
  }, [isOpen]);

  if (!isOpen && !mounted) return null;

  const handleSignupAndCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !password || password.length < 6) {
      setError("Por favor, preencha todos os campos corretamente. A senha deve ter no mínimo 6 caracteres.");
      setIsLoading(false);
      return;
    }

    setLoadingMessage('Criando sua conta...');

    try {
      // 1. Formatar Telefone (E.164)
      let formattedPhone = phone.replace(/\D/g, ''); 
      if (!formattedPhone) throw new Error("Por favor, insira um telefone válido.");
      
      if (!phone.includes('+')) {
         formattedPhone = formattedPhone.length <= 11 ? `+55${formattedPhone}` : `+${formattedPhone}`;
      } else {
         formattedPhone = `+${formattedPhone.replace('+', '')}`;
      }

      // 2. Chamada para Edge Function para criar o usuário no Supabase
      const createUserRes = await fetch(`${SUPABASE_URL}/functions/v1/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          name: name.trim(),
          phone: formattedPhone, 
          data: { 
            display_name: name.trim(), 
            phone: formattedPhone,
            utm_source: utmSource || 'direct'
          },
          metadata: { 
            display_name: name.trim(), 
            phone: formattedPhone,
            utm_source: utmSource || 'direct'
          }
        })
      });

      const userData = await createUserRes.json();
      if (!createUserRes.ok) {
        throw new Error(userData.error || userData.message || "Erro ao criar conta.");
      }

      // FLUXO GRATUITO
      if (flow === 'free') {
        setIsLoading(false);
        setStep('download');
        return;
      }

      // FLUXO PRO: REDIRECIONAMENTO DIRETO PARA O STRIPE COM EMAIL PREENCHIDO
      setLoadingMessage('Redirecionando para o pagamento seguro...');
      setStep('processing');

      // Construir a URL de checkout com o email preenchido
      const stripeCheckoutUrl = `https://buy.stripe.com/6oU14ncIr7ML6q8dK20RG02?prefilled_email=${encodeURIComponent(email.trim())}`;
      
      // Pequeno delay para o usuário ver a transição
      setTimeout(() => {
        window.location.href = stripeCheckoutUrl;
      }, 800);

    } catch (err: any) {
      console.error(err);
      setStep('signup');
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>

      <div className={`relative bg-surface w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-navy/50">
          <span className="text-sm font-bold text-white uppercase tracking-wider">{renderStepTitle()}</span>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 text-red-200 text-sm mb-6 animate-in slide-in-from-top-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

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
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Nome Completo <span className="text-red-500">*</span></label>
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
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Email <span className="text-red-500">*</span></label>
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
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Celular <span className="text-red-500">*</span></label>
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
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Senha <span className="text-red-500">*</span></label>
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

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald/20 blur-xl rounded-full animate-pulse"></div>
                <Loader2 size={64} className="text-emerald animate-spin relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{loadingMessage}</h3>
              <p className="text-gray-400 max-w-xs text-sm">
                Estamos preparando seu checkout seguro no Stripe.
              </p>
            </div>
          )}

          {step === 'download' && (
            <div className="text-center animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="w-16 h-16 bg-emerald/20 rounded-full flex items-center justify-center text-emerald mx-auto mb-6 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Conta Criada!</h3>
              <p className="text-gray-400 mb-8">Tudo pronto! Baixe o BioPeak agora e faça login com seu e-mail.</p>

              <div className="space-y-3">
                 <a href="https://apps.apple.com/us/app/biopeak-ai/id6752911184" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white text-navy px-4 py-3 rounded-xl hover:bg-gray-200 transition-all font-bold w-full">
                    <Smartphone size={20} />
                    <span>Baixar na App Store</span>
                 </a>
                 <a href="https://play.google.com/store/apps/details?id=com.biopeakai.performance" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-surfaceHighlight border border-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all w-full">
                    <Zap size={20} />
                    <span>Baixar no Google Play</span>
                 </a>
              </div>
            </div>
          )}
        </div>
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald to-purpleAurora"></div>
      </div>
    </div>
  );
};

export default CheckoutModal;
