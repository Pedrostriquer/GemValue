import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Facebook, Linkedin, Youtube, 
  Gem, FileText, ShieldCheck, MapPin, 
  Mail, Phone, MessageCircle, X, AlertCircle
} from 'lucide-react';
import './Footer.css';

// --- CONSTANTES ESTÁTICAS (Não pesam no render) ---
const CURRENT_YEAR = new Date().getFullYear();

// === TEXTO COMPLETO: AVISO LEGAL ===
const LEGAL_NOTICE_TEXT = (
  <div className="legal-text-content">
    <p>As informações disponibilizadas no site da GemValue têm caráter exclusivamente informativo e educacional. O conteúdo apresentado não constitui recomendação personalizada, oferta pública, promessa de resultado ou aconselhamento financeiro, jurídico ou patrimonial.</p>
    <p>A GemValue atua na estruturação de modelos baseados em ativos físicos, respeitando critérios operacionais e contratuais claramente definidos.</p>

    <h3>1. Caráter informativo do conteúdo</h3>
    <p>O conteúdo apresentado não constitui recomendação personalizada, oferta pública, promessa de resultado ou aconselhamento financeiro, jurídico ou patrimonial.</p>

    <h3>2. Natureza das estruturas apresentadas</h3>
    <p>As estruturas descritas neste site envolvem ativos físicos reais, como gemas e diamantes certificados, cuja aquisição, custódia, posse, prazos e condições são definidos exclusivamente em contrato, no momento da formalização da operação.</p>
    <p>Cada estrutura possui características próprias, incluindo regras de funcionamento, prazos específicos, formas de custódia ou posse e critérios de valorização, conforme detalhado na documentação contratual correspondente.</p>

    <h3>3. Ausência de garantia de resultados</h3>
    <p>Eventuais simulações, projeções ou referências a resultados obtidos no passado não representam garantia de resultados futuros. Tais informações têm finalidade meramente ilustrativa e servem apenas como apoio à compreensão do modelo operacional apresentado.</p>
    <p>A valorização de ativos físicos pode variar de acordo com fatores como demanda, liquidez, condições comerciais e dinâmica do mercado.</p>

    <h3>4. Compreensão das características da estrutura</h3>
    <p>Os participantes devem compreender as características das estruturas baseadas em ativos físicos, incluindo prazos, condições de liquidez e critérios de valorização definidos contratualmente. Todas essas informações são apresentadas de forma clara no momento da formalização.</p>

    <h3>5. Relação com a Gemas Brilhantes</h3>
    <p>A plataforma GemValue é desenvolvida e operada pela Gemas Brilhantes, empresa especializada em estruturas baseadas em ativos físicos e operações lastreadas no mercado real de gemas preciosas.</p>

    <h3>6. Disponibilidade e jurisdição</h3>
    <p>Os produtos e serviços descritos neste site podem não estar disponíveis para todas as jurisdições, perfis ou categorias de participantes. A legislação e regulamentação aplicáveis podem variar conforme o país ou localidade.</p>

    <h3>7. Atualizações e alterações</h3>
    <p>A GemValue se reserva o direito de alterar, atualizar ou modificar as informações contidas neste site a qualquer momento, visando manter a clareza e a transparência.</p>

    <h3>8. Aceitação dos termos</h3>
    <p>Ao acessar e utilizar este site, o usuário declara que leu, compreendeu e concorda com os termos deste Aviso Legal, bem como com os Termos de Uso e a Política de Privacidade da GemValue.</p>
  </div>
);

// === TEXTO COMPLETO: TERMOS DE USO ===
const TERMS_TEXT = (
  <div className="legal-text-content">
    <p>Ao acessar e utilizar a plataforma GemValue, o usuário declara estar de acordo com os presentes Termos de Uso e com a Política de Privacidade.</p>
    <p>A GemValue é uma plataforma desenvolvida e operada pela Gemas Brilhantes, responsável legal pelas informações e estruturas apresentadas.</p>

    <h3>1. Natureza da plataforma</h3>
    <p>A GemValue atua como uma plataforma informativa, voltada à apresentação de estruturas baseadas em ativos físicos, formalizadas por contrato com a Gemas Brilhantes.</p>

    <h3>2. Não caracterização como instituição financeira</h3>
    <p>A GemValue e a Gemas Brilhantes não são instituições financeiras, não realizam captação pública de recursos, nem intermediação de valores mobiliários.</p>

    <h3>3. Uso da plataforma</h3>
    <p>O usuário compromete-se a utilizar a plataforma de forma lícita, ética e responsável.</p>

    <h3>4. Propriedade intelectual</h3>
    <p>Todo o conteúdo disponibilizado na plataforma é de propriedade da Gemas Brilhantes.</p>

    <h3>5. Limitação de responsabilidade</h3>
    <p>A Gemas Brilhantes não se responsabiliza por decisões tomadas pelo usuário com base nas informações disponibilizadas na plataforma.</p>

    <p className="legal-update">Última atualização: Janeiro de 2025</p>
  </div>
);

