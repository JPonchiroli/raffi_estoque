/**
 * Tipos compartilhados do projeto Raffi Estoque
 */

// ==================== Cliente ====================
export interface Cliente {
  id?: string | number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export interface ClienteCreateDto extends Omit<Cliente, 'id'> {}

// ==================== Fornecedor ====================
export interface Fornecedor {
  id?: string | number;
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export interface FornecedorCreateDto extends Omit<Fornecedor, 'id'> {}

// ==================== Produto ====================
export interface Produto {
  id?: string | number;
  nome: string;
  descricao?: string;
  codigoBarras: string;
  valorCusto: number;
  porcentagemLucro: number;
  valorVenda: number;
  quantidade: number;
  fornecedor?: Fornecedor;
  fornecedorId?: string | number;
}

export interface ProdutoCreateDto extends Omit<Produto, 'id'> {}

// ==================== Venda ====================
export interface ItemVenda {
  id?: string | number;
  produto: Produto;
  quantidade: number;
  preco: number;
  produtoId?: string | number;
}

export interface Venda {
  id?: string | number;
  cliente: Cliente;
  dataVenda: string;
  valorTotal: number;
  itens: ItemVenda[];
  clienteId?: string | number;
}

export interface VendaCreateDto {
  clienteId: string | number;
  dataVenda: string;
  itensVenda: Array<{
    produtoId: string | number;
    quantidade: number;
    preco: number;
  }>;
}

// ==================== Endereço (ViaCEP) ====================
export interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string;
  numero?: string;
}

export interface EnderecoResponse {
  endereco: Endereco;
}

// ==================== API Response ====================
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  status: number;
}

// ==================== Autocomplete ====================
export interface AutocompleteOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

// ==================== DataTable ====================
export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface DataTableProps<T extends { id?: string | number }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  pageSize?: number;
  searchKeys?: (keyof T)[];
}
