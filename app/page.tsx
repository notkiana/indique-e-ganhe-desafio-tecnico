import IndicatorForm from "./components/IndicatorForm";

export default function Page() {
  return (
    <main className="space-y-6">
      <div className="card">
        <p className="text-slate-200">
          Preencha seus dados e indique até 5 amigos para participarem de consultas. <br></br>
          Seus dados serão armazenados pela clínica e tratados conforme a LGPD.
        </p>
      </div>
      <IndicatorForm />
      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Como funciona</h3>
        <ul className="list-disc pl-6 text-slate-300 space-y-1">
          <li>Indique até 5 amigos e/ou familiares, quanto mais pessoas se cadastrarem, maior é o desconto na sua próxima consulta.</li>
          <li>Limite de 5 indicações por cadastro.</li>
          <li>Leitura dos Termos e marcação de aceite obrigatória.</li>
          <li>Após 30 (trinta) dias da primeira indicação convertida, o indicador receberá o desconto proporcional ao número de conversões confirmadas.</li>
          <li>O benefício é intransferível e será validado exclusivamente pelo CPF do indicador. </li>
        </ul>
      </div>
    </main>
  );
}
