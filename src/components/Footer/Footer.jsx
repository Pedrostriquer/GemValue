import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Gem,
  FileText,
  ShieldCheck
} from 'lucide-react';
import './Footer.css';

// Componente de Animação Reutilizável
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      label: 'Legal',
      links: [
        { title: 'Termos de Uso', href: '#termos', icon: FileText },
        { title: 'Política de Privacidade', href: '#privacidade', icon: ShieldCheck },
      ],
    },
    {
      label: 'Redes Sociais',
      links: [
        { title: 'Instagram', href: '#', icon: Instagram },
        { title: 'Facebook', href: '#', icon: Facebook },
        { title: 'LinkedIn', href: '#', icon: Linkedin },
        { title: 'YouTube', href: '#', icon: Youtube },
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
              
              <p className="footer-desc">
                GemValue é uma plataforma desenvolvida pela <strong>Gemas Brilhantes</strong>.
              </p>
              
              <div className="footer-cnpj">
                <span>CNPJ: 00.000.000/0001-00</span>
                <span className="copyright">© {currentYear} Todos os direitos reservados.</span>
              </div>
            </div>
          </AnimatedContainer>

          {/* COLUNA 2 e 3: LINKS (Mapeados dinamicamente) */}
          <div className="footer-links-area">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.2 + (index * 0.1)}>
                <div className="footer-column">
                  <h3 className="column-title">{section.label}</h3>
                  <ul className="link-list">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a href={link.href} className="footer-link">
                          {link.icon && <link.icon size={16} />}
                          {link.title}
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
    </footer>
  );
};

export default Footer;