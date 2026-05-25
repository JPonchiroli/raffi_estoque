'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white text-center py-6 mt-12">
      <p>&copy; {currentYear} Raffi Estoque. Todos os direitos reservados.</p>
    </footer>
  );
}
