import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const eventoDetalhes = async (req, res) => {
  const { id } = req.params
  const evento = await prisma.evento.findUnique({
    where: { id: Number(id) },
    include: { usuario: true }
  })
  if (!evento) return res.status(404).json({ message: 'Evento não encontrado' })

  if (
    ['GERAL', 'PREMIUM', 'CREDENCIADO'].includes(req.user.tipo_usuario) &&
    (evento.resposta_da_moderacao !== 'aprovado' || !evento.aprovado_pela_modereacao)
  ) {
    return res.status(403).json({ message: 'Evento não aprovado' })
  }

  res.json(evento)
}
