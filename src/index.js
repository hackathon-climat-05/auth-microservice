const express = require('express')
const dotenv = require('dotenv').config()
const CommonLib = require("@hackathon-climat-05/common-lib");
const oauth = require('./oauht.js');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

app.get('/', async (req, res) => {
    console.log(req)
    return res.status(200).json({hello: 'world'})
})

app.get('/livez', async (req, res) => {
    return res.sendStatus(200)
})

app.post('/login', async (req, res) => {
    // on déchiffre le JWT
    // si ce n'est pas dans notre base de données on le register

    const authorizationUrl = await oauth.getAuthorizationUrl();
    console.log(authorizationUrl)

    res.status(301).json({Location: authorizationUrl})
})

app.post('/register', async (req, res) => {
    console.log(req.body);
})

app.listen(PORT, HOST, () => {
  console.log(`${new Date().toISOString()} - Running on http://${HOST}:${PORT}`)
})