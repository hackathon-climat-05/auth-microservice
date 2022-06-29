import express from 'express'
import dotenv from 'dotenv'
// import CommonLib from "@hackathon-climat-05/common-lib"
import googleRouter from "./google"

dotenv.config()

const PORT = parseInt(process.env.PORT || "8080", 10)
const HOST = process.env.HOST || "0.0.0.0"

const app = express()

app.use(express.json())

app.use('/google', googleRouter)

app.get('/livez', (req, res) => {
    res.status(200).json({
        live: true
    })
})

app.get('/*', (req, res) => {
    res.status(404).json({})
})

app.listen(PORT, HOST, () => {
  console.log(`${new Date().toISOString()} - Running on http://${HOST}:${PORT}`)
})
