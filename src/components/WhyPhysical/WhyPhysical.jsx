import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gem, 
  TrendingDown, 
  Landmark, 
  FileKey, 
  Sprout 
} from 'lucide-react';
import './WhyPhysical.css';

const WhyPhysical = () => {
  
  const features = [
    {
      icon: <Gem size={24} />,
      title: "Propriedade tangível e verificável",
      desc: "Seu ativo existe fisicamente, com certificação internacional e posse real."
    },
    {
      icon: <TrendingDown size={24} />,
      title: "Menor exposição à volatilidade",
      desc: "Descorrelação direta com os humores diários e especulações da bolsa de valores."
    },
    {
      icon: <Landmark size={24} />,
      title: "Independência de bolsas e bancos",
      desc: "Um ativo soberano que não depende da solvência de instituições financeiras."
    },
    {
      icon: <FileKey size={24} />,
      title: "Estruturas privadas e contratuais",
      desc: "Segurança jurídica através de contratos robustos de compra e venda."
    },
    {
      icon: <Sprout size={24} />,
      title: "Preservação e crescimento",
      desc: "Foco histórico em proteção de poder de compra e valorização a longo prazo."
    }
  ];

  // Variante Simplificada (Sem delays complexos que causam "piscada")
  const simpleFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section className="why-wrapper" id="modelo">
      <div className="why-container">
        
        <div className="why-content-grid">
          
          {/* COLUNA ESQUERDA */}
          <motion.div 
            className="why-text-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={simpleFadeUp}
          >
            <div className="why-header-internal">
              <span className="section-tag">
                BLOCO 2 – POR QUE ATIVOS FÍSICOS
              </span>
              
              <h2 className="why-title">
                Por que investidores buscam ativos físicos fora do mercado tradicional
              </h2>
            </div>

            <p className="highlight-text">
              Em cenários de volatilidade, mudanças regulatórias e excesso de instrumentos financeiros, 
              investidores experientes tendem a buscar estruturas que ofereçam propriedade real.
            </p>
            <p className="body-text">
              A previsibilidade contratual e a menor dependência de terceiros são pilares fundamentais 
              para quem deseja solidez. Ativos físicos cumprem esse papel ao longo da história, 
              funcionando como reserva de valor e proteção patrimonial insubstituível.
            </p>
            
            <div className="decorative-line"></div>
          </motion.div>

          {/* COLUNA DIREITA: CARDS */}
          <div className="why-cards-col">
            {features.map((item, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1, // Stagger manual simples (mais estável)
                  ease: "easeOut" 
                }}
                whileHover={{ scale: 1.02 }} // Apenas escala, sem cor de fundo
              >
                <div className="card-icon-wrapper">
                  {item.icon}
                </div>
                <div className="card-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyPhysical;