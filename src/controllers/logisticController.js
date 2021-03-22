const logisticService = require('../services/logisticService');

async function insertLogistic(req, res) {

    try {

        const insert = await logisticService.insert(req.body);

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

async function updateLogisticTrans(req, res) {

    try {

        const update = await logisticService.update(req.params.lid,req.body);

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

async function searchLogisticTrans(req, res) {

    try {

        const query = await logisticService.search({
                lid: req.query.lid,
                inv : req.query.inv,
                tid : req.query.tid,
                status: req.query.status
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

async function getLogisticInfo(req, res) {

    try {

        const query = await logisticService.getInfoById(req.params.lid);

        if (query) {
            return res.json({
                status: true,
                statusCode: 'PFAR-200',
                message: 'success',
                data: query
            });
        }

        return res.status(404).json({
            status: false,
            statusCode: 'PFAR-404',
            message: 'not found data',
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

// async function updateInvoiceTrans(req, res) {

//     try {

//         const update = await invoiceService.update(req.params.inv, req.body);

//         return res.json({
//             status: true,
//             statusCode: 'PFAR-200',
//             message: 'success',
//             data: update
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             statusCode: 'PFAR-500',
//             message: error.message
//         });
//     }
// }


async function deleteLogisticTrans(req, res) {

    try {

        const response = await logisticService.deleteItem(req.params.lid);

        if (response == 0) {
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


// async function invoiceSum(req, res) {

//     try {

//         const query = await invoiceService.sumStatus(req.params.status);

//         return res.json({
//             status: true,
//             statusCode: 'PFAR-200',
//             message: 'success',
//             data: query
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             statusCode: 'PFAR-500',
//             message: error.message
//         });
//     }
// }

async function countLogisticByStatus(req, res) {

    try {

        const response = await logisticService.countByStatus(req.params.status);
        
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
    insertLogistic,
    searchLogisticTrans,
    getLogisticInfo,
    deleteLogisticTrans,
    countLogisticByStatus,
    updateLogisticTrans
}