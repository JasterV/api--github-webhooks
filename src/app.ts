import app from './api/server.ts'
import config from './config/mod.ts'

const port = parseInt(config.PORT)

await app.listen({ port });