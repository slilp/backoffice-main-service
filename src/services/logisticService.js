const db = require('../models');
const {
    Op
} = require('sequelize');

async function insert(request) {

    const response = await db.Logistic.create(request);

    return response;
}

async function search(request, index, size) {

    const query = await db.Logistic.findAndCountAll({
        where: {
            [Op.and]: [
                request.lid ? {
                    lid: request.lid.trim()
                } : {},
                request.status ? {
                    status: request.status.trim()
                } : {},
            ]
        },
        attributes: [
            'lid',
            'deliveryDate',
            'status'
        ],
        include: {
            model: db.Invoice,
            as: 'invoiceInfo',
            where: {
                [Op.and]: [
                    request.inv ? {
                        inv: request.inv.trim()
                    } : {}
                ]
            },
            attributes: [
                'inv'
            ],
            include: {
                model: db.Purchase,
                as: 'purchaseInfo',
                attributes: [
                    'pid',
                    'transportType',
                    'transportLocation'
                ],
                include: [{
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
                },{
                    model: db.Address,
                    as: 'transportInfo'
                }]
            }
        },
        offset: size * index,
        limit: size * 1,
        order: [
            ['deliveryDate', 'DESC']
        ]
    });

    return query;
}

async function getById(id) {

    const query = await db.Logistic.findById(id);

    return query;
}

async function getInfoById(id) {
    console.log(id);
    const query = await db.Logistic.findOne({
        where: {
           lid : id
        },
        attributes: [
            'lid',
            'deliveryDate',
            'status'
        ],
        include: {
            model: db.Invoice,
            as: 'invoiceInfo',
            attributes: [
                'inv'
            ],
            include: {
                model: db.Purchase,
                as: 'purchaseInfo',
                attributes: [
                    'pid',
                    'transportType',
                    'transportLocation'
                ],
                include: [{
                    model: db.Customer,
                    as: 'customerInfo',
                    attributes: [
                        'cid',
                        'name',
                        'shipToLocation',
                        'billToLocation'
                    ],
                    include: [{
                        model: db.Address,
                        as: 'shipTo'
                    },{
                        model: db.Address,
                        as: 'billTo'
                    }]
                },{
                    model: db.Address,
                    as: 'transportInfo'
                }]
            }
        }
    });

    return query;
}

// async function update(id, request) {

//     const query = await db.Purchase.findOne({
//         where: {
//             pid: id
//         }
//     });

//     const update = await query.update({
//         revenue: request.revenue,
//         sid: request.sale,
//         transportType: request.transportType,
//         transportName: request.transportName,
//         transportLocationId: request.transportLocationId,
//         transportLocation: request.transportLocation,
//         note: request.note,
//         updatedDate: new Date(),
//         updatedBy: request.updatedBy
//     });

//     return update;
// }

async function deleteItem(id) {

    const response = await db.Logistic.destroy({
        where: {
            lid: id
        }
    })

    return response;
}

async function updateCompleteStatus(id) {

    const query = await db.Logistic.findOne({
        where: {
            lid: id
        }
    })

    const update = await query.update({
        status: "success"
    });

    return update;
}

async function countByStatus(status) {
    const response = await db.Logistic.count({
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
    // update,
    deleteItem,
    getInfoById,
    // searchWaitingTrans,
    // purchaseBalance,
    updateCompleteStatus,
    countByStatus
}