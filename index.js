const express = require('express')
const logger = require('./middleware/logger')
const postRouter = require('./posts/postRouter')

const server = express()
const port = 4001

server.use(express.json())

server.use(logger())
server.use(postRouter)


server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})



