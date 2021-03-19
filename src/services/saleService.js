const db = require('../models');

async function getAll() {

    const query = await db.Sale.findAll();

    return query;
}
module.exports = {
    getAll
}
