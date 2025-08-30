# Indique e Ganhe — Desafio Técnico

Implementação de uma página web onde um **indicador** cadastra seus dados e **indica até 5 amigos**. Os dados são salvos em **arquivo JSON local** via rota de API (Next.js).

> **Requisitos atendidos**
> - Formulário do Indicador: Nome (obrigatório), E-mail (opcional), Telefone (obrigatório).
> - Formulário dos Indicados (até 5): Nome (obrigatório), E-mail (opcional), Telefone (obrigatório).
> - Validação de campos obrigatórios e controle para não permitir mais de 5 indicações.
> - Exibição dos **Termos e Condições (Anexo A)** de forma clara, com **aceite obrigatório**.
> - Layout simples, responsivo e funcional (TailwindCSS).
> - Armazenamento local em arquivo `data/submissions.json`.
> - Comentários em linha explicando escolhas no código.
>
> Termos transcritos do Anexo A do desafio.


## Tecnologias
- **Next.js 14 (App Router)** + **TypeScript**
- **TailwindCSS** para estilização responsiva
- **Zod** para validação (cliente e servidor)

## Como executar

### 1) Pré-requisitos
- Node.js 18+
- npm ou pnpm

### 2) Instalar dependências
```bash
npm install
# ou pnpm i
```

### 3) Rodar em desenvolvimento
```bash
npm run dev
```
Abra http://localhost:3000.

> Os cadastros são gravados em `data/submissions.json` no ambiente local. Em plataformas serverless com filesystem somente leitura (ex.: Vercel), substitua por Postgres (ver seção abaixo).

## Estrutura
```
app/
  api/
    submissions/route.ts   # POST: valida e persiste em JSON local
    health/route.ts        # GET: verificação simples
  components/
    IndicatorForm.tsx      # Form principal com validação e UI responsiva
    PhoneInput.tsx         # Campo de telefone com máscara leve + envio só dígitos
    TermsDialog.tsx        # Modal com os termos (Anexo A)
    TermsText.tsx          # Texto dos termos
  lib/
    schema.ts              # Zod schemas e regras
    api.ts                 # Funções de chamada às APIs
    types.ts               # Tipos TypeScript
data/submissions.json      # Armazenamento local (dev)
```

## Decisões de projeto (resumo)
- **Next.js**: simplifica mono-repo (frontend + API) e facilita publicação.  
- **TypeScript**: segurança de tipos e melhor manutenção.  
- **Zod**: validações compartilhadas no cliente/servidor; mensagens claras.  
- **Tailwind**: prototipagem rápida e responsividade.  
- **JSON local**: cumpre o requisito sem necessidade de infra de banco; ideal para avaliar a lógica. Para produção, trocar o provider da camada de persistência por Postgres.

### Regras implementadas
- Indicador e indicados com **nome e telefone obrigatórios**, e-mail opcional (validado se informado).
- **Aceite dos termos obrigatório**.
- **1 a 5 indicados** por submissão (o mínimo de 1 foi adotado para dar sentido à indicação).
- Limpeza de linhas totalmente vazias antes de validar (evita erros quando o usuário adiciona/remover campos).

### Observações
- A escrita em disco funciona **localmente**. Para deploy (ex.: Vercel), troque a persistência por Postgres ou outro storage.  
- O regex de telefone é **simples** (10–15 dígitos). Isso evita acoplamento a formatos específicos e garante validação consistente para testes.

## Próximos passos (criatividade, opcionais)
- Envio de e-mail de confirmação ao indicador (ex.: via Nodemailer + SMTP).
- Dashboard de listagem/admin (GET /api/submissions + página protegida).
- Persistência em Postgres (ex.: Prisma + Railway/Supabase).
- ReCAPTCHA para mitigar spam.
- Testes unitários (ex.: Vitest) e e2e (ex.: Playwright).

## Publicação (GitHub)
- Crie um repositório público e faça push deste código.
- Inclua este README no repositório, conforme solicitado no enunciado.

---

Feito para atender ao enunciado do desafio da Clínica da Cidade.
