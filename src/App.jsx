/* file: src/App.jsx */
import React from 'react';
import './App.css';

// Componentes da Estrutura
import Hero from './components/Hero/Hero';

// Componentes de Conteúdo
import WhyPhysical from './components/WhyPhysical/WhyPhysical'; 
import WhyDiamonds from './components/WhyDiamonds/WhyDiamonds'; 
import HowItWorks from './components/HowItWorks/HowItWorks'; 
import Parameters from './components/Parameters/Parameters';
import Authority from './components/Authority/Authority';
import TargetAudience from './components/TargetAudience/TargetAudience';
import Simulation from './components/Simulation/Simulation'; // <--- IMPORTADO AQUI

function App() {
  return (
    <main className="main-content-wrapper">
      <Hero />
      
      {/* Fluxo de Cores: 
          Hero (Azul Escuro) -> WhyPhysical (Gradiente p/ Branco) -> 
          WhyDiamonds (Branco) -> HowItWorks (Azul Escuro) ->
          Parameters (Branco) -> Authority (Azul Escuro) ->
          TargetAudience (Branco) -> Simulation (Azul Escuro)
      */}
      
      <WhyPhysical />
      <WhyDiamonds /> 
      <HowItWorks /> 
      <Parameters />
      <Authority />
      <TargetAudience />
      <Simulation /> {/* <--- ADICIONADO AQUI */}
      
    </main>
  );
}

export default App;