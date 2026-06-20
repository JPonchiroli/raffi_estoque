import { Suspense } from 'react';
import CadastroClienteForm from './CadastroClienteForm';

export default function CadastroClientePage() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroClienteForm />
    </Suspense>
  );
}