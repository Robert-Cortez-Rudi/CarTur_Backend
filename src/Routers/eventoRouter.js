import express from 'express'
import { criarEvento } from '../Controllers/Evento/criarEvento.js'
import { listarEventos } from '../Controllers/Evento/listarEventos.js'
import { eventoDetalhes } from '../Controllers/Evento/detalheEvento.js'
import { moderarEvento } from '../Controllers/Evento/moderarEvento.js'
import { checkUserRole } from '../Middlewares/checkUserRole.js'
import { getEventosVisiveis } from '../Controllers/Evento/getEventosVisiveis.js'
import { getEventosFiltradosController } from '../Controllers/Evento/getEventosFiltrados.js'
import { getEventosAgrupadosPorData } from '../Controllers/Evento/getEventosAgrupados.js'

const router = express.Router()

router.get('/', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO', 'MODERADOR'), listarEventos) //
router.get('/:id', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO', 'MODERADOR'), eventoDetalhes) //
router.post('/criar-evento', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO'), criarEvento) //
router.patch('/:id/moderar', checkUserRole('MODERADOR'), moderarEvento) //
router.get('/calendario', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO'), listarEventos)

// router.get('calendario/visiveis/:usuarioId', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO'), getEventosVisiveis)
// router.get('calendario/filtrados', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO'), getEventosFiltradosController)
// router.get('calendario/agrupados', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO'), getEventosAgrupadosPorData)

export default router
