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
import Simulation from './components/Simulation/Simulation';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer'; // <--- IMPORT

function App() {
  return (
    <main className="main-content-wrapper">
      <Hero />
      <WhyPhysical />
      <WhyDiamonds /> 
      <HowItWorks /> 
      <Parameters />
      <Authority />
      <TargetAudience />
      <Simulation />
      <FAQ />
      
      {/* Footer Final */}
      <Footer />
      
    </main>
  );
}

export default App;