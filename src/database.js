import {Pool} from 'pg';


export const pool = new Pool({
    host: 'localhost',
    database : 'BDExamen',
    user : 'postgres',
    password :'root',
    port: 5432
})