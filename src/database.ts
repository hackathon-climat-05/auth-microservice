import { DataSource } from "typeorm"
import User from "./entity/User"

export const dataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: process.env.NODE_ENV === "development"
})

export const entityManager = dataSource.manager
