import React, { createContext, useContext, useState, useEffect } from 'react';
import contractService from '../services/contractService'; // Verifique se o caminho está certo

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [config, setConfig] = useState({
    availableMonths: [],
    minAmount: 3000,
    isLoaded: false,
    isLoading: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [monthsData, settingsData] = await Promise.all([
          contractService.getAvailableMonths(),
          contractService.getContractSettings()
        ]);

        setConfig({
          availableMonths: monthsData || [12],
          minAmount: settingsData?.minimumValue || 3000,
          isLoaded: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Erro ao carregar configurações globais:", error);
        setConfig(prev => ({ ...prev, isLoaded: true, isLoading: false }));
      }
    };

    fetchSettings();
  }, []);

  return (
    <ContractContext.Provider value={config}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractConfig = () => {
  return useContext(ContractContext);
};