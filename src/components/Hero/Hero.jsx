import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, FileText, ShieldCheck, Info } from 'lucide-react';
import './Hero.css';

// ASSETS
import logo3D from '../../assets/logo_Gemas_3D.png';
import manInChair from '../../assets/IMG-20251212-WA0016.png';

const Hero = () => {
  const [valor, setValor] = useState(7000);
  const [prazo, setPrazo] = useState(3);
  const [receberFisico, setReceberFisico] = useState(false);

  // --- COREOGRAFIA DA ANIMAÇÃO ---
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
      
      {/* Background */}
      <div className="stage-bg"></div>

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
        
        <div className="nav-menu">
            <a href="#plataforma">Plataforma</a>
            <a href="#modelo">O Modelo</a>
            <button className="nav-btn-vibrant">Simular Agora</button>
        </div>
      </nav>

      <motion.div 
        className="hero-content"
        variants={containerSeq}
        initial="hidden"
        animate="show"
      >
        
        {/* COLUNA TEXTO - Atualizada com os textos novos */}
        <div className="text-column">
          
          {/* Headline (H1) */}
          <motion.h1 variants={textReveal} className="big-bold-title">
            Ativos físicos reais para proteger e construir patrimônio.
          </motion.h1>
          
          {/* Subheadline (H2) */}
          <motion.p variants={textReveal} className="description-clean">
            A GemValue estrutura o acesso ao mercado de diamantes certificados,
            oferecendo propriedade real, transparência contratual e previsibilidade fora do
            mercado financeiro tradicional.
          </motion.p>

          {/* Linha de Contexto (H3 Leve) */}
          <motion.div variants={textReveal} className="context-line">
             <Info size={16} className="text-emerald-400"/>
             Conheça o GemCash, o modelo de aquisição em ativos físicos da GemValue.
          </motion.div>

          {/* CTA Principal */}
          <motion.div variants={textReveal} className="cta-block">
            <button className="btn-primary-solid">
              Simule sua estratégia em ativos físicos <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* MICROPROVAS - Lado a Lado */}
          <motion.div variants={textReveal} className="micro-proofs-container">
            <div className="proof-item">
              <div className="proof-icon-box">
                <ShieldCheck size={18} />
              </div>
              <span>Ativos físicos certificados</span>
            </div>
            <div className="proof-item">
              <div className="proof-icon-box">
                <FileText size={18} />
              </div>
              <span>Propriedade real e contratual</span>
            </div>
            <div className="proof-item">
              <div className="proof-icon-box">
                <Building2 size={18} />
              </div>
              <span>Estrutura Gemas Brilhantes desde 2018</span>
            </div>
          </motion.div>

        </div>

        {/* COLUNA DIREITA (SIMULADOR) - Mantida igual */}
        <motion.div 
          className="image-sim-container"
          variants={imageSimReveal}
        >
          <div className="floor-shadow"></div>
          
          <div className="man-image-wrapper">
            <img 
              src={manInChair} 
              alt="Consultor" 
              className="hero-man-integrated"
            />
          </div>

          <div className="sim-card-right">
            <h3 className="sim-card-title">Simulação GemCash</h3>
            
            <div className="sim-field-group">
              <label>Valor do Aporte</label>
              <div className="sim-input-wrapper">
                <span>R$</span>
                <input 
                  type="text" 
                  value={valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  readOnly
                  className="sim-input-text"
                />
              </div>
              <input 
                type="range" 
                min="3000" 
                max="100000" 
                step="500"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                className="vibrant-range"
              />
            </div>

            <div className="sim-field-group">
              <label>Prazo do Contrato</label>
              <div className="sim-input-wrapper">
                <input 
                  type="number" 
                  value={prazo}
                  onChange={(e) => setPrazo(Number(e.target.value))}
                  className="sim-input-number"
                />
                <span className="suffix">meses</span>
              </div>
            </div>

            <label className="sim-checkbox-label">
              <input 
                type="checkbox"
                checked={receberFisico}
                onChange={() => setReceberFisico(!receberFisico)}
              />
              <span className="checkbox-custom"></span>
              Desejo receber a gema física.
            </label>

            <button className="btn-simular-full">
              Simular Agora
            </button>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;