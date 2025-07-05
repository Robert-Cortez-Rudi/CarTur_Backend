import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const usuarioSchema = z.object({
    nome: z
    .string({ invalid_type_error: "O nome do usuário deve estar em formato correto!" })
    .min(1, "Um nome válido deve ser inserido!")
    .max(255, "Máximo de 255 caracteres"),
    
  cpf: z
    .string({ invalid_type_error: "Insira um CPF válido!" })
    .length(11, "CPF deve ter 11 caracteres"),

  email: z
    .string({ invalid_type_error: "Insira um email válido!" })
    .email(),

  senha_hash: z
    .string({ invalid_type_error: "A senha deve atender os requisitos!" })
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(500, "Senha deve ter no máximo 500 caracteres"),

  data_nascimento: z.string().refine(
    (val) => !isNaN(new Date(val).getTime()),
    { message: "Data de nascimento inválida" }
  ),

  cep: z.string().min(1, "CEP é obrigatório"),
  
  uf: z.string()
    .length(2, "UF deve ter exatamente 2 caracteres")
    .toUpperCase(),

  tipo_usuario: z.enum(["GERAL", "PREMIUM", "CREDENCIADO", "MODERADOR"])
})

export const usuarioValidator = (usuario, partial = null) => {
    if (partial) {
        return usuarioSchema.partial(partial).safeParse(usuario)
    }
    else {
        return usuarioSchema.safeParse(usuario)
    }
}

export async function create(user) {
  console.log("Data recebida:", user.data_nascimento, typeof user.data_nascimento);

  const hashedPassword = await bcrypt.hash(user.senha_hash, 10);

  const dataNascimentoDate = new Date(user.data_nascimento);
  if (isNaN(dataNascimentoDate)) {
    throw new Error("Data de nascimento inválida ou formato incorreto.");
  }

  return await prisma.usuario.create({
    data: {
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      senha_hash: hashedPassword,
      data_nascimento: dataNascimentoDate,
      cep: user.cep,
      uf: user.uf,
      tipo_usuario: user.tipo_usuario
    },
    select: {
      id: true,
      nome: true,
      cpf: true,
      email: true,
      senha_hash: true,
      data_nascimento: true,
      cep: true,
      uf: true,
      tipo_usuario: true
    }
  });
}


export async function findByEmail(email) {
  return await prisma.usuario.findUnique({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
      senha_hash: true
    }
  });
}
