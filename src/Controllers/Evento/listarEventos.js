import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const listarEventos = async (req, res) => {
  let where = {}

  if (req.user.tipo_usuario === 'MODERADOR') {
    where.resposta_da_moderacao = 'pendente'
  } 
  else {
    where.resposta_da_moderacao = 'aprovado'
    where.aprovado_pela_modereacao = true
  }

  const eventos = await prisma.evento.findMany({
    where,
    include: { usuario: true }
  })
  res.json(eventos)
}
