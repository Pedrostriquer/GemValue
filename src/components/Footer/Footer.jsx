import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Gem,
  FileText,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  X
} from 'lucide-react';
import './Footer.css';

// --- Textos dos Modais ---
const TERMS_TEXT = (
  <>
    <p><strong>1. Natureza da plataforma</strong></p>
    <p>A GemValue atua como uma plataforma informativa, voltada à apresentação de estruturas baseadas em ativos físicos, formalizadas por contrato com a Gemas Brilhantes.</p>
    <br/>
    <p>Ao acessar e utilizar a plataforma GemValue, o usuário declara estar de acordo com os presentes Termos de Uso e com a Política de Privacidade.</p>
    <p>A GemValue é uma plataforma desenvolvida e operada pela Gemas Brilhantes, responsável legal pelas informações e estruturas apresentadas.</p>
  </>
);

const PRIVACY_TEXT = (
  <>
    <p><strong>Política de Privacidade</strong></p>
    <p>Esta política descreve como a GemValue coleta, usa e protege suas informações pessoais.</p>
    <br/>
    <p><em>(Insira aqui o texto completo da sua Política de Privacidade...)</em></p>
  </>
);

// --- Componente de Animação Reutilizável ---
const AnimatedContainer = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', y: -10, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  const currentYear = 2025;
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | null

  const openModal = (type, e) => {
    e.preventDefault();
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const footerLinks = [
    {
      label: 'Legal',
      links: [
        { 
          title: 'Termos de Uso', 
          href: '#', 
          icon: FileText, 
          onClick: (e) => openModal('terms', e) 
        },
        { 
          title: 'Política de Privacidade', 
          href: '#', 
          icon: ShieldCheck,
          onClick: (e) => openModal('privacy', e)
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
        { title: 'Whatsapp: 0800-000-4998', href: 'https://wa.me/5508000004998', icon: MessageCircle }, // Link formatado
        { title: 'SAC: 51 9984-1455', href: 'tel:+555199841455', icon: Phone },
      ],
    },
  ];

  return (
    <footer className="footer-wrapper">
      {/* Luz e Linha do Topo */}
      <div className="footer-glow-line"></div>
      
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* COLUNA 1: MARCA E INFO */}
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
                <span className="copyright">© {currentYear} GemValue. Todos os direitos reservados.</span>
              </div>
            </div>
          </AnimatedContainer>

          {/* COLUNA 2, 3 e 4: LINKS */}
          <div className="footer-links-area">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.2 + (index * 0.1)}>
                <div className="footer-column">
                  <h3 className="column-title">{section.label}</h3>
                  <ul className="link-list">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a 
                          href={link.href} 
                          className="footer-link"
                          onClick={link.onClick ? link.onClick : undefined}
                          target={link.href.startsWith('http') ? "_blank" : "_self"}
                          rel="noreferrer"
                        >
                          {link.icon && <link.icon size={16} style={{ flexShrink: 0 }} />}
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

      {/* MODAL VIA PORTAL/ANIMAÇÃO */}
      <AnimatePresence>
        {activeModal && (
          <LegalModal 
            isOpen={!!activeModal}
            onClose={closeModal}
            title={activeModal === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
            content={activeModal === 'terms' ? TERMS_TEXT : PRIVACY_TEXT}
          />
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;