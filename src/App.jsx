import React from 'react';
import './App.css';

// Componentes da Estrutura
import Hero from './components/Hero/Hero';

// Componentes de Conteúdo (que você já criou)
import WhyPhysical from './components/WhyPhysical/WhyPhysical'; 
import WhyDiamonds from './components/WhyDiamonds/WhyDiamonds'; 
import HowItWorks from './components/HowItWorks/HowItWorks'; // NOVA SEÇÃO IMPORTADA AQUI
import Parameters from './components/Parameters/Parameters'; // Importe aqui
import Authority from './components/Authority/Authority';
import TargetAudience from './components/TargetAudience/TargetAudience'; // Importe aqui

function App() {
  return (
    // Fragmento para englobar todas as seções
    <main className="main-content-wrapper">
      <Hero />
      
      {/* ORDEM DAS SEÇÕES:
        1. WhyPhysical (Termina em #081c42 / Fundo escuro)
        2. WhyDiamonds (Começa em #081c42 / Termina em #000000)
        3. HowItWorks (Começa em #000000 para fusão perfeita)
      */}
      <WhyPhysical />
      <WhyDiamonds /> 
      <HowItWorks /> 
      <Parameters />
      <Authority />
      <TargetAudience />
      
      {/* Adicione outras seções aqui conforme forem criadas */}
    </main>
  );
}

export default App;