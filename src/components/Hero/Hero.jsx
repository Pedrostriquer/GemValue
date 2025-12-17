import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Building2, FileText, Info, 
  Loader2, RefreshCw, DollarSign, Calendar, Check, MessageCircle
} from 'lucide-react';

// SERVIÇOS E CONTEXTO
import contractService from '../../services/contractService';
import { useContractConfig } from '../../contexts/ContractContext'; 

import './Hero.css';

// ASSETS
import logo3D from '../../assets/logo_Gemas_3D.png';
import manInChair from '../../assets/IMG-20251212-WA0016.png';

const Hero = () => {
  const { availableMonths, minAmount, isLoaded } = useContractConfig();

  // Estados Locais
  const [valor, setValor] = useState(7000);
  const [prazo, setPrazo] = useState(12);
  const [receberFisico, setReceberFisico] = useState(false);
  
  // Estados de Resultado e UI
  const [simResult, setSimResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para mensagem do WhatsApp
  const [contactMessage, setContactMessage] = useState('');

  // Sincronizar defaults
  useEffect(() => {
    if (isLoaded) {
      if (valor < minAmount) setValor(minAmount);
      if (availableMonths.length > 0 && !availableMonths.includes(prazo)) {
         setPrazo(availableMonths[availableMonths.length - 1]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, minAmount, availableMonths]); 

  // Quando houver resultado, define a mensagem padrão
  useEffect(() => {
    if (simResult) {
      setContactMessage("Olá, fiz uma simulação no site e gostaria de saber como consolidar esse resultado diversificando meu patrimônio com ativos físicos.");
    }
  }, [simResult]);

  const handleSimulateClick = useCallback(async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      const result = await contractService.simulate({
        amount: valor,
        months: prazo,
        withGem: receberFisico
      });
      setSimResult(result);
    } catch (error) {
      console.error("Erro na simulação:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, valor, prazo, receberFisico]);

  const formatCurrency = (val) => 
    val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00';

  // Função para enviar para o WhatsApp
  const handleContactClick = () => {
    if (!simResult) return;

    const breakLine = "%0A";
    const boldStart = "*";
    const boldEnd = "*";

    // Monta a mensagem completa com dados técnicos para o consultor
    const finalMessage = 
      `${contactMessage}` +
      `${breakLine}${breakLine}` +
      `--------------------------------` +
      `${breakLine}${boldStart}📊 Detalhes da Simulação:${boldEnd}` +
      `${breakLine}💰 Aporte: ${formatCurrency(valor)}` +
      `${breakLine}📅 Prazo: ${prazo} meses` +
      `${breakLine}💎 Gema Física: ${receberFisico ? 'Sim' : 'Não'}` +
      `${breakLine}🚀 Valor Final Est.: ${formatCurrency(simResult.finalAmount)}` +
      `${breakLine}📈 Lucro Total: ${formatCurrency(simResult.totalGain)}` +
      `${breakLine}--------------------------------`;

    const phoneNumber = "5508000004998"; 
    window.open(`https://wa.me/${phoneNumber}?text=${finalMessage}`, '_blank');
  };

  const prazoIndex = availableMonths.indexOf(prazo) !== -1 ? availableMonths.indexOf(prazo) : 0;
  
  const handlePrazoChange = (e) => {
    const index = Number(e.target.value);
    if (availableMonths[index]) setPrazo(availableMonths[index]);
  };

  const animations = useMemo(() => ({
    containerSeq: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.05 }
      }
    },
    textReveal: {
      hidden: { y: 10, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.4, ease: "easeOut" } }
    },
    imageSimReveal: {
      hidden: { x: 20, opacity: 0 },
      show: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.5, ease: "easeOut", delay: 0.1 } }
    }
  }), []);

  return (
    <section className="hero-wrapper">
      <div className="stage-bg"></div>

      <nav className="navbar">
        <motion.div 
          className="brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo3D} alt="GemValue" className="brand-logo-3d" />
          <span className="brand-text-gradient">GemValue</span>
        </motion.div>
      </nav>

      <motion.div 
        className="hero-content"
        variants={animations.containerSeq}
        initial="hidden"
        animate="show"
      >
        
        {/* === COLUNA ESQUERDA === */}
        <div className="text-column">
          <motion.h1 variants={animations.textReveal} className="big-bold-title">
            Ativos físicos reais para proteger e construir patrimônio.
          </motion.h1>
          
          <motion.p variants={animations.textReveal} className="description-clean">
            A GemValue estrutura o acesso ao mercado de diamantes certificados,
            oferecendo propriedade real, transparência contratual e previsibilidade.
          </motion.p>

          <motion.div variants={animations.textReveal} className="context-line">
             <Info size={16} className="text-emerald-400"/>
             Conheça o GemCash, o modelo de aquisição em ativos físicos da GemValue.
          </motion.div>

          <motion.div variants={animations.textReveal} className="cta-block">
            <button className="btn-primary-solid">
              Simule sua estratégia em ativos físicos 
              <ArrowRight size={20} className="cta-arrow" />
            </button>
          </motion.div>
        </div>

        {/* === MICROPROVAS === */}
        <motion.div variants={animations.textReveal} className="micro-proofs-container">
            <div className="proof-item">
              <div className="proof-icon-box"><ShieldCheck size={18} /></div>
              <span>Ativos físicos certificados</span>
            </div>
            <div className="proof-item">
              <div className="proof-icon-box"><FileText size={18} /></div>
              <span>Propriedade real e contratual</span>
            </div>
            <div className="proof-item">
              <div className="proof-icon-box"><Building2 size={18} /></div>
              <span>Estrutura Gemas Brilhantes desde 2018</span>
            </div>
        </motion.div>

        {/* === COLUNA DIREITA === */}
        <motion.div 
          className="image-sim-container"
          variants={animations.imageSimReveal}
        >
          <div className="floor-shadow"></div>
          
          <div className="man-image-wrapper">
            <img 
              src={manInChair} 
              alt="Consultor" 
              className="hero-man-integrated"
              fetchPriority="high" 
            />
          </div>

          {/* CARD DE SIMULAÇÃO */}
          <div className="sim-card-right">
            
            <div className="card-inputs">
                <div className="input-group">
                  <div className="label-row">
                    <span className="input-label"><DollarSign size={16}/> Valor do Aporte</span>
                    <span className="input-value-highlight">{formatCurrency(valor)}</span>
                  </div>
                  <input 
                    type="range" 
                    min={minAmount} 
                    max="500000" 
                    step="1000"
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="vibrant-range"
                    disabled={!isLoaded}
                  />
                  <div className="range-limits">
                    <span>{formatCurrency(minAmount)}</span>
                    <span>{formatCurrency(500000)}</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="label-row">
                    <span className="input-label"><Calendar size={16}/> Prazo (Meses)</span>
                    <span className="input-value-highlight">{isLoaded ? prazo : "..."} meses</span>
                  </div>
                  
                  {availableMonths.length > 0 && (
                    <input 
                      type="range" 
                      min="0" 
                      max={availableMonths.length - 1} 
                      step="1"
                      value={prazoIndex}
                      onChange={handlePrazoChange}
                      className="vibrant-range"
                      disabled={!isLoaded}
                    />
                  )}
                  
                  <div className="range-limits">
                    <span>{availableMonths[0] || '-'} m</span>
                    <span>{availableMonths[availableMonths.length -1] || '-'} m</span>
                  </div>
                </div>

                <div className="checkbox-group-hero">
                    <label className="custom-checkbox-hero" onClick={() => setReceberFisico(!receberFisico)}>
                        <div className={`checkbox-box-hero ${receberFisico ? 'checked' : ''}`}>
                            {receberFisico && <Check size={14} color="white" strokeWidth={3} />}
                        </div>
                        <span className="checkbox-text-hero">Incluir recebimento da Gema Física</span>
                    </label>
                </div>
            </div>

            <div className="card-divider-hero"></div>

            {/* Resultado da Simulação */}
            <div className="hero-card-result">
              
              <AnimatePresence mode='wait'>
                {isLoading ? (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="hero-loader-wrapper"
                  >
                    <Loader2 size={32} className="spin-anim text-emerald-400" />
                  </motion.div>
                ) : !simResult ? (
                   <motion.div 
                     key="placeholder"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="hero-result-placeholder"
                   >
                     <span className="hero-result-label">Resultado Estimado</span>
                     <p>Clique abaixo para calcular a projeção</p>
                   </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="hero-result-content"
                  >
                     <span className="hero-result-label">Valor Final Estimado</span>
                     <div className="hero-result-big-value">
                        {formatCurrency(simResult.finalAmount)}
                     </div>

                     <div className="hero-details-grid">
                        <div className="hero-detail-item">
                            <span className="h-det-label">Rentabilidade</span>
                            <span className="h-det-value text-green">{simResult.monthlyPercentage?.toFixed(2)}% <small>/mês</small></span>
                        </div>
                        <div className="hero-detail-item">
                            <span className="h-det-label">Ganho Mensal</span>
                            <span className="h-det-value">{formatCurrency(simResult.monthlyGain)}</span>
                        </div>
                        {/* RESTAURADO O LUCRO TOTAL */}
                        <div className="hero-detail-item">
                            <span className="h-det-label">Lucro Total</span>
                            <span className="h-det-value text-blue">{formatCurrency(simResult.totalGain)}</span>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ÁREA DE AÇÃO (Botões) */}
            <div className="hero-actions-area">
                {!simResult || isLoading ? (
                    <button 
                        className="hero-btn-refazer primary-action" 
                        onClick={handleSimulateClick}
                        disabled={isLoading || !isLoaded}
                    >
                    <RefreshCw size={18} className={isLoading ? 'spin-anim' : ''} />
                    {isLoading ? "Calculando..." : "Simular Agora"}
                    </button>
                ) : (
                    // INPUT + BOTÃO PULSANTE
                    <motion.div 
                        className="hero-contact-wrapper"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="hero-msg-input-box">
                            <textarea 
                                className="hero-msg-textarea"
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {/* Classe 'pulse-anim-btn' adicionada para o efeito sutil */}
                        <button className="btn-contact-action pulse-anim-btn" onClick={handleContactClick}>
                            <MessageCircle size={20} />
                            Falar com Consultor
                        </button>

                        <button className="btn-text-only-refazer" onClick={handleSimulateClick}>
                            Refazer simulação
                        </button>
                    </motion.div>
                )}
            </div>
            
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;