import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Building2, FileText, Info, 
  Loader2, RefreshCw, DollarSign, Calendar, Check 
} from 'lucide-react';

// SERVIÇOS E CONTEXTO
import contractService from '../../services/contractService';
import { useContractConfig } from '../../contexts/ContractContext'; 

import './Hero.css';

// ASSETS
import logo3D from '../../assets/logo_Gemas_3D.png';
import manInChair from '../../assets/IMG-20251212-WA0016.png';

const Hero = () => {
  // 1. CONSUMIR O CONTEXTO (Dados globais carregados 1 vez no App.jsx)
  const { availableMonths, minAmount, isLoaded } = useContractConfig();

  // Estados Locais do Formulário
  const [valor, setValor] = useState(7000);
  const [prazo, setPrazo] = useState(12);
  const [receberFisico, setReceberFisico] = useState(false);
  
  // Estados de Resultado e UI
  const [simResult, setSimResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 2. Sincronizar defaults quando o Contexto carregar
  useEffect(() => {
    if (isLoaded) {
      // Garante que o valor inicial respeite o mínimo vindo da API
      if (valor < minAmount) {
        setValor(minAmount);
      }
      
      // Garante que o prazo inicial seja válido
      if (availableMonths.length > 0 && !availableMonths.includes(prazo)) {
         // Se 12 não estiver na lista, pega o último disponível
         setPrazo(availableMonths[availableMonths.length - 1]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, minAmount, availableMonths]); 

  // 3. Função de Simulação (Disparada apenas pelo botão)
  const handleSimulateClick = useCallback(async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setIsAnimating(true);
    
    try {
      // POST para simular (Isso ainda é feito aqui, pois depende da ação do user)
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
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isLoaded, valor, prazo, receberFisico]);

  // --- Utilitários de Renderização ---
  const formatCurrency = (val) => 
    val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00';

  // Lógica do Slider de Prazo (Mapeia index 0..N para os Meses Reais)
  const prazoIndex = availableMonths.indexOf(prazo) !== -1 ? availableMonths.indexOf(prazo) : 0;
  
  const handlePrazoChange = (e) => {
    const index = Number(e.target.value);
    if (availableMonths[index]) {
      setPrazo(availableMonths[index]);
    }
  };

  // --- Coreografia de Animação (Framer Motion) ---
  const containerSeq = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.2 }
    }
  };

  const textReveal = {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 } 
    }
  };

  const imageSimReveal = {
    hidden: { x: 50, opacity: 0 },
    show: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 1, ease: "easeOut", delay: 0.4 } 
    }
  };

  return (
    <section className="hero-wrapper">
      <div className="stage-bg"></div>

      {/* Navbar */}
      <nav className="navbar">
        <motion.div 
          className="brand"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={logo3D} alt="GemValue" className="brand-logo-3d" />
          <span className="brand-text-gradient">GemValue</span>
        </motion.div>
      </nav>

      <motion.div 
        className="hero-content"
        variants={containerSeq}
        initial="hidden"
        animate="show"
      >
        
        {/* === COLUNA ESQUERDA: TEXTOS === */}
        <div className="text-column">
          <motion.h1 variants={textReveal} className="big-bold-title">
            Ativos físicos reais para proteger e construir patrimônio.
          </motion.h1>
          
          <motion.p variants={textReveal} className="description-clean">
            A GemValue estrutura o acesso ao mercado de diamantes certificados,
            oferecendo propriedade real, transparência contratual e previsibilidade.
          </motion.p>

          <motion.div variants={textReveal} className="context-line">
             <Info size={16} className="text-emerald-400"/>
             Conheça o GemCash, o modelo de aquisição em ativos físicos da GemValue.
          </motion.div>

          <motion.div variants={textReveal} className="cta-block">
            <button className="btn-primary-solid">
              Simule sua estratégia em ativos físicos 
              <ArrowRight size={20} className="cta-arrow" />
            </button>
          </motion.div>
        </div>

        {/* === MICROPROVAS (Abaixo Texto) === */}
        <motion.div variants={textReveal} className="micro-proofs-container">
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

        {/* === COLUNA DIREITA: IMAGEM + CARD === */}
        <motion.div 
          className="image-sim-container"
          variants={imageSimReveal}
        >
          <div className="floor-shadow"></div>
          
          <div className="man-image-wrapper">
            <img src={manInChair} alt="Consultor" className="hero-man-integrated" />
          </div>

          {/* CARD DE SIMULAÇÃO (Integrado ao Hero) */}
          <div className="sim-card-right">
            
            {/* Inputs do Card */}
            <div className="card-inputs">
                
                {/* Input Valor */}
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

                {/* Input Prazo */}
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

                {/* Checkbox */}
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
              <span className="hero-result-label">Valor Final Estimado</span>
              
              <AnimatePresence mode='wait'>
                {isLoading ? (
                  /* Loader State */
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="hero-loader-wrapper"
                  >
                    <Loader2 size={32} className="spin-anim text-emerald-400" />
                  </motion.div>
                ) : !simResult ? (
                   /* Placeholder State (Antes de simular) */
                   <motion.div 
                     key="placeholder"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="hero-result-placeholder"
                   >
                     Clique abaixo para calcular a projeção
                   </motion.div>
                ) : (
                  /* Result State (Grid) */
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="hero-result-content"
                  >
                     <div className={`hero-result-big-value ${isAnimating ? 'blur-effect' : ''}`}>
                        {formatCurrency(simResult.finalAmount)}
                     </div>

                     <div className={`hero-details-grid ${isAnimating ? 'blur-effect' : ''}`}>
                        <div className="hero-detail-item">
                            <span className="h-det-label">Rentabilidade</span>
                            <span className="h-det-value text-green">{simResult.monthlyPercentage?.toFixed(2)}% <small>/mês</small></span>
                        </div>
                        <div className="hero-detail-item">
                            <span className="h-det-label">Ganho Mensal</span>
                            <span className="h-det-value">{formatCurrency(simResult.monthlyGain)}</span>
                        </div>
                        <div className="hero-detail-item">
                            <span className="h-det-label">Lucro Total</span>
                            <span className="h-det-value text-blue">{formatCurrency(simResult.totalGain)}</span>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botão de Ação */}
            <button 
                className="hero-btn-refazer" 
                onClick={handleSimulateClick}
                disabled={isLoading || !isLoaded}
            >
              <RefreshCw size={18} className={isLoading ? 'spin-anim' : ''} />
              {isLoading ? "Calculando..." : (simResult ? "Recalcular Simulação" : "Simular Agora")}
            </button>
            
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;