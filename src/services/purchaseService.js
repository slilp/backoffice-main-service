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
            [Op.and]: [
                request.pid ? {
                    pid: request.pid.trim()
                } : {},
                request.transportType ? {
                    transportType: request.transportType.trim()
                } : {},
                request.status ? {
                    status: request.status.trim()
                } : {},
            ]
        },
        attributes: [
            'pid',
            'transportType',
            'revenue',
            'transportLocation',
            'status'
        ],
        include: [{
            model: db.Customer,
            as: 'customerInfo',
            where: request.name ? {
                name: {
                    [Op.like]: `%${request.name.trim()}%`
                }
            } : {},
            attributes: [
                'cid',
                'name',
                'shipToLocation'
            ],
            include: {
                model: db.Address,
                as: 'shipTo'
            }
        }, {
            model: db.Address,
            as: 'transportInfo'
        }],
        offset: size * index,
        limit: size * 1,
        order: [
            ['createdDate', 'DESC']
        ]
    });

    return query;
}


async function searchWaitingTrans(request, index, size) {

    const query = await db.Purchase.findAndCountAll({
        where: {
            [Op.and]: [
                request.pid ? {
                    pid: request.pid.trim()
                } : {},
                request.transportType ? {
                    transportType: request.transportType.trim()
                } : {},
                {
                    status: 'waiting'
                } 
            ]
        },
        attributes: [
            'pid',
            'revenue'
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
                'cid',
                'name',
            ]
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

async function purchaseBalance(id) {

    const purchaseBalance = await db.Purchase.findOne({
        where : {
            pid : id
        },attributes: [
            'revenue',
        ]});

    const sumBalance = await db.Invoice.sum('amount',{
            where: {
                pid :  id
            }
    })

    return purchaseBalance.revenue - sumBalance ;
}

async function getInfoById(id) {

    const query = await db.Purchase.findOne({
        where : {
            pid : id
        },
        include : [{
            model: db.Customer,
            as: 'customerInfo',
            attributes: [
                'cid',
                'name',
                'shipToLocation'
            ],
            include: {
                model: db.Address,
                as: 'shipTo'
            }
        }, {
            model: db.Address,
            as: 'transportInfo'
        }],
    });

    return query;
}

async function update(id, request) {

    const query = await db.Purchase.findOne({
        where: {
            pid: id
        }
    });

    const update = await query.update({
        revenue: request.revenue,
        sid: request.sale,
        transportType: request.transportType,
        transportName: request.transportName,
        transportLocationId: request.transportLocationId,
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

async function updateCompleteStatus(id){

    const query = await db.Purchase.findOne({
        where: {
            pid : id
        }
    })

    const update = await query.update({
        status : "success",
        updatedDate: new Date()
    });

    return update;
}

async function countByStatus(status){
    const response = await db.Purchase.count({
        where: {
            status : status
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
    getInfoById,
    searchWaitingTrans,
    purchaseBalance,
    updateCompleteStatus,
    countByStatus
}