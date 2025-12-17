import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gem, 
  TrendingDown, 
  Landmark, 
  FileKey, 
  Sprout,
  ArrowRight 
} from 'lucide-react';
import './WhyPhysical.css';

// Mover dados e variantes para fora do componente evita recriação a cada render
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

// Variantes otimizadas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const WhyPhysical = () => {

  const handleCtaClick = () => {
    const phoneNumber = "5508000004998"; 
    const message = "Olá, estava vendo os benefícios dos ativos físicos no site e gostaria de visualizar uma estratégia personalizada para meu patrimônio.";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
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
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            variants={itemVariants}
          >
            <div className="why-header-internal">
              <span className="section-tag">
                POR QUE ATIVOS FÍSICOS
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
            
            {/* NOVO LINK INTERATIVO */}
            <div className="why-action-area">
                <div className="decorative-line"></div>
                
                <motion.div 
                    className="visualize-link"
                    onClick={handleCtaClick}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                >
                    <span className="visualize-text">Visualize uma estratégia baseada em ativos físicos</span>
                    
                    <motion.div
                        className="arrow-anim-wrapper"
                        variants={{
                            rest: { x: 0 },
                            hover: { x: 5 } // Move um pouco mais rápido no hover se quiser, ou deixa só a animação contínua
                        }}
                    >
                        <motion.div
                             // Animação contínua e suave de "vai e volta"
                             animate={{ x: [0, 4, 0] }}
                             transition={{ 
                                 duration: 2, 
                                 repeat: Infinity, 
                                 ease: "easeInOut" 
                             }}
                        >
                            <ArrowRight size={20} />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
            
          </motion.div>

          {/* COLUNA DIREITA: CARDS */}
          <motion.div 
            className="why-cards-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          >
            {features.map((item, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={itemVariants}
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