const express = require('express')
const {google} = require('googleapis');
const CommonLib = require("@hackathon-climat-05/common-lib")
const app = express();
app.use(express.json());

const PORT = 8080
const HOST = "0.0.0.0"

app.get('/', async (req, res) => {
    console.log(req)
    return res.status(200).json({hello: 'world'})
})

app.get('/livez', async (req, res) => {
    return res.sendStatus(200)
})

app.post('/login', async (req, res) => {
    console.log(req.body.credential)
    return res.sendStatus(200)
})

app.listen(PORT, HOST, () => {
  console.log(`${new Date().toISOString()} - Running on http://${HOST}:${PORT}`)
})