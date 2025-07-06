import { EventosAgrupadosPorData } from "../../Services/eventosAgrupados.js"

export async function getEventosAgrupadosPorData(req, res) {
  try {
        const filtros = req.query
        const eventosAgrupados = await EventosAgrupadosPorData(filtros)
        res.status(200).json(eventosAgrupados)
  } 
  catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar eventos agrupados por data' })
  }
}
