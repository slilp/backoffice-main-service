const purchaseService = require('../services/purchaseService');


async function insertNewPurchase(req, res) {

    try {

        const insert = await purchaseService.insert(req.body);

        return res.json({
            status: true,
            statusCode: 'PFAR-200',
            message: 'success',
            data: insert
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 'PFAR-500',
            message: error.message
        });
    }
}


async function searchPurchaseTrans(req, res) {

    try {

        const query = await purchaseService.search({
                name: req.query.name,
                pid: req.query.pid,
                transportType: req.query.transportType,
            },
            req.params.index,
            req.params.size
        );

        return res.json({
            status: true,
            statusCode: 'PFAR-200',
            message: 'success',
            data: query
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 'PFAR-500',
            message: error.message
        });
    }
}

async function updatePurchaseTrans(req, res) {

    try {

        const update = await purchaseService.update(req.params.pid,req.body);

        return res.json({
            status: true,
            statusCode: 'PFAR-200',
            message: 'success',
            data: update
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 'PFAR-500',
            message: error.message
        });
    }
}

module.exports = {
    insertNewPurchase,
    searchPurchaseTrans,
    updatePurchaseTrans
}