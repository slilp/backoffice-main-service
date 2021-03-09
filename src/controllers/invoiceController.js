const invoiceService = require('../services/invoiceService');


async function insertInvoice(req, res) {

    try {

        const insert = await invoiceService.insert(req.body);

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


async function searchInvoiceTrans(req, res) {

    try {

        const query = await invoiceService.search({
                inv: req.query.inv,
                pid: req.query.pid,
                status: req.query.status,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
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

async function updateInvoiceTrans(req, res) {

    try {

        const update = await invoiceService.update(req.params.inv,req.body);

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


async function deleteInvoiceTrans(req, res) {

    try {

        const response = await invoiceService.deleteItem(req.params.inv);

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


async function invoiceSum(req, res) {

    try {

        const query = await invoiceService.sumStatus(req.params.status);

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


module.exports = {
    insertInvoice,
    searchInvoiceTrans,
    updateInvoiceTrans,
    deleteInvoiceTrans,
    invoiceSum
}