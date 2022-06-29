import { Auth } from 'googleapis'
import { Router } from 'express'
import User from './entity/User'
import { entityManager } from './database'

const oauth2Client = new Auth.OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

const router = Router()

router.get('/url', async (req, res) => {
    try {
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.profile'
        ]

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true
        })

        res.status(200).json({
            url
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.body.code)

        const info = await oauth2Client.getTokenInfo(tokens.access_token)

        let user = null
        try {
            user = await entityManager.createQueryBuilder(User, 'user')
                .where('user.google_user_id = :id', { id: info.sub })
                .getOne()
        } catch (error) {}

        if (user === null) {
            user = new User()
            user.google_user_id = info.sub
            user.google_access_token = tokens.access_token
            user.google_refresh_token = tokens.refresh_token
            user.google_expiry_date = tokens.expiry_date
            await entityManager.save(user)
        }

        res.status(200).json({
            token: await user.getJWT()
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error
        })
    }
})

export default router
