import { Auth } from 'googleapis'
import { Router } from 'express'

const router = Router()

router.get('/url', async (req, res) => {
    const oauth2Client = new Auth.OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    )

    const scopes = [
        'https://www.googleapis.com/auth/drive.metadata.readonly'
    ]

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    })

    res.status(200).json({
        url
    })
})

router.get('/login', async (req, res) => {
    // TODO

    res.status(200).json({})
})

export default router
