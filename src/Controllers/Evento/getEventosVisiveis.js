import { EventosVisiveis } from '../../Services/eventosVisiveis.js'

export async function getEventosVisiveis(req, res) {
  try {
        const usuarioId = Number(req.params.usuarioId)
        const eventos = await EventosVisiveis(usuarioId)
        res.status(200).json(eventos)
  } 
  catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar eventos' })
  }
}
