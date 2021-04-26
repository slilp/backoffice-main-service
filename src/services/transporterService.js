const db = require('../models');

async function getAll() {

    const query = await db.Transporter.findAll();

    return query;
}

async function insert(request) {

    const response = await db.Transporter.create(request);

    return response;
}

async function deleteItem(id) {

    const response = await db.Transporter.destroy({
        where: {
            tid: id
        }
    })

    return response;
}


module.exports = {
    getAll,
    insert,
    deleteItem
}