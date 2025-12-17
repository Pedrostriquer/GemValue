import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSignature, 
  Gem, 
  ShieldCheck, 
  Vault, 
  TrendingUp, 
  Gavel,
  MessageCircle 
} from 'lucide-react';
import './HowItWorks.css';

// Importa o efeito de brilho
import { GlowingEffect } from '../ui/GlowingEffect';

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

  const handleCtaClick = () => {
    const phoneNumber = "5508000004998"; 
    const message = "Olá, entendi o fluxo operacional do GemCash e gostaria de saber mais detalhes sobre como iniciar minha aquisição.";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="how-wrapper">
      <div className="how-bg-glow"></div>
      
      <div className="how-container">
        
        {/* HEADER */}
        <div className="how-header">
          <span className="how-tag">FLUXO OPERACIONAL</span>
          <h2 className="how-title">
            A estrutura operacional do <br />
            <span className="title-highlight">GemCash</span>
          </h2>
        </div>

        <div className="how-main-grid">
          
          {/* GRID FULL WIDTH: 3 COLUNAS */}
          <div className="how-steps-grid">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="process-card-wrapper" 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* ESTRUTURA DO CARD COM EFEITO */}
                <div className="relative-glow-card">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  
                  {/* CONTEÚDO INTERNO DO CARD */}
                  <div className="process-card-content">
                    <div className="card-header">
                      <div className="icon-wrapper-glass">
                        {step.icon}
                      </div>
                      <span className="step-number">{step.id}</span>
                    </div>
                    
                    <h3 className="card-title">{step.title}</h3>
                    <p className="card-desc">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* CTA BUTTON AREA */}
        <motion.div 
            className="how-cta-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
        >
            <motion.button 
                className="btn-gemcash-glass"
                onClick={handleCtaClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="glass-btn-icon">
                    <MessageCircle size={20} />
                </div>
                <span>Quero saber mais sobre o GemCash</span>
            </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;