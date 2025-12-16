import api from './api';

const contractService = {
  // Retorna { id: 1, minimumValue: 3000, ... }
  getContractSettings: async () => {
    try {
      const response = await api.get('/contractsettings');
      return response.data;
    } catch (error) {
      console.error("Erro ao obter configurações:", error);
      // Retorno de fallback para não quebrar a tela
      return { minimumValue: 3000 }; 
    }
  },

  // Retorna [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  getAvailableMonths: async () => {
    try {
      const response = await api.get('/contract/rules/available-months');
      return response.data || [];
    } catch (error) {
      console.error("Erro ao obter meses:", error);
      return [12]; // Fallback seguro
    }
  },

  // Simulação
  simulate: async (data) => {
    try {
      const response = await api.post('/contract/simulate', data);
      return response.data;
    } catch (error) {
      console.error("Erro ao simular contrato:", error);
      throw error;
    }
  }
};

export default contractService;