import React from 'react';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Globe2, 
  ShieldCheck, 
  Scale, 
  Award 
} from 'lucide-react';
import './WhyDiamonds.css';

const WhyDiamonds = () => {

  const features = [
    {
      icon: <Award size={28} />,
      title: "Certificação Global",
      desc: "GIA, IGI e IGL garantem autenticidade mundial."
    },
    {
      icon: <Diamond size={28} />,
      title: "Densidade de Valor",
      desc: "Milhões de dólares transportáveis na palma da mão."
    },
    {
      icon: <Globe2 size={28} />,
      title: "Liquidez Internacional",
      desc: "Aceitação e precificação padronizada em qualquer país."
    },
    {
      icon: <Scale size={28} />,
      title: "Escassez Natural",
      desc: "Recurso finito com demanda histórica constante."
    }
    // Removi um item para fechar o Grid 2x2 perfeitamente, fica mais harmônico visualmente
  ];

  return (
    <section className="diamonds-wrapper">
      <div className="diamonds-container">
        
        <div className="diamonds-content-grid">
          
          {/* COLUNA ESQUERDA: GRID DE CARDS (2x2) */}
          <motion.div 
            className="diamonds-grid-col"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((item, index) => (
              <div key={index} className="glass-card">
                <div className="icon-box">
                  {item.icon}
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* COLUNA DIREITA: TEXTO EXPLICATIVO */}
          <motion.div 
            className="diamonds-text-col"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="diamonds-header">
              <span className="section-tag-clean">POR QUE DIAMANTES</span>
              <h2 className="diamonds-title">
                A união perfeita entre beleza e <span className="text-blue-gradient">solidez financeira.</span>
              </h2>
            </div>

            <p className="diamonds-highlight">
              Diamantes se destacam entre os ativos físicos por reunirem alta densidade de
              valor, durabilidade extrema e um histórico secular como reserva patrimonial.
            </p>
            
            <p className="diamonds-body">
              Diferente de obras de arte ou vinhos, diamantes certificados possuem critérios 
              técnicos claros de avaliação (os 4Cs), permitindo uma precificação global transparente 
              e um mercado secundário altamente ativo.
            </p>

            <div className="simple-divider"></div>

            <div className="custodia-info">
              <ShieldCheck size={20} className="text-blue-400" />
              <span>Facilidade total de custódia e transporte.</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyDiamonds;