import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import jwt from "jsonwebtoken"
import { entityManager } from "../database"

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    google_user_id?: string

    @Column()
    google_access_token?: string

    @Column()
    google_refresh_token?: string

    @Column()
    google_expiry_date?: number

    async getJWT(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign({
                sub: this.id
            }, process.env.JWT_SECRET, {
                algorithm: 'HS512'
            }, (err, token) => {
                if (err)
                    return reject(err)

                resolve(token)
            })
        })
    }

    static async verifyJWT(token: string): Promise<User> {
        const decoded = await new Promise<jwt.JwtPayload>((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err)
                    return reject(err)

                if (typeof decoded === "string")
                    return reject(decoded)

                resolve(decoded)
            })
        })

        const user = await entityManager.createQueryBuilder(User, "user")
            .where("user.id = :id", { id: decoded.sub })
            .getOneOrFail()

        return user
    }
}
