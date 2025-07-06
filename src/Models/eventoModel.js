import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const dateString = z.string().refine(
  (val) => !isNaN(new Date(val).getTime()),
  { message: "Data inválida ou mal formatada" }
)

export const eventoSchema = z.object({
  titulo: z.string({ invalid_type_error: "Título inválido" })
    .min(1, "Título é obrigatório")
    .max(255, "Máximo de 255 caracteres"),
  descricao: z.string({ invalid_type_error: "Descrição inválida" })
    .min(1, "Descrição é obrigatória"),
  data_inicio: dateString,
  data_fim: dateString,
  horario_inicio: dateString,
  horario_fim: dateString,
  localizacao: z.string().min(1, "Localização obrigatória").max(255),
  link_maps: z.string().max(500).nullable().optional(),
  publico: z.boolean().default(true),
  gratuito: z.boolean().default(true),
  limite_pessoas: z.number().int().positive("Número inválido").nullable().optional(),
  organizador_id: z.number({ invalid_type_error: "ID inválido" }),
  tipo_evento: z.string({ invalid_type_error: "Tipo inválido" }),
  capa_url: z.string().max(500).nullable().optional(),
  requer_alvara: z.boolean().default(false).optional(),
  alvara_url: z.string().max(500).nullable().optional(),
  aprovado_pela_modereacao: z.boolean().default(false).optional(),
  resposta_da_moderacao: z.string().optional().default("pendente"),
  aprovado_pela_prefeitura: z.boolean().default(false).optional(),
  motivo_rejeicao: z.string().nullable().optional(),
  denuncias: z.number().int().default(0).optional(),
  denunciado_em: dateString.nullable().optional(),
  visivel_apos_evento: z.boolean().default(true).optional(),
  tempo_visivel: z.number().int().positive().nullable().optional(),
  criado_em: dateString
})


export function eventoValidator(evento, partial = null) {
  if (partial) {
    return eventoSchema.partial(partial).safeParse(evento)
  } else {
    return eventoSchema.safeParse(evento)
  }
}
