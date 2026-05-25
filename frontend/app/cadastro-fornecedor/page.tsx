import { Suspense } from "react";
import CadastroFornecedor from "./CadastroFornecedor";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroFornecedor />
    </Suspense>
  );
}