import { z } from "zod";

/**
 * Validações com Zod (cliente e servidor) para garantir
 * os campos obrigatórios e as regras do desafio.
 * 
 * Decisões:
 * - Nome completo e telefone são obrigatórios para todos.
 * - E-mail é opcional (mas validado se fornecido).
 * - Pelo menos 1 indicado e no máximo 5 (regra do desafio).
 * - Aceite dos termos obrigatório (Anexo A).
 */
const phoneRegex = /^\+?\d{10,15}$/; 
const nameRegex = /^[A-Za-zÀ-ÿ\s.'-]+$/;
const nameRule = z.string().min(3, "Informe o nome completo")
  .regex(nameRegex, "Use apenas letras e espaços (sem números ou @)");

export const indicadoSchema = z.object({
  fullName: nameRule,
  email: z.string().email("E-mail inválido").optional().or(z.literal("").transform(() => undefined)),
  phone: z.string().regex(phoneRegex, "Telefone inválido (use somente números com DDD)"),
});

export const indicadorSchema = z.object({
  fullName: nameRule,
  email: z.string().email("E-mail inválido").optional().or(z.literal("").transform(() => undefined)),
  phone: z.string().regex(phoneRegex, "Telefone inválido (use somente números com DDD)"),
acceptTerms: z.boolean().refine((v) => v === true, { message: "Você precisa aceitar os termos e condições" }),
});

export const submissionSchema = z.object({
  indicador: indicadorSchema,
  indicados: z.array(indicadoSchema).min(1, "Indique pelo menos 1 amigo").max(5, "Limite de 5 indicações"),
});
export type SubmissionInput = z.infer<typeof submissionSchema>;
