const mysql = require('mysql')
const {database} = require('./keys')
const {promisify} = require('util')

const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS')
        }
        if(err.code === 'ECONREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if(conn){
        conn.release()
        console.log('Database is connect')
        return ;
    }
})

pool.query = promisify(pool.query)

module.exports = pool