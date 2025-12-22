import React from 'react';
import { MessageCircle } from 'lucide-react'; // Utilizando a biblioteca já existente no projeto
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  // Número extraído do seu Footer.jsx
  const phoneNumber = "5508000004998"; 
  const message = encodeURIComponent("Olá! Gostaria de mais informações sobre a GemValue.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle size={32} strokeWidth={2} />
    </a>
  );
};

export default WhatsAppButton;