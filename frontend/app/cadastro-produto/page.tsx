import { Suspense } from "react";
import CadastroProduto from "./CadastroProduto";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroProduto />
    </Suspense>
  );
}