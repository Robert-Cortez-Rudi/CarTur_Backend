import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export default function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido." })
  }

  const token = authHeader.split(" ")[1]

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado." })
    }

    req.user = decoded
    next()
  })
}
