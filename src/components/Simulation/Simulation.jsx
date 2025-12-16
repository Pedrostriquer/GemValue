import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, DollarSign, Calendar, Loader2, Check, BarChart3 } from 'lucide-react';
import contractService from '../../services/contractService'; 
import './Simulation.css';

const Simulation = () => {
  // --- Estados de Configuração da API ---
  const [availableMonths, setAvailableMonths] = useState([]); 
  const [minAmount, setMinAmount] = useState(3000); 
  const [configLoaded, setConfigLoaded] = useState(false); 
  
  // --- Estados do Formulário ---
  const [valor, setValor] = useState(5000); 
  const [prazo, setPrazo] = useState(12);
  const [withGem, setWithGem] = useState(false);
  
  // --- Estados de Resultado e UI ---
  const [simResult, setSimResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 1. Carregar Regras Iniciais (Executa apenas uma vez)
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const [monthsData, settingsData] = await Promise.all([
          contractService.getAvailableMonths(),
          contractService.getContractSettings()
        ]);

        if (settingsData?.minimumValue) {
          setMinAmount(settingsData.minimumValue);
          setValor(prev => prev < settingsData.minimumValue ? settingsData.minimumValue : prev);
        }

        if (monthsData && monthsData.length > 0) {
          setAvailableMonths(monthsData);
          if (!monthsData.includes(prazo)) {
             setPrazo(monthsData[monthsData.length - 1]);
          }
        } else {
            setAvailableMonths([12]);
        }
        
        setConfigLoaded(true); 
      } catch (error) {
        console.error("Falha ao carregar regras", error);
        setConfigLoaded(true); 
      }
    };

    fetchRules();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Função de Simulação (Só roda no Click)
  const handleSimulateClick = useCallback(async () => {
    if (!configLoaded) return;

    setIsLoading(true);
    setIsAnimating(true); // Efeito visual de blur/transição
    
    try {
      const result = await contractService.simulate({
        amount: valor,
        months: prazo,
        withGem: withGem
      });
      setSimResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [configLoaded, valor, prazo, withGem]);

  // OBS: O useEffect de debounce foi removido propositalmente aqui.

  // Utilitários
  const formatCurrency = (val) => 
    val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00';

  const prazoIndex = availableMonths.indexOf(prazo) !== -1 ? availableMonths.indexOf(prazo) : 0;

  const handlePrazoChange = (e) => {
    const index = Number(e.target.value);
    if (availableMonths[index]) {
      setPrazo(availableMonths[index]);
    }
  };

  return (
    <section className="sim-wrapper">
      <div className="sim-glow"></div>
      
      <div className="sim-container">
        <div className="sim-content-grid">
          
          {/* COLUNA ESQUERDA: TEXTOS */}
          <motion.div 
            className="sim-text-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="sim-title">
              Simule uma estrutura baseada em <br />
              <span className="text-gradient-blue">ativos físicos reais</span>
            </h2>
            <p className="sim-desc">
              A simulação conecta-se diretamente à nossa base de cálculo em tempo real. Ajuste os valores e clique em simular para ver a projeção.
            </p>
          </motion.div>

          {/* COLUNA DIREITA: CARD INTERATIVO */}
          <motion.div 
            className="sim-card-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="interactive-card">
              
              {/* Inputs */}
              <div className="card-inputs">
                
                {/* Slider Valor */}
                <div className="input-group">
                  <div className="label-row">
                    <span className="input-label"><DollarSign size={16}/> Valor do Aporte</span>
                    <span className="input-value">{formatCurrency(valor)}</span>
                  </div>
                  <input 
                    type="range" 
                    min={minAmount} 
                    max={500000} 
                    step={1000} 
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="custom-range"
                    disabled={!configLoaded} 
                  />
                  <div className="range-limits">
                    <span>{formatCurrency(minAmount)}</span>
                    <span>{formatCurrency(500000)}</span>
                  </div>
                </div>

                {/* Slider Prazo */}
                <div className="input-group">
                  <div className="label-row">
                    <span className="input-label"><Calendar size={16}/> Prazo (Meses)</span>
                    <span className="input-value">{prazo} meses</span>
                  </div>
                  
                  {availableMonths.length > 0 ? (
                    <input 
                        type="range" 
                        min="0" 
                        max={availableMonths.length - 1} 
                        step="1" 
                        value={prazoIndex}
                        onChange={handlePrazoChange}
                        className="custom-range"
                        disabled={!configLoaded}
                    />
                  ) : (
                    <div className="range-loading">Carregando prazos...</div>
                  )}

                  <div className="range-limits">
                    <span>{availableMonths[0] || '-'} m</span>
                    <span>{availableMonths[availableMonths.length -1] || '-'} m</span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="checkbox-group">
                    <label className="custom-checkbox" onClick={() => setWithGem(!withGem)}>
                        <div className={`checkbox-box ${withGem ? 'checked' : ''}`}>
                            {withGem && <Check size={14} color="white" strokeWidth={3} />}
                        </div>
                        <span className="checkbox-text">Incluir recebimento da Gema Física</span>
                    </label>
                </div>

              </div>

              <div className="card-divider"></div>

              {/* Resultado */}
              <div className="card-result">
                <span className="result-label">
                    {simResult ? "Resultado da Simulação" : "Simulação Pendente"}
                </span>
                
                <AnimatePresence mode='wait'>
                  {isLoading ? (
                    <motion.div 
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="loader-wrapper"
                    >
                      <Loader2 className="spin-anim" size={32} color="#60a5fa" />
                    </motion.div>
                  ) : !simResult ? (
                    /* Estado Placeholder (Antes de simular) */
                    <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="result-placeholder"
                    >
                        <BarChart3 size={40} color="rgba(255,255,255,0.2)" />
                        <p>Configure os valores acima e clique no botão para calcular.</p>
                    </motion.div>
                  ) : (
                    /* Resultado Real */
                    <motion.div 
                        key="result"
                        className="result-content-wrapper"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className={`result-value ${isAnimating ? 'blur-effect' : ''}`}>
                          {formatCurrency(simResult.finalAmount)}
                        </div>

                        <div className={`result-details-grid ${isAnimating ? 'blur-effect' : ''}`}>
                            <div className="detail-item">
                                <span className="detail-label">Rentabilidade</span>
                                <span className="detail-value text-green">{simResult.monthlyPercentage?.toFixed(2)}% <small>/mês</small></span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Ganho Mensal</span>
                                <span className="detail-value">{formatCurrency(simResult.monthlyGain)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Lucro Total</span>
                                <span className="detail-value text-blue">{formatCurrency(simResult.totalGain)}</span>
                            </div>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.button 
                className="btn-refazer"
                onClick={handleSimulateClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || !configLoaded}
              >
                {isLoading ? (
                    <>
                        <RefreshCw size={18} className="spin-anim" /> Processando...
                    </>
                ) : !simResult ? (
                    "Simular Agora"
                ) : (
                    <>
                        <RefreshCw size={18} /> Recalcular
                    </>
                )}
              </motion.button>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Simulation;