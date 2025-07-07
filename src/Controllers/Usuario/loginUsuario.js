import { findByEmail } from "../../Models/usuarioModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export async function loginUsuarioController(req, res) {
  const { email, senha } = req.body

  try {
    const user = await findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: "E-mail ou senha inválidos!" })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash)
    if (!senhaValida) {
      return res.status(401).json({ message: "E-mail ou senha inválidos!" })
    }

    const token = jwt.sign({ id: user.id, email: user.email, tipo_usuario: user.tipo_usuario }, SECRET_KEY, {
      expiresIn: "2h"
    })

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario
      }
    })
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao entrar na conta!", detail: err.message })
  }
}
