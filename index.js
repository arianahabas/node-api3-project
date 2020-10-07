const express = require('express')
const logger = require('./middleware/logger')
// const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = express()
const port = 4001

server.use(express.json())

server.use(logger())
server.use(userRouter)
// server.use(postRouter)



server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})



