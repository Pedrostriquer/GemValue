import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  TrendingUp, 
  Eye, 
  ArrowRight 
} from 'lucide-react';
import './Parameters.css';

// --- Dados Estáticos (Fora do componente) ---
const HIGHLIGHTS = [
  {
    icon: <FileCheck size={24} />,
    label: "Base Contratual",
    text: "Regras claras definidas em contrato."
  },
  {
    icon: <TrendingUp size={24} />,
    label: "Potencial Real",
    text: "Valorização baseada em cenários de mercado."
  },
  {
    icon: <Eye size={24} />,
    label: "Transparência",
    text: "Gestão aberta respeitando o perfil do cliente."
  }
];

// --- Variantes de Animação ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Um card aparece 0.2s depois do outro
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 }, // Deslocamento menor (era 30) para evitar layout shift brusco
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" } // Movimento suave e estável
  }
};

const Parameters = () => {
  return (
    <section className="params-wrapper">
      <div className="params-container">
        
        <div className="params-grid">
          
          {/* COLUNA ESQUERDA: TEXTO PRINCIPAL */}
          <motion.div 
            className="params-text-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="params-header">
              <span className="params-tag">SEGURANÇA E CLAREZA</span>
              <h2 className="params-title">
                Parâmetros e <br />
                <span className="highlight-blue">previsibilidade.</span>
              </h2>
            </div>

            <p className="params-body">
              A estrutura GemCash trabalha com parâmetros definidos em contrato. 
              Em determinados cenários, a valorização anualizada pode chegar a patamares 
              relevantes, sempre de acordo com o modelo escolhido e as condições estabelecidas.
            </p>

            <div className="params-divider"></div>

            <p className="params-complement">
              Cada estrutura é apresentada de forma transparente, respeitando os critérios 
              contratuais e o perfil do cliente.
            </p>

            <div className="params-action">
              <span className="learn-more">
                Entenda os critérios <ArrowRight size={16} />
              </span>
            </div>
          </motion.div>

          {/* COLUNA DIREITA: DESTAQUES VISUAIS */}
          <div className="params-visual-col">
            {/* O Container controla a animação dos filhos */}
            <motion.div 
              className="visual-cards-stack"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {HIGHLIGHTS.map((item, index) => (
                <motion.div 
                  key={index}
                  className="param-card"
                  variants={cardVariants}
                >
                  <div className="param-icon-box">
                    {item.icon}
                  </div>
                  <div className="param-info">
                    <h4>{item.label}</h4>
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="visual-bg-circle"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Parameters;