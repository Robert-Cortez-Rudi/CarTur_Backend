import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function EventosFiltrados(req, res) {
  try {
    const {
        tipo_evento,
        tipo_usuario,
        data_inicio,
        data_fim,
        inscrito
    } = req.query

    let where = {
        aprovado_pela_modereacao: true,
        aprovado_pela_prefeitura: true,
    }

    if (tipo_evento) {
        where.tipo_evento = tipo_evento
    }

    if (tipo_usuario) {
        where.criador = { tipo_usuario: Number(tipo_usuario) }
    }

    if (data_inicio) {
        where.data_inicio = { gte: new Date(data_inicio) }
    }

    if (data_fim) {
        where.data_fim = { ...(where.data_inicio || {}), lte: new Date(data_fim) }
    }

    if (inscrito === "true") {
        if (!req.user?.id) {
            return res.status(401).json({ erro: "Usuário não autenticado" })
        }
        where.inscricoes = { some: { usuario_id: req.user.id } }
    }

    const eventos = await prisma.evento.findMany({
        where,
        include: {
            criador: true,
            inscricoes: inscrito === "true" ? { where: { usuario_id: req.user.id } } : false
        },
        orderBy: { data_inicio: 'asc' }
    })

    res.json(eventos)
  } 
  catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao buscar eventos" })
  }
}