// === TEXTO COMPLETO: POLÍTICA DE PRIVACIDADE ===
const PRIVACY_TEXT = (
  <div className="legal-text-content">
    <p>A presente Política de Privacidade informa como os dados pessoais dos usuários são coletados e protegidos ao acessar a plataforma GemValue.</p>
    
    <h3>1. Quem somos</h3>
    <p>Gemas Brilhantes - CNPJ: 50.793.164/0001-91</p>

    <h3>2. Quais dados coletamos</h3>
    <p>Podemos coletar nome, e-mail, telefone (WhatsApp) e dados de navegação fornecidos em formulários.</p>

    <h3>3. Finalidade do uso dos dados</h3>
    <p>Os dados são usados para contato solicitado, envio de informações sobre estruturas e suporte.</p>

    <h3>4. Compartilhamento de dados</h3>
    <p>A Gemas Brilhantes não comercializa dados pessoais a terceiros.</p>

    <p className="legal-update">Última atualização: Janeiro de 2025</p>
  </div>
);

// --- Componente de Animação Otimizado ---
const AnimatedContainer = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="footer-anim-wrapper"
    >
      {children}
    </motion.div>
  );
};

// --- Componente Modal ---
const LegalModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="modal-header">
           <h2 className="modal-title">{title}</h2>
           <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
             <X size={24} />
           </button>
        </div>
        
        <div className="modal-body-scroll">
          <div className="modal-body">
            {content}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null); 

  const openModal = useCallback((type, e) => {
    e.preventDefault();
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const footerLinks = useMemo(() => [
    {
      label: 'Legal',
      links: [
        { 
          title: 'Aviso Legal', 
          href: '#', 
          icon: AlertCircle, 
          action: (e) => openModal('legal', e) 
        },
        { 
          title: 'Termos de Uso', 
          href: '#', 
          icon: FileText, 
          action: (e) => openModal('terms', e) 
        },
        { 
          title: 'Política de Privacidade', 
          href: '#', 
          icon: ShieldCheck,
          action: (e) => openModal('privacy', e)
        },
      ],
    },
    {
      label: 'Redes Sociais',
      links: [
        { title: 'Instagram', href: 'https://www.instagram.com/_gemasbrilhantes/', icon: Instagram },
        { title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61583999108308', icon: Facebook },
        { title: 'LinkedIn', href: 'https://www.linkedin.com/company/gemas-brilhantes/', icon: Linkedin },
        { title: 'YouTube', href: 'https://www.youtube.com/@gemasbrilhantes', icon: Youtube },
      ],
    },
    {
      label: 'Fale Conosco',
      links: [
        { title: 'Av. Rep. Argentina, 1336 - Água Verde, Curitiba - PR', href: '#', icon: MapPin },
        { title: 'suporte@gemasbrilhantes.com.br', href: 'mailto:suporte@gemasbrilhantes.com.br', icon: Mail },
        { title: 'Whatsapp: 0800-000-4998', href: 'https://wa.me/5508000004998', icon: MessageCircle },
        { title: 'SAC: 51 9984-1455', href: 'tel:+555199841455', icon: Phone },
      ],
    },
  ], [openModal]); 

  return (
    <footer className="footer-wrapper">
      <div className="footer-glow-line"></div>
      
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* COLUNA 1: MARCA */}
          <AnimatedContainer delay={0}>
            <div className="footer-brand-col">
              <div className="footer-logo-box">
                <Gem size={32} className="text-blue-400" />
                <span className="brand-text">GemValue</span>
              </div>
              
              <div className="footer-desc">
                <p>
                  GemValue é uma plataforma desenvolvida e operada pela <strong>Gemas Brilhantes</strong>, especializada em estruturas baseadas em ativos físicos e operações lastreadas no mercado real de gemas preciosas.
                </p>
                <p style={{ marginTop: '10px' }}>
                  As informações apresentadas têm caráter informativo e seguem parâmetros definidos em contrato, com total transparência operacional.
                </p>
              </div>
              
              <div className="footer-cnpj">
                <span>Gemas Brilhantes – CNPJ: 50.793.164/0001-91</span>
                <span className="copyright">© {CURRENT_YEAR} GemValue. Todos os direitos reservados.</span>
              </div>
            </div>
          </AnimatedContainer>

          {/* COLUNAS LINKS */}
          <div className="footer-links-area">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + (index * 0.1)}>
                <div className="footer-column">
                  <h3 className="column-title">{section.label}</h3>
                  <ul className="link-list">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a 
                          href={link.href} 
                          className="footer-link"
                          onClick={link.action || undefined}
                          target={link.href.startsWith('http') ? "_blank" : "_self"}
                          rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        >
                          {link.icon && React.createElement(link.icon, { size: 16, style: { flexShrink: 0 } })}
                          <span>{link.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeModal && (
          <LegalModal 
            isOpen={!!activeModal}
            onClose={closeModal}
            title={
              activeModal === 'legal' ? 'Aviso Legal' : 
              activeModal === 'terms' ? 'Termos de Uso' : 
              'Política de Privacidade'
            }
            content={
              activeModal === 'legal' ? LEGAL_NOTICE_TEXT : 
              activeModal === 'terms' ? TERMS_TEXT : 
              PRIVACY_TEXT
            }
          />
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;