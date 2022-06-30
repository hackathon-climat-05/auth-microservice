import { Router } from 'express'
import User from './entity/User'

const router = Router()

router.post('/validate', async (req, res) => {
    try {
        const user = await User.verifyJWT(req.body.token)

        res.status(200).json({
            id: user.id,
            google_id: user.google_id
        })
    } catch (error) {
        res.status(401).json({
            error
        })
    }
})

export default router
