const db = require('../models');

async function getAll() {

    const query = await db.Transporter.findAll();

    return query;
}
module.exports = {
    getAll
}
