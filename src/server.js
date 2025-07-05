import express from "express"
import cors from "cors"
import usuarioRouter from "./Routers/usuarioRouter.js"
import { homepage } from "./Controllers/homepage.js"
import { logger } from "./Middlewares/logger.js"

const app = express()
const port = 3000

app.use(logger)
app.use(cors())
app.use(express.json())


app.get("/", homepage)
app.use("/usuario", usuarioRouter)


app.listen(port, () => {
  console.log(`O servidor está funcionando em http://localhost:${port}`)
})
