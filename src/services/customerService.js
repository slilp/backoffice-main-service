const db = require('../models');
const {
    Op
} = require('sequelize');
async function insert(request) {

    const response = await db.Customer.create(request);

    return response;
}

async function search(request, index, size) {

    const query = await db.Customer.findAndCountAll({
        where: {
            [Op.and]: [
                request.cid ? {
                    cid: request.cid.trim()
                } : {},
                request.name ? {
                    name: {
                        [Op.like]: `%${request.name.trim()}%`
                    }
                } : {},
                request.type ? {
                    type: request.type.trim()
                } : {}
            ]
        },
        offset: size * index,
        limit: size * 1,
        order: [
            ['createdDate', 'DESC']
        ],
        attributes: [
            'cid',
            'name',
            'type',
            'billToLocation',
            'tel'
        ],
        include:{
            model: db.Address,
            as:'billTo'
        }
    });

    return query;
}

async function getById(id) {

    const query = await db.Customer.findOne({
        where:{
            cid:id
        }
    });

    return query;
}

async function getInfoById(id) {

    const query = await db.Customer.findOne({
        where:{
            cid:id
        },
        include:[
            {
                model: db.Address,
                as:'billTo'
            },
            {
                model: db.Address,
                as:'shipTo'
            },
            {
                model: db.Address,
                as:'deliveryTo'
            }
        ]
    });

    return query;
}

async function update(id, request) {

    const query = await db.Customer.findOne({
        where: {
            cid: id
        }
    });

    const update = await query.update({
        name: request.name,
        type: request.type,
        tel: request.tel,
        email: request.email,
        billToLocation: request.billToLocation,
        billToLocationId: request.billToLocationId,
        shipToLocation : request.shipToLocation ,
        shipToLocationId : request.shipToLocationId ,
        deliveryLocationId: request.deliveryLocationId,
        deliveryLocation: request.deliveryLocation,
        zone: request.zone,
        updatedDate: new Date(),
        updatedBy: request.updatedBy
    });

    return update;
}

async function deleteItem(id) {

    const response = await db.Customer.destroy({
        where: {
            cid: id
        }
    })

    return response;
}

module.exports = {
    insert,
    search,
    getById,
    update,
    deleteItem,
    getInfoById
}