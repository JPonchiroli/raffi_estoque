/**
 * Utilitários do projeto Raffi Estoque
 */

/**
 * Formata um valor monetário para o padrão brasileiro
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata uma data para o padrão brasileiro
 */
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(
    typeof date === 'string' ? new Date(date) : date
  );
};

/**
 * Remove caracteres não numéricos
 */
export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Formata CEP para padrão brasileiro (00000-000)
 */
export const formatCEP = (value: string): string => {
  const cleaned = removeNonNumeric(value);
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
};

/**
 * Formata telefone para padrão brasileiro ((00) 0000-0000)
 */
export const formatPhone = (value: string): string => {
  const cleaned = removeNonNumeric(value);
  return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

/**
 * Formata CNPJ para padrão brasileiro (00.000.000/0000-00)
 */
export const formatCNPJ = (value: string): string => {
  const cleaned = removeNonNumeric(value);
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de CEP
 */
export const isValidCEP = (cep: string): boolean => {
  const cleaned = removeNonNumeric(cep);
  return cleaned.length === 8;
};

/**
 * Valida formato de CNPJ (básico)
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  const cleaned = removeNonNumeric(cnpj);
  return cleaned.length === 14;
};

/**
 * Calcula valor de venda baseado em custo e margem de lucro
 */
export const calculateSalePrice = (cost: number, marginPercent: number): number => {
  return cost * (1 + marginPercent / 100);
};

/**
 * Calcula margem de lucro baseado em custo e valor de venda
 */
export const calculateMargin = (cost: number, salePrice: number): number => {
  return ((salePrice - cost) / cost) * 100;
};

/**
 * Processa erro de API e retorna mensagem amigável
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Erro desconhecido. Tente novamente.';
};

/**
 * Debounce para funções
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Cria delay assíncrono
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Verifica se o objeto está vazio
 */
export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Clona objeto profundamente
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
