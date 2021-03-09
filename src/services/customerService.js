const db = require('../models');
const {Op} = require('sequelize');
async function insert(request){

    const response = await db.Customer.create(request);

    return response ;
}

async function search(request,index,size){

    const query = await db.Customer.findAndCountAll({
        where:{
            [Op.and] : [
                request.cid ? {cid: request.cid.trim()} : {} ,
                request.name ? { name : {
                    [Op.like] : `%${request.name.trim()}%`
                }} : {} ,
                request.type ? { type :request.type.trim()} : {}
            ]
        }
        ,
        offset: size * index,
        limit: size * 1,
        order: [
            ['createdDate', 'DESC']
        ],
        attributes: [
            'cid',
            'name',
            'type',
            'location',
            'tel',
            'zone'
        ],
    });

    return query;
}

async function getById(id){

    const query = await db.Customer.findById(id);

    return query;
}

async function update(id,request){

    console.log(id);
    const query = await db.Customer.findOne({where:{
        cid:id
    }});

    const update = await query.update({
        name:request.name,
        type: request.type,
        tel: request.tel,
        email : request.email,
        location: request.location,
        deliveryLocation : request.deliveryLocation,
        zone: request.zone,
        updatedDate : new Date(),
        updatedBy : request.updatedBy
    });

    return update;
}

module.exports = {
    insert,
    search,
    getById,
    update
}