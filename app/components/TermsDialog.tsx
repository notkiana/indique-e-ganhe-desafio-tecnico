'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import TermsText from './TermsText';

export default function TermsDialog() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button type="button" className="btn-ghost" onClick={() => setOpen(true)}>
        Ler termos e condições
      </button>
      {open && createPortal((
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
    role="dialog"
    aria-modal="true"
  >
    <div className="card max-w-2xl w-full relative">
      <button
        className="absolute right-4 top-4 text-slate-400 hover:text-white"
        aria-label="Fechar"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>

      <h3 className="text-xl font-semibold mb-2">Termos e Condições</h3>

      {/* Rolagem interna para textos longos */}
      <div className="max-h-[70vh] overflow-auto pr-2">
        <TermsText />
      </div>
    </div>
  </div>
), document.body)}
    </div>
  );
}
