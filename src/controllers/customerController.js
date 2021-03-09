const customerService = require('../services/customerService');


async function insertCustomer(req, res) {

    try {

        const insert = await customerService.insert(req.body);

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


async function searchCustomer(req, res) {

    try {

        const query = await customerService.search({
                name: req.query.name,
                cid: req.query.cid,
                type: req.query.type,
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

async function updateCustomer(req, res) {

    try {

        const update = await customerService.update(req.params.cid,req.body);

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
    insertCustomer,
    searchCustomer,
    updateCustomer
}