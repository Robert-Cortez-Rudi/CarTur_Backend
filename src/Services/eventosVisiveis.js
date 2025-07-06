import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function EventosVisiveis(usuario_id) {
    const hoje = new Date()
    const eventosFuturos = await prisma.evento.findMany({
        where: {
        data_fim: { gte: hoje },
        aprovado_pela_modereacao: true,
        aprovado_pela_prefeitura: true,
        }
    })

    const eventosInscrito = await getEventosInscrito(usuario_id)

    const idsFuturos = eventosFuturos.map(e => e.id)
    const eventosAntigosInscrito = eventosInscrito.filter(e => !idsFuturos.includes(e.id))

    return [...eventosFuturos, ...eventosAntigosInscrito]
}
