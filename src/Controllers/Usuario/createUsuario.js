import { create, usuarioValidator } from "../../Models/usuarioModel.js"


export async function createUsuarioController(req, res) {
  const validation = usuarioValidator(req.body);

  if (!validation.success) {
    return res.status(400).json(validation.error.format());
  }

  try {
    const user = await create(validation.data);
    return res.status(201).json(user);
  } 
  catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao criar o usuário", detail: err.message });
  }
}
