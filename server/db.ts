import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "asdf;lkj",
    database: "projectrevive",
    host: "localhost",
    port: 5432,
});

export default pool;
