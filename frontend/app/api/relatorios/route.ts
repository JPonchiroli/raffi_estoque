import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const dataInicio = searchParams.get('dataInicio');
    const dataFim = searchParams.get('dataFim');

    let url = '';

    if (action === 'resumo') {
      url = `${BACKEND_URL}/relatorios/resumo`;
    } else if (action === 'produtos-mais-vendidos') {
      url = `${BACKEND_URL}/relatorios/produtos-mais-vendidos`;
    } else if (action === 'faturamento' && dataInicio && dataFim) {
      url = `${BACKEND_URL}/relatorios/faturamento?dataInicio=${dataInicio}&dataFim=${dataFim}`;
    } else if (action === 'faturamento-mensal') {
      url = `${BACKEND_URL}/relatorios/faturamento-mensal`;
    } else if (action === 'estoque-baixo') {
      url = `${BACKEND_URL}/relatorios/estoque-baixo`;
    } else {
      return NextResponse.json({ error: 'Parâmetro inválido' }, { status: 400 });
    }

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar relatório' }, { status: 500 });
  }
}
