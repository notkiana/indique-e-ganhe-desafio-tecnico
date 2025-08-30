'use client';

import { useState } from 'react';
import { submissionSchema, SubmissionInput } from '../lib/schema';
import { createSubmission } from '../lib/api';
import PhoneInput from './PhoneInput';
import TermsDialog from './TermsDialog';

type Errors = Record<string, string | undefined>;

export default function IndicatorForm() {
  const [indicador, setIndicador] = useState({ fullName: '', email: '', phone: '', acceptTerms: false });
  const [indicados, setIndicados] = useState([{ fullName: '', email: '', phone: '' }]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  function addIndicado() {
    if (indicados.length >= 5) return;
    setIndicados([...indicados, { fullName: '', email: '', phone: '' }]);
  }

  function removeIndicado(index: number) {
    setIndicados(indicados.filter((_, i) => i !== index));
  }

  const sanitizeName = (s: string) => s.replace(/[^A-Za-zÀ-ÿ\s.'-]/g, "");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const payload: SubmissionInput = {
      indicador: {
        fullName: indicador.fullName.trim(),
        email: indicador.email?.trim() || undefined,
        phone: indicador.phone,
        acceptTerms: indicador.acceptTerms,
      },
      indicados: indicados
        .map((i) => ({
          fullName: i.fullName.trim(),
          email: i.email?.trim() || undefined,
          phone: i.phone,
        }))
        .filter((i) => i.fullName || i.phone || i.email), 
    };

    const parsed = submissionSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        fieldErrors[path
          .replace(/^indicados\.(\d+)\./, (_, idx) => `indicado.${idx}.`)
        ] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setSubmitting(true);
      const result = await createSubmission(parsed.data);
      setSuccess({ id: result.id });
    } catch (err: any) {
      alert(err.message || 'Erro ao enviar');
    } finally {
      setSubmitting(false);
    }
  }

if (success) {
  return (
    <div className="card text-center space-y-4">
      <h2 className="text-2xl font-semibold">Indicação enviada! 🎉</h2>
      <p className="text-slate-300">
        Seu protocolo é <span className="font-mono">{success.id}</span>. Obrigado por indicar seus amigos!
      </p>

      <button
        className="btn bg-green-500 text-white"
        onClick={() => {
          // limpa estado e volta ao início
          setSuccess(null);
          setIndicador({ fullName: '', email: '', phone: '', acceptTerms: false });
          setIndicados([{ fullName: '', email: '', phone: '' }]);
          setErrors({});
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        Indicar novamente
      </button>
    </div>
  );
}

  return (
    <form className="card space-y-6" onSubmit={onSubmit}>
      <section>
        <h2 className="text-xl font-semibold mb-2">Seus dados</h2>
        <p className="helper mb-4">Preencha seus dados como indicador.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="indicadorNome">Nome completo *</label>
            <input id="indicadorNome" className="input" placeholder="Ex.: Maria Silva"
             value={indicador.fullName} onChange={(e) => setIndicador({ ...indicador, fullName: sanitizeName(e.target.value) })}
/>
            {errors['indicador.fullName'] && <p className="error">{errors['indicador.fullName']}</p>}
          </div>
          <div>
            <label className="label" htmlFor="indicadorEmail">E-mail (opcional)</label>
            <input id="indicadorEmail" className="input" type="email" placeholder="maria@email.com"
              value={indicador.email} onChange={(e) => setIndicador({ ...indicador, email: e.target.value })} />
            {errors['indicador.email'] && <p className="error">{errors['indicador.email']}</p>}
          </div>
          <div>
            <label className="label" htmlFor="indicadorTelefone">Telefone *</label>
            <PhoneInput id="indicadorTelefone" value={indicador.phone} onChange={(v) => setIndicador({ ...indicador, phone: v })} required />
            {errors['indicador.phone'] && <p className="error">{errors['indicador.phone']}</p>}
          </div>
        </div>
        <TermsDialog />
        <div className="mt-3 flex items-center gap-3">
          <input id="accept" type="checkbox" className="h-4 w-4" checked={indicador.acceptTerms}
            onChange={(e) => setIndicador({ ...indicador, acceptTerms: e.target.checked })} />
          <label htmlFor="accept" className="text-sm text-slate-300">
            Declaro que li e aceito os Termos e Condições do programa.
          </label>
        </div>
        {errors['indicador.acceptTerms'] && <p className="error">{errors['indicador.acceptTerms']}</p>}
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold mb-2">Indique até 5 amigos</h2>
          <span className="text-sm text-slate-400">{indicados.length} / 5</span>
        </div>
        <div className="helper mb-4">
          Informe pelo menos 1 indicado. Clique em “+ Adicionar indicado” para incluir mais.
        </div>
        <div className="space-y-4">
          {indicados.map((ind, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4">
                <label className="label" htmlFor={`indicadoNome${idx}`}>Nome completo *</label>
                <input id={`indicadoNome${idx}`} className="input" value={ind.fullName} placeholder="Ex.: Maria Andréia" onChange={(e) => {
                    const arr = [...indicados]; arr[idx].fullName = sanitizeName(e.target.value); setIndicados(arr);
                  }} />
                {errors[`indicado.${idx}.fullName`] && <p className="error">{String(errors[`indicado.${idx}.fullName`])}</p>}
              </div>
              <div className="md:col-span-3">
                <label className="label" htmlFor={`indicadoEmail${idx}`}>E-mail (opcional)</label>
                <input id={`indicadoEmail${idx}`} className="input" type="email" placeholder="Ex.: maria@email.com"
                  value={ind.email}
                  onChange={(e) => {
                    const arr = [...indicados]; arr[idx].email = e.target.value; setIndicados(arr);
                  }} />
                {errors[`indicado.${idx}.email`] && <p className="error">{String(errors[`indicado.${idx}.email`])}</p>}
              </div>
              <div className="md:col-span-3">
                <label className="label" htmlFor={`indicadoPhone${idx}`}>Telefone *</label>
                <PhoneInput id={`indicadoPhone${idx}`} value={ind.phone}
                  onChange={(v) => { const arr = [...indicados]; arr[idx].phone = v; setIndicados(arr); }} required />
                {errors[`indicado.${idx}.phone`] && <p className="error">{String(errors[`indicado.${idx}.phone`])}</p>}
              </div>
              <div className="md:col-span-2 flex md:justify-end pt-6">
                <button type="button" className="btn-ghost" onClick={() => removeIndicado(idx)} disabled={indicados.length === 1}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button type="button" className="btn-ghost" onClick={addIndicado} disabled={indicados.length >= 5}>
            + Adicionar indicado
          </button>
          {errors['indicados'] && <p className="error">{errors['indicados']}</p>}
        </div>
      </section>

      <div className="flex gap-3 pt-2">
        <button className="btn-primary" disabled={submitting}>Enviar indicação</button>
        <button type="reset" className="btn-ghost" onClick={() => { 
          setIndicador({ fullName: '', email: '', phone: '', acceptTerms: false });
          setIndicados([{ fullName: '', email: '', phone: '' }]);
          setErrors({});
        }}>Limpar</button>


      </div>
    </form>
  );
}
