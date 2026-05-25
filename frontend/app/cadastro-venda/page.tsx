import { Suspense } from "react";
import CadastroVenda from "./CadastroVenda";


export default function Page() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CadastroVenda />
    </Suspense>
  );
}