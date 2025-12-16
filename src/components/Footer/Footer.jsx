import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Facebook, Linkedin, Youtube, 
  Gem, FileText, ShieldCheck, MapPin, 
  Mail, Phone, MessageCircle, X
} from 'lucide-react';
import './Footer.css';

// --- CONSTANTES ESTÁTICAS (Não pesam no render) ---
const CURRENT_YEAR = new Date().getFullYear();

// === TEXTO COMPLETO: TERMOS DE USO ===
const TERMS_TEXT = (
  <div className="legal-text-content">
    <p>Ao acessar e utilizar a plataforma GemValue, o usuário declara estar de acordo com os presentes Termos de Uso e com a Política de Privacidade.</p>
    <p>A GemValue é uma plataforma desenvolvida e operada pela Gemas Brilhantes, responsável legal pelas informações e estruturas apresentadas.</p>

    <h3>1. Natureza da plataforma</h3>
    <p>A GemValue atua como uma plataforma informativa, voltada à apresentação de estruturas baseadas em ativos físicos, formalizadas por contrato com a Gemas Brilhantes.</p>
    <p>As informações disponibilizadas possuem caráter informativo e não constituem oferta pública, promessa ou recomendação financeira.</p>

    <h3>2. Não caracterização como instituição financeira</h3>
    <p>A GemValue e a Gemas Brilhantes não são instituições financeiras, não realizam captação pública de recursos, nem intermediação de valores mobiliários.</p>

    <h3>3. Uso da plataforma</h3>
    <p>O usuário compromete-se a utilizar a plataforma de forma lícita, ética e responsável, fornecendo informações verdadeiras quando solicitado.</p>

    <h3>4. Propriedade intelectual</h3>
    <p>Todo o conteúdo disponibilizado na plataforma é de propriedade da Gemas Brilhantes, sendo vedada sua reprodução sem autorização.</p>

    <h3>5. Limitação de responsabilidade</h3>
    <p>A Gemas Brilhantes não se responsabiliza por decisões tomadas pelo usuário com base nas informações disponibilizadas na plataforma.</p>

    <h3>6. Alterações e legislação aplicável</h3>
    <p>Estes Termos de Uso podem ser atualizados a qualquer momento e são regidos pelas leis da República Federativa do Brasil.</p>

    <p className="legal-update">Última atualização: Janeiro de 2025</p>
  </div>
);

// === TEXTO COMPLETO: POLÍTICA DE PRIVACIDADE ===
const PRIVACY_TEXT = (
  <div className="legal-text-content">
    <p>A presente Política de Privacidade tem como objetivo informar, de forma clara e transparente, como os dados pessoais dos usuários são coletados, utilizados, armazenados e protegidos ao acessar e utilizar a plataforma GemValue.</p>
    <p>A GemValue é uma plataforma desenvolvida e operada pela Gemas Brilhantes, responsável legal pelo tratamento dos dados pessoais aqui descritos.</p>

    <h3>1. Quem somos</h3>
    <p>GemValue é uma plataforma digital vinculada à Gemas Brilhantes, especializada em estruturas baseadas em ativos físicos e operações comerciais lastreadas no mercado real de gemas preciosas.</p>
    <p><strong>Responsável legal:</strong><br/>Gemas Brilhantes<br/>CNPJ: 50.793.164/0001-91</p>

    <h3>2. Quais dados coletamos</h3>
    <p>Podemos coletar os seguintes dados pessoais, de forma direta ou indireta:</p>
    <ul>
      <li>Nome completo</li>
      <li>Endereço de e-mail</li>
      <li>Número de telefone (WhatsApp)</li>
      <li>Informações fornecidas em formulários de contato ou simulação</li>
      <li>Endereço IP e dados de navegação</li>
      <li>Informações sobre dispositivo e navegador</li>
    </ul>
    <p>A coleta ocorre quando o usuário preenche formulários no site, solicita contato com um especialista ou interage com anúncios e conteúdos.</p>

    <h3>3. Finalidade do uso dos dados</h3>
    <p>Os dados coletados são utilizados para:</p>
    <ul>
      <li>Entrar em contato com o usuário quando solicitado</li>
      <li>Enviar informações relacionadas às estruturas apresentadas</li>
      <li>Prestar atendimento, suporte e esclarecimento de dúvidas</li>
      <li>Cumprir obrigações legais e regulatórias</li>
      <li>Melhorar a experiência de navegação e realizar análises internas</li>
    </ul>

    <h3>4. Compartilhamento de dados</h3>
    <p>Os dados pessoais poderão ser compartilhados apenas quando necessário, com ferramentas de atendimento e CRM, plataformas de automação de marketing e serviços de infraestrutura tecnológica.</p>
    <p>A Gemas Brilhantes <strong>não comercializa</strong>, vende ou repassa dados pessoais a terceiros para fins indevidos.</p>

    <h3>5. Armazenamento e segurança dos dados</h3>
    <p>Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acesso não autorizado, perda, alteração ou destruição indevida.</p>

    <h3>6. Direitos do titular dos dados</h3>
    <p>Nos termos da LGPD, o usuário tem direito a confirmar a existência de tratamento, acessar seus dados, solicitar correção, exclusão ou anonimização, e revogar consentimentos.</p>

    <h3>7. Cookies e tecnologias de rastreamento</h3>
    <p>A plataforma pode utilizar cookies para melhorar a experiência do usuário e analisar padrões de navegação. O usuário pode gerenciar cookies diretamente em seu navegador.</p>

    <h3>8. Aviso legal importante</h3>
    <p>A GemValue não é uma instituição financeira e não realiza captação pública de recursos. As informações têm caráter informativo sobre operações comerciais com lastro físico.</p>

    <h3>9. Alterações nesta Política</h3>
    <p>Esta Política de Privacidade pode ser atualizada a qualquer momento. Recomendamos a revisão periódica deste documento.</p>

    <h3>10. Contato</h3>
    <p>Em caso de dúvidas, entre em contato pelos canais oficiais da Gemas Brilhantes.</p>

    <p className="legal-update">Última atualização: Janeiro de 2025</p>
  </div>
);

// --- Componente de Animação Otimizado (Sem Blur) ---
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
          {content}
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

  // useMemo para lista de links estática
  const footerLinks = useMemo(() => [
    {
      label: 'Legal',
      links: [
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
            title={activeModal === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
            content={activeModal === 'terms' ? TERMS_TEXT : PRIVACY_TEXT}
          />
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;