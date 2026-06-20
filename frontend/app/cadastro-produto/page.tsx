import { Suspense } from 'react';
import CadastroProdutoForm from './CadastroProdutoForm';

export default function CadastroProdutoPage() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroProdutoForm />
    </Suspense>
  );
}