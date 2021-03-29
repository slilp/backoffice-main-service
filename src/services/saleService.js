const db = require('../models');

async function getAll() {

    const query = await db.Sale.findAll();

    return query;
}

async function insert(request) {

    const response = await db.Sale.create(request);

    return response;
}

async function deleteItem(id) {

    const response = await db.Sale.destroy({
        where: {
            sid: id
        }
    })

    return response;
}

module.exports = {
    getAll,
    insert,
    deleteItem
}