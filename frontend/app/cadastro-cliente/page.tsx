import { Suspense } from "react";
import CadastroCliente from "./CadastroCliente";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroCliente />
    </Suspense>
  );
}