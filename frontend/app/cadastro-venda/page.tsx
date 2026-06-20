import { Suspense } from 'react';
import CadastroVendaForm from './CadastroVendaForm';

export default function CadastroVendaPage() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroVendaForm />
    </Suspense>
  );
}