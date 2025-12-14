import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Gem, 
  Award, 
  Lock, 
  Users 
} from 'lucide-react';
import './Authority.css';

import logoGemasBg from '../../assets/GEMAS BRILHANTES-109 (1).png';

const Authority = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacityAnim = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.15]);
  
  const filterAnim = useTransform(scrollYProgress, (value) => {
    const peak = 1 - Math.abs(value - 0.5) * 2;
    const brightness = 1.2 + (peak * 1.5);
    const contrast = 1.2 + (peak * 0.5);
    const grayscale = 100 - (peak * 50);
    return `grayscale(${grayscale}%) brightness(${brightness}) contrast(${contrast})`;
  });

  const pillars = [
    { icon: <Gem size={24} />, title: "Curadoria", text: "Seleção técnica especializada" },
    { icon: <Award size={24} />, title: "Procedência", text: "Certificação internacional GIA/IGI" },
    { icon: <Lock size={24} />, title: "Privacidade", text: "Estrutura segura e sigilosa" },
    { icon: <Users size={24} />, title: "Advisory", text: "Atendimento consultivo 1:1" }
  ];

  return (
    <section className="authority-wrapper" ref={sectionRef}>
      
      {/* CORTES GEOMÉTRICOS */}
      <div className="auth-clip-top"></div>
      <div className="auth-clip-bottom"></div>

      {/* NOVO: EFEITO DE LUZ CENTRAL (GLOW) */}
      <div className="authority-glow"></div>

      {/* CAMADA DO FUNDO (LOGO) */}
      <motion.div 
        className="authority-fixed-bg"
        style={{ 
          backgroundImage: `url('${logoGemasBg}')`,
          opacity: opacityAnim,
          filter: filterAnim
        }}
      />
      
      <div className="authority-overlay"></div>

      <div className="authority-container">
        <motion.div 
          className="auth-content-centered"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          
          <div className="auth-header">
            {/* O gradiente agora está no H2 inteiro */}
            <h2 className="auth-title text-titanium-gradient">
              Uma estrutura desenvolvida pela <br />
              Gemas Brilhantes.
            </h2>
          </div>

          <p className="auth-desc">
            A GemValue e o GemCash são soluções desenvolvidas pela <strong>Gemas Brilhantes</strong>, 
            empresa com atuação desde 2018 no mercado de diamantes e ativos físicos, 
            reconhecida pela excelência técnica e operação transparente.
          </p>

          <div className="simple-blue-divider"></div>

          <div className="pillars-grid-center">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-clean">
                <div className="pillar-icon-box">
                  {pillar.icon}
                </div>
                <div className="pillar-info">
                  <h4>{pillar.title}</h4>
                  <span>{pillar.text}</span>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Authority;