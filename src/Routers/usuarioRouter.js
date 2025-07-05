import express from "express"
import { createUsuarioController } from "../Controllers/Usuario/createUsuario.js"
import { loginUsuarioController } from "../Controllers/Usuario/loginUsuario.js"
import { checkUserRole } from "../Middlewares/checkUserRole.js"

const router = express.Router()


router.post("/cadastrar", createUsuarioController)
router.post("/login", loginUsuarioController)
router.get("/painel", checkUserRole("GERAL", "PREMIUM", "CREDENCIADO"), (req, res) => {
  res.send(`Painel do Usuário: Bem-vindo(a), ${req.user.nome}`);
});

router.get("/painel-moderador", checkUserRole("MODERADOR"), (req, res) => {
  res.send(`Painel de Moderador: Olá, ${req.user.nome}`);
});


export default router
