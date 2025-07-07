import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function checkUserRole(...allowedTypes) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'O token não foi fornecido' })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await prisma.usuario.findUnique({
        where: { id: decoded.id },
        select: { id: true, nome: true, tipo_usuario: true }
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' })
      }

      if (!allowedTypes.includes(user.tipo_usuario)) {
        return res.status(403).json({ message: 'Acesso negado: você não possui acesso a essa página' })
      }

      req.user = user
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado' })
    }
  };
}
