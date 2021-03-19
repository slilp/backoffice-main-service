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
                status : req.query.status
            },
            req.params.index,
            req.params.size
        );

        if(query.count == 0){
            return res.status(404).json({
                status: false,
                statusCode: 'PFAR-404',
                message: 'not found data',
                data: query
            });
        }

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


async function getPurchaseById(req, res) {

    try {
        const query = await purchaseService.getInfoById(req.params.pid);

        if(!query){
            return res.status(404).json({
                status: false,
                statusCode: 'PFAR-404',
                message: 'not found data',
            });
        }

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


async function deletePurchaseTrans(req, res) {

    try {

        const response = await purchaseService.deleteItem(req.params.pid);

        if(response == 0){
            return res.status(404).json({
                status: true,
                statusCode: 'PFAR-404',
                message: 'not found data',
                data: response
            });
        }
        
        return res.json({
            status: true,
            statusCode: 'PFAR-200',
            message: 'success',
            data: response
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
    updatePurchaseTrans,
    deletePurchaseTrans,
    getPurchaseById
}