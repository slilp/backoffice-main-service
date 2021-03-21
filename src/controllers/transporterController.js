const transporterService = require('../services/transporterService');

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

module.exports = {
    getAllTransporterList
}