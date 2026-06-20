import { Suspense } from 'react';
import CadastroFornecedorForm from './CadastroFornecedorForm';

export default function CadastroFornecedorPage() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroFornecedorForm />
    </Suspense>
  );
}