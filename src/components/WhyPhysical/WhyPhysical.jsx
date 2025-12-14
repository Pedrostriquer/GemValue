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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  return (
    <section className="why-wrapper" id="modelo">
      <div className="why-container">
        
        <div className="why-content-grid">
          
          {/* COLUNA ESQUERDA: TÍTULO + TEXTO EXPLICATIVO */}
          <motion.div 
            className="why-text-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* --- BLOCO DO TÍTULO MOVIDO PARA CÁ --- */}
            <div className="why-header-internal">
              <motion.span 
                className="section-tag"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                BLOCO 2 – POR QUE ATIVOS FÍSICOS
              </motion.span>
              
              <motion.h2 
                className="why-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Por que investidores buscam ativos físicos fora do mercado tradicional
              </motion.h2>
            </div>
            {/* -------------------------------------- */}

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

          {/* COLUNA DIREITA: CARDS (BULLETS) */}
          <motion.div 
            className="why-cards-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((item, index) => (
              <motion.div 
                key={index} 
                className="feature-card" 
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(37, 99, 235, 0.1)" }}
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyPhysical;