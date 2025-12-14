import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import './Simulation.css';

const Simulation = () => {
  const [valor, setValor] = useState(50000);
  const [prazo, setPrazo] = useState(12);
  const [isAnimating, setIsAnimating] = useState(false);

  // Função para "Refazer" a simulação (efeito visual)
  const handleRefazer = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Cálculo fictício apenas para visualização interativa
  const rentabilidadeEstimada = (valor * (1 + (prazo * 0.015))).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <section className="sim-wrapper">
      {/* Elementos de Fundo (Glow) */}
      <div className="sim-glow"></div>
      
      <div className="sim-container">
        
        <div className="sim-content-grid">
          
          {/* COLUNA ESQUERDA: TEXTOS */}
          <motion.div 
            className="sim-text-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="sim-title">
              Simule uma estrutura baseada em <br />
              <span className="text-gradient-blue">ativos físicos reais</span>
            </h2>
            <p className="sim-desc">
              A simulação permite visualizar diferentes cenários conforme valor, prazo e modelo escolhido.
            </p>
          </motion.div>

          {/* COLUNA DIREITA: CARD INTERATIVO */}
          <motion.div 
            className="sim-card-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="interactive-card">
              
              {/* Topo do Card: Inputs */}
              <div className="card-inputs">
                
                {/* Slider Valor */}
                <div className="input-group">
                  <div className="label-row">
                    <span className="input-label"><DollarSign size={16}/> Valor do Aporte</span>
                    <span className="input-value">R$ {valor.toLocaleString('pt-BR')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="500000" 
                    step="5000" 
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="custom-range"
                  />
                </div>

                {/* Slider Prazo */}
                <div className="input-group">
                  <div className="label-row">
                    <span className="input-label"><Calendar size={16}/> Prazo (Meses)</span>
                    <span className="input-value">{prazo} meses</span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="60" 
                    step="6" 
                    value={prazo}
                    onChange={(e) => setPrazo(Number(e.target.value))}
                    className="custom-range"
                  />
                </div>
              </div>

              {/* Divisor */}
              <div className="card-divider"></div>

              {/* Resultado Dinâmico */}
              <div className="card-result">
                <span className="result-label">Projeção Estimada</span>
                <AnimatePresence mode='wait'>
                  <motion.div 
                    key={rentabilidadeEstimada + isAnimating}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`result-value ${isAnimating ? 'blur-effect' : ''}`}
                  >
                    {rentabilidadeEstimada}
                  </motion.div>
                </AnimatePresence>
                
                <div className="trend-badge">
                  <TrendingUp size={14} />
                  <span>Cenário de Valorização</span>
                </div>
              </div>

              {/* Botão de Ação */}
              <motion.button 
                className="btn-refazer"
                onClick={handleRefazer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={18} className={isAnimating ? 'spin-anim' : ''} />
                Refazer simulação
              </motion.button>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Simulation;