const db = require('mongoose')

module.exports = () => {db.connect(process.env.DB_URL_NONLOCAL)}
