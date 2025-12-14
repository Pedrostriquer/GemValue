import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSignature, 
  Gem, 
  ShieldCheck, 
  Vault, 
  TrendingUp, 
  Gavel 
} from 'lucide-react';
import './HowItWorks.css';

// Imports de Imagem
import businessManImg from '../../assets/handsome-businessman-in-formal-wear-and-glasses-holding-documents-e1676622127393.jpg';
import logoGemas from '../../assets/logo_Gemas_3D.png';

const HowItWorks = () => {
  
  const steps = [
    { 
      id: "01",
      icon: <Gem size={28} />,
      title: "Aquisição Estruturada", 
      desc: "Seleção de lotes de diamantes com certificação GIA/IGI e alto potencial de liquidez." 
    },
    { 
      id: "02",
      icon: <FileSignature size={28} />,
      title: "Contrato Jurídico", 
      desc: "Formalização completa de compra e venda, garantindo a titularidade legal do ativo." 
    },
    { 
      id: "03",
      icon: <ShieldCheck size={28} />,
      title: "Propriedade Real", 
      desc: "O ativo deixa de ser um número na tela e torna-se um bem físico auditável em seu nome." 
    },
    { 
      id: "04",
      icon: <Vault size={28} />,
      title: "Custódia ou Posse", 
      desc: "Liberdade para manter em nossos cofres de segurança máxima ou retirar fisicamente." 
    },
    { 
      id: "05",
      icon: <TrendingUp size={28} />,
      title: "Monitoramento", 
      desc: "Acompanhamento transparente da valorização do ativo no mercado internacional." 
    },
    { 
      id: "06",
      icon: <Gavel size={28} />,
      title: "Decisão Final", 
      desc: "Total autonomia para liquidar o ativo ou mantê-lo como herança patrimonial." 
    }
  ];

  return (
    <section className="how-wrapper">
      <div className="how-bg-glow"></div>
      
      <div className="how-container">
        
        {/* HEADER */}
        <div className="how-header">
          <span className="how-tag">FLUXO OPERACIONAL</span>
          <h2 className="how-title">
            Como funciona a estrutura <br />
            <span className="title-highlight">GemCash</span>
          </h2>
        </div>

        <div className="how-main-grid">
          
          {/* COLUNA ESQUERDA: VISUAL COMPLEXO (NEBO STYLE) */}
          <div className="how-visual-area">
            <div className="complex-nebo-wrapper">
              
              {/* Imagem de Fundo */}
              <img 
                src={businessManImg} 
                alt="Consultor Especialista" 
                className="nebo-bg-image"
              />

              {/* O Container da Logo com Borda Invertida Complexa */}
              <div className="nebo-logo-container">
                {/* As Curvas Invertidas (CSS Magic) */}
                <div className="inverted-curve-bottom"></div>
                <div className="inverted-curve-left"></div>
                
                {/* A Logo em si */}
                <img src={logoGemas} alt="Logo GemCash" className="gemcash-logo" />
              </div>

              {/* Card Flutuante Decorativo (Ex: Status) */}
              <motion.div 
                className="status-card"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="status-dot"></div>
                <span>Processo Auditado</span>
              </motion.div>

            </div>
          </div>

          {/* COLUNA DIREITA: GRID DE CARDS (PROCESSO) */}
          <div className="how-steps-grid">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="process-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="card-header">
                  <div className="icon-wrapper-glass">
                    {step.icon}
                  </div>
                  <span className="step-number">{step.id}</span>
                </div>
                
                <h3 className="card-title">{step.title}</h3>
                <p className="card-desc">{step.desc}</p>
                
                {/* Efeito de borda brilhante no hover */}
                <div className="card-border-glow"></div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;