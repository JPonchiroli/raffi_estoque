import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/vendas/create-venda`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar venda' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const action = searchParams.get('action');

    let url = '';

    if (action === 'list') {
      url = `${BACKEND_URL}/vendas/list-venda`;
    } else if (action === 'items' && id) {
      url = `${BACKEND_URL}/vendas/listar-itens-vendas/${id}`;
    } else if (id) {
      url = `${BACKEND_URL}/vendas/list-venda-id/${id}`;
    }

    if (!url) {
      return NextResponse.json(
        { error: 'Parâmetro inválido' },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar vendas' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const response = await fetch(`${BACKEND_URL}/vendas/deletar-venda/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar venda' },
      { status: 500 }
    );
  }
}
