const db = require('../models');

async function getAll() {

    const query = await db.Sale.findAll();

    return query;
}

async function insert(request) {

    const response = await db.Sale.create(request);

    return response;
}

module.exports = {
    getAll,
    insert
}