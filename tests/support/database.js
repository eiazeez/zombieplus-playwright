const {Pool} = require('pg')

const DbConfig = {
    user: 'rkmwkxfm',
    host: 'isabelle.db.elephantsql.com',
    database: 'rkmwkxfm',
    password: 'A018wlti18cNqkVqnWuTjLTnGgxVKRZ_',
    port: 5432,
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch(error) {
        console.error('Erro ao executar SQL' + error)
    }
    
}