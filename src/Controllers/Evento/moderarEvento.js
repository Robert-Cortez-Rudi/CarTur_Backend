import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const moderarEvento = async (req, res) => {
  const { id } = req.params
  const { acao, motivo_rejeicao } = req.body 

  if (!['aprovar', 'rejeitar'].includes(acao)) {
    return res.status(400).json({ message: 'Ação inválida' })
  }

  const evento = await prisma.evento.findUnique({ where: { id: Number(id) } })

  if (!evento || evento.resposta_da_moderacao !== 'pendente') {
    return res.status(400).json({ message: 'Evento não está pendente' })
  }

  await prisma.evento.update({
    where: { id: Number(id) },
    data: {
      resposta_da_moderacao: acao === 'aprovar' ? 'aprovado' : 'rejeitado',
      aprovado_pela_modereacao: acao === 'aprovar',
      motivo_rejeicao: acao === 'rejeitar' ? motivo_rejeicao : null
    }
  })
  res.json({ message: `Evento '${acao}' feito com sucesso` })
}
