import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, DollarSign, Calendar, Loader2, Check, BarChart3, MessageCircle } from 'lucide-react';
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

  // --- Estado para Mensagem WhatsApp ---
  const [contactMessage, setContactMessage] = useState('');

  // 1. Carregar Regras Iniciais
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

  // 2. Define Mensagem Padrão ao ter Resultado
  useEffect(() => {
    if (simResult) {
      setContactMessage("Olá, fiz uma simulação no site e gostaria de saber como consolidar esse resultado diversificando meu patrimônio com ativos físicos.");
    }
  }, [simResult]);

  // 3. Função de Simulação
  const handleSimulateClick = useCallback(async () => {
    if (!configLoaded) return;

    setIsLoading(true);
    setIsAnimating(true);
    
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

  // 4. Função de Envio WhatsApp
  const handleContactClick = () => {
    if (!simResult) return;

    const breakLine = "%0A";
    const boldStart = "*";
    const boldEnd = "*";

    const finalMessage = 
      `${contactMessage}` +
      `${breakLine}${breakLine}` +
      `--------------------------------` +
      `${breakLine}${boldStart}📊 Detalhes da Simulação:${boldEnd}` +
      `${breakLine}💰 Aporte: ${formatCurrency(valor)}` +
      `${breakLine}📅 Prazo: ${prazo} meses` +
      `${breakLine}💎 Gema Física: ${withGem ? 'Sim' : 'Não'}` +
      `${breakLine}🚀 Valor Final Est.: ${formatCurrency(simResult.finalAmount)}` +
      `${breakLine}📈 Lucro Total: ${formatCurrency(simResult.totalGain)}` +
      `${breakLine}--------------------------------`;

    const phoneNumber = "5508000004998"; 
    window.open(`https://wa.me/${phoneNumber}?text=${finalMessage}`, '_blank');
  };

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
                    /* Estado Placeholder */
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
              
              {/* ÁREA DE AÇÃO (Botões) */}
              <div className="sim-actions-area">
                {!simResult || isLoading ? (
                    <motion.button 
                        className="btn-refazer primary-action"
                        onClick={handleSimulateClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading || !configLoaded}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="spin-anim" /> Calculando...
                            </>
                        ) : (
                            "Simular Agora"
                        )}
                    </motion.button>
                ) : (
                    // INPUT + BOTÃO WHATSAPP + LINK REFAZER
                    <motion.div 
                        className="sim-contact-wrapper"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="sim-msg-input-box">
                            <textarea 
                                className="sim-msg-textarea"
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                rows={2}
                            />
                        </div>

                        <button className="btn-contact-action pulse-anim-btn" onClick={handleContactClick}>
                            <MessageCircle size={18} />
                            Falar com Consultor
                        </button>

                        <button className="btn-text-only-refazer" onClick={handleSimulateClick}>
                            Refazer simulação
                        </button>
                    </motion.div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Simulation;