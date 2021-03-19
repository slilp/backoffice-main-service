const saleService = require('../services/saleService');

async function getAllSaleList(req, res) {

    try {
        const query = await saleService.getAll();

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
    getAllSaleList
}