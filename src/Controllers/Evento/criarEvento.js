import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const criarEvento = async (req, res) => {
  try {
    const {
      titulo, descricao, data_inicio, data_fim, horario_inicio, horario_fim,
      localizacao, link_maps, publico, gratuito, limite_pessoas, tipo_evento,
      capa_url, requer_alvara, alvara_url, visivel_apos_evento, tempo_visivel
    } = req.body
    const evento = await prisma.evento.create({
      data: {
        titulo,
        descricao,
        data_inicio: new Date(data_inicio),
        data_fim: new Date(data_fim),
        horario_inicio: new Date(horario_inicio),
        horario_fim: new Date(horario_fim),
        localizacao,
        link_maps,
        publico,
        gratuito,
        limite_pessoas,
        organizador_id: req.user.id,
        tipo_evento,
        capa_url,
        requer_alvara,
        alvara_url,
        aprovado_pela_modereacao: false,
        resposta_da_moderacao: 'pendente', 
        visivel_apos_evento,
        tempo_visivel,
        criado_em: new Date()
      }
    })
    res.status(201).json(evento)
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar evento', error: err.message })
  }
}
