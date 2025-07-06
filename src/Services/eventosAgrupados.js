import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function EventosAgrupadosPorData() {
  const eventos = await prisma.evento.findMany({
    where: {
      aprovado_pela_modereacao: true,
      aprovado_pela_prefeitura: true
    },
    orderBy: { data_inicio: 'asc' }
  })

  const agrupados = {}
  eventos.forEach(ev => {
    const data = ev.data_inicio.toISOString().split('T')[0]
    if (!agrupados[data]) agrupados[data] = []
    agrupados[data].push(ev)
  })
  return agrupados
}
