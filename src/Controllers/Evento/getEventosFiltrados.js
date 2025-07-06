import { EventosFiltrados } from "../../Services/eventosFiltros.js"

export async function getEventosFiltradosController(req, res) {
  try {
        const filtros = req.query
        const eventos = await EventosFiltrados(filtros)
        res.status(200).json(eventos)
  } 
  catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar eventos filtrados' })
  }
}
