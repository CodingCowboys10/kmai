import { Pool } from "pg";

const pool=new pool({
    host:"localhost",
    port: "5432",
    user : "my_user",
    password: "root",
    database: "my_database"

})

export default pool;