import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  // Estado para controlar qual pergunta está aberta (null = nenhuma)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "O que é o GemCash?",
      answer: (
        <>
          <p>O GemCash é o modelo operacional da GemValue para aquisição estruturada de ativos físicos reais, especificamente diamantes certificados, formalizado por contrato e com regras previamente estabelecidas.</p>
          <p>Não se trata de um produto financeiro tradicional, mas de uma estrutura privada de aquisição patrimonial baseada em ativos tangíveis.</p>
        </>
      )
    },
    {
      question: "O GemCash é um investimento financeiro?",
      answer: (
        <>
          <p><strong>Não.</strong> O GemCash não é um produto financeiro regulado pelo mercado tradicional.</p>
          <p>Trata-se de uma estrutura de aquisição de ativos físicos, com propriedade real, formalização contratual e acompanhamento transparente ao longo do período acordado.</p>
        </>
      )
    },
    {
      question: "Qual é o valor mínimo para participar?",
      answer: (
        <>
          <p>O valor mínimo para adesão à estrutura GemCash é de <strong>R$ 3.000,00</strong>.</p>
          <p>Esse valor permite acesso à aquisição estruturada de diamantes certificados dentro dos parâmetros definidos em contrato.</p>
        </>
      )
    },
    {
      question: "Qual é o prazo da estrutura?",
      answer: (
        <>
          <p>O prazo é personalizado, iniciando a partir de <strong>3 meses</strong> e podendo ser ajustado até <strong>12 meses</strong>, de acordo com o modelo escolhido e os termos estabelecidos em contrato.</p>
          <p>A definição do prazo ocorre no momento da formalização da estrutura.</p>
        </>
      )
    },
    {
      question: "Existe possibilidade de saques?",
      answer: (
        <>
          <p><strong>Sim.</strong> A estrutura permite saques mensais, conforme as regras contratuais do modelo escolhido, respeitando os critérios e condições previamente estabelecidos.</p>
          <p>Todos os fluxos são acompanhados de forma transparente.</p>
        </>
      )
    },
    {
      question: "Como funciona a valorização da estrutura?",
      answer: (
        <>
          <p>A valorização está vinculada aos parâmetros definidos em contrato e ao modelo escolhido.</p>
          <p>A estrutura GemCash trabalha com parâmetros definidos em contrato. Em determinados cenários, a valorização anualizada pode chegar a patamares relevantes, sempre de acordo com o modelo escolhido e as condições estabelecidas.</p>
          <p>Não há promessas fora do que está formalmente acordado.</p>
        </>
      )
    },
    {
      question: "Os diamantes são realmente físicos?",
      answer: (
        <>
          <p><strong>Sim.</strong> Os ativos são diamantes físicos, certificados por instituições reconhecidas internacionalmente, como GIA, IGI e IGL, garantindo autenticidade, procedência e critérios técnicos de avaliação.</p>
        </>
      )
    },
    {
      question: "O ativo é meu ou da empresa?",
      answer: (
        <>
          <p>O ativo é do cliente, conforme estabelecido em contrato.</p>
          <p>O cliente pode optar por:</p>
          <ul className="faq-list">
            <li>Custódia segura especializada; ou</li>
            <li>Posse física do ativo, de acordo com o modelo escolhido.</li>
          </ul>
        </>
      )
    },
    {
      question: "Como acompanho minha estrutura?",
      answer: (
        <>
          <p>O acompanhamento é feito de forma transparente através de nossa plataforma digital, com acesso às informações contratuais, status da estrutura e suporte da equipe Gemas Brilhantes durante todo o período.</p>
        </>
      )
    },
    {
      question: "Quem está por trás da GemValue e do GemCash?",
      answer: (
        <>
          <p>A GemValue e o GemCash são soluções desenvolvidas pela <strong>Gemas Brilhantes</strong>, empresa com atuação desde 2018 no mercado de diamantes e ativos físicos, reconhecida por sua curadoria especializada, certificações internacionais e operação transparente.</p>
        </>
      )
    },
    {
      question: "Para quem essa estrutura faz sentido?",
      answer: (
        <>
          <p>O GemCash é indicado para pessoas que:</p>
          <ul className="faq-list">
            <li>Buscam diversificação patrimonial real</li>
            <li>Valorizam ativos físicos tangíveis</li>
            <li>Preferem previsibilidade contratual</li>
            <li>Desejam alternativas fora do mercado financeiro tradicional</li>
            <li>Têm visão de médio e longo prazo para patrimônio</li>
          </ul>
        </>
      )
    },
    {
      question: "Como iniciar?",
      answer: (
        <>
          <p>O primeiro passo é realizar a simulação, avaliando valor, prazo e modelo mais adequado ao seu perfil.</p>
          <p>Após a simulação, a equipe realiza o alinhamento final e a formalização contratual.</p>
        </>
      )
    }
  ];

  return (
    <section className="faq-wrapper">
      {/* Glow de fundo (mesmo estilo das outras sessões azuis) */}
      <div className="faq-glow"></div>

      <div className="faq-container">
        <div className="faq-header">
          <span className="section-tag-faq">TIRA-DÚVIDAS</span>
          <h2 className="faq-title">
            Perguntas <span className="text-gradient-blue">Frequentes</span>
          </h2>
          <p className="faq-subtitle">
            Entenda todos os detalhes da estrutura GemCash e opere com total clareza.
          </p>
        </div>

        <div className="faq-grid">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <div className="question-content">
                  <HelpCircle size={18} className="icon-question" />
                  <span>{item.question}</span>
                </div>
                <div className="icon-toggle">
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="faq-answer-wrapper"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Footer do FAQ (Opcional, para fechar a seção) */}
        <div className="faq-footer">
          <p>Ainda tem dúvidas?</p>
          <button className="btn-contact-simple">Fale com um especialista</button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;