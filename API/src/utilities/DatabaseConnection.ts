import mariadb from 'mariadb'

console.log(`The port number is ${process.env.DB_PORT}`)

let port: number | undefined = parseInt(process.env.DB_PORT || '');
if (port !== port) port = undefined; 

export const Pool = mariadb.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'warlords',
    port: port,
    password: process.env.DB_PASSWORD
});