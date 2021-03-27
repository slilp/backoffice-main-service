const db = require('../models');
const {
    Op
} = require('sequelize');

async function insert(request) {

    const response = await db.Invoice.create(request);

    return response;
}

async function search(request, index, size) {

    const query = await db.Invoice.findAndCountAll({
        where: {
            [Op.and]: [
                request.inv ? {
                    inv: request.inv.trim()
                } : {},
                request.status ? {
                    status: request.status.trim()
                } : {},
            ]
        },
        attributes: [
            'inv',
            'pid',
            'invoiceDate',
            'amount',
            'status'
        ],
        include: {
            model: db.Purchase,
            as: 'purchaseInfo',
            where: request.pid ? {
                pid: request.pid.trim()
            } : {},
            attributes: [
                'pid'
            ],
            include: {
                model: db.Customer,
                attributes: [
                    'name',
                    'cid'
                ],
                as: 'customerInfo'
            }
        },
        offset: size * index,
        limit: size * 1,
        order: [
            ['invoiceDate', 'DESC']
        ]
    });

    return query;
}



async function getById(id) {

    const query = await db.Invoice.findById(id);

    return query;
}


async function getInfo(id) {
    const query = await db.Invoice.findOne({
        where: {
            inv: id.trim()
        },
        attributes: [
            'inv',
            'pid',
            'invoiceDate',
            'amount',
            'status',
            'channel'
        ],
        include: {
            model: db.Purchase,
            as: 'purchaseInfo',
            attributes: [
                'pid'
            ],
            include: {
                model: db.Customer,
                attributes: [
                    'name',
                    'cid'
                ],
                as: 'customerInfo'
            }
        }
    });

    return query;
}


async function update(id, request) {

    const query = await db.Invoice.findOne({
        where: {
            inv: id
        }
    });

    const update = await query.update({
        amount: request.amount,
        status: request.status,
        invoiceDate: request.invoiceDate,
        channel: request.channel,
        pid: request.pid,
        images: request.images,
        updatedDate: new Date(),
        updatedBy: request.updatedBy
    });

    return update;
}


async function deleteItem(id) {
    const response = await db.Invoice.destroy({
        where: {
            inv: id.trim()
        }
    })

    return response;
}

async function sumStatus(status) {
    const response = await db.Invoice.sum('amount', {
        where: {
            status: status
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
    sumStatus,
    getInfo
}