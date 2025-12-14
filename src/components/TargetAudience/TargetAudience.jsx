import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  ShieldCheck, 
  Gem, 
  FileText, 
  Landmark 
} from 'lucide-react'; // Removi ArrowRight
import './TargetAudience.css';

const TargetAudience = () => {
  const [activeId, setActiveId] = useState(null);

  const audienceList = [
    {
      id: 1,
      icon: <PieChart size={28} />,
      title: "Diversificação Real",
      desc: "Fuja da correlação do mercado tradicional. Adicione ativos descorrelacionados ao seu portfólio."
    },
    {
      id: 2,
      icon: <ShieldCheck size={28} />,
      title: "Proteção Patrimonial",
      desc: "Ideal para empresários que buscam blindagem de capital e ativos com portabilidade internacional."
    },
    {
      id: 3,
      icon: <Gem size={28} />,
      title: "Ativos Tangíveis",
      desc: "Para quem valoriza a segurança física. Um bem que você pode tocar, guardar e transportar."
    },
    {
      id: 4,
      icon: <FileText size={28} />,
      title: "Previsibilidade Contratual",
      desc: "Regras claras de saída e rentabilidade, sem as surpresas diárias de telas de homebroker."
    },
    {
      id: 5,
      icon: <Landmark size={28} />,
      title: "Soberania Financeira",
      desc: "Independência de sistemas bancários tradicionais para custodiar parte relevante do seu patrimônio."
    }
  ];

  return (
    <section className="target-wrapper">
      <div className="target-container">
        
        {/* CABEÇALHO NO TOPO (Resolve a desproporção lateral) */}
        <div className="target-header">
          <span className="section-tag-minimal">PERFIL ESTRATÉGICO</span>
          <h2 className="target-title">
            Para quem o GemCash faz sentido?
          </h2>
        </div>

        {/* LISTA WIDE (Ocupa largura total, estilo tabela moderna) */}
        <div className="target-list">
          {audienceList.map((item) => (
            <motion.div 
              key={item.id}
              className={`target-row ${activeId === item.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="row-content">
                
                {/* COLUNA 1: Ícone + ID */}
                <div className="row-col-icon">
                  <span className="row-number">0{item.id}</span>
                  <div className="row-icon-wrapper">
                    {item.icon}
                  </div>
                </div>

                {/* COLUNA 2: Título */}
                <div className="row-col-title">
                  <h3 className="row-title">{item.title}</h3>
                </div>

                {/* COLUNA 3: Descrição (Ocupa o lugar da antiga seta) */}
                <div className="row-col-desc">
                  <p className="row-desc-text">{item.desc}</p>
                </div>

              </div>
              
              {/* Linha Divisória Animada */}
              <div className="row-divider">
                <motion.div 
                  className="divider-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: activeId === item.id ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TargetAudience;