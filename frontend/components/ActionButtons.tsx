'use client';

import Link from 'next/link';
import { Plus, List } from 'lucide-react';

interface ActionButtonsProps {
  createLink: string;
  createLabel?: string;
  listLink: string;
  listLabel?: string;
}

export default function ActionButtons({
  createLink,
  createLabel = 'Adicionar',
  listLink,
  listLabel = 'Listar',
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Link
        href={createLink}
        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
      >
        <Plus size={20} />
        {createLabel}
      </Link>
      <Link
        href={listLink}
        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
      >
        <List size={20} />
        {listLabel}
      </Link>
    </div>
  );
}
