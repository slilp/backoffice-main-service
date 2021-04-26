const transporterService = require('../services/transporterService');

async function insertTransporter(req, res) {

    try {

        const insert = await transporterService.insert(req.body);

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

async function getAllTransporterList(req, res) {

    try {
        const query = await transporterService.getAll();

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

async function deleteTransporter(req, res) {

    try {

        const response = await transporterService.deleteItem(req.params.tid);

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
    getAllTransporterList,
    insertTransporter,
    deleteTransporter
}