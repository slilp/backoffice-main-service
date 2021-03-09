const db = require('../models');
const {
    Op
} = require('sequelize');

async function insert(request) {

    const response = await db.Purchase.create(request);

    return response;
}

async function search(request, index, size) {

    const query = await db.Purchase.findAndCountAll({
        where: {
            [Op.and] : [
                request.pid ? {
                    pid: request.pid.trim()
                } : {} ,
                request.transportType ? {
                    transportType: request.transportType.trim()
                } : {},
            ]
        },
        attributes: [
            'pid',
            'transportType'
        ],
        include: {
            model: db.Customer,
            as: 'customerInfo',
            where: request.name ? {
                name: {
                    [Op.like]: `%${request.name.trim()}%`
                }
            } : {},
            attributes: [
                'name',
                'deliveryLocation',
                'location'
            ],
        },
        offset: size * index,
        limit: size * 1,
        order: [
            ['createdDate', 'DESC']
        ]
    });

    return query;
}



async function getById(id) {

    const query = await db.Purchase.findById(id);

    return query;
}

async function update(id, request) {

    console.log(id);
    const query = await db.Purchase.findOne({
        where: {
            pid: id
        }
    });

    const update = await query.update({
        revenue: request.revenue,
        sale: request.sale,
        transportType: request.transportType,
        transportName: request.transportName,
        transportLocation: request.transportLocation,
        note: request.note,
        updatedDate: new Date(),
        updatedBy: request.updatedBy
    });

    return update;
}

async function deleteItem(id) {

    const response = await db.Purchase.destroy({
        where: {
            pid: id
        }
    })

    return response;
}

module.exports = {
    insert,
    search,
    getById,
    update,
    deleteItem
}