require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME,
}

console.log('variables')
console.log(process.env.PORT)
console.log(process.env.MONGO_URI)
console.log(process.env.MONGO_DBNAME)

