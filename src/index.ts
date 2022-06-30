import express from 'express'
import googleRouter from './google'
import jwtRouter from './jwt'
import { initializeDatabase } from '@hackathon-climat-05/common-lib'

const PORT = parseInt(process.env.PORT || '8080', 10)
const HOST = process.env.HOST || '0.0.0.0'

const app = express()

app.use(express.json())

app.use('/google', googleRouter)

app.use('/jwt', jwtRouter)

app.get('/livez', (req, res) => {
    res.status(200).json({
        live: true
    })
})

app.all('/*', (req, res) => {
    res.status(404).json({})
})

initializeDatabase().then(async () => {
    app.listen(PORT, HOST, () => {
        console.log(`${new Date().toISOString()} - Running on http://${HOST}:${PORT}`)
    })
}).catch(error => {
    console.error(error)
    process.exit(1)
})
