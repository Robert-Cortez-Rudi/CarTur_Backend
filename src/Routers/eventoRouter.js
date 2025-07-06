import express from 'express'
import { criarEvento } from '../Controllers/Evento/criarEvento.js'
import { listarEventos } from '../Controllers/Evento/listarEventos.js'
import { eventoDetalhes } from '../Controllers/Evento/detalheEvento.js'
import { moderarEvento } from '../Controllers/Evento/moderarEvento.js'
import { checkUserRole } from '../Middlewares/checkUserRole.js'

const router = express.Router()

router.get('/', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO', 'MODERADOR'), listarEventos)
router.get('/:id', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO', 'MODERADOR'), eventoDetalhes)
router.post('/criar-evento', checkUserRole('GERAL', 'PREMIUM', 'CREDENCIADO'), criarEvento)
router.patch('/:id/moderar', checkUserRole('MODERADOR'), moderarEvento)

export default router
