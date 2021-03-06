const db = require("../models");
const { Op } = require("sequelize");

async function insert(request) {
  const response = await db.Logistic.create(request);

  return response;
}

async function search(request, index, size) {
  const query = await db.Logistic.findAndCountAll({
    where: {
      [Op.and]: [
        request.status
          ? {
              status: request.status.trim(),
            }
          : {},
        request.tid
          ? {
              tid: request.tid,
            }
          : {},
        request.inv
          ? {
              inv: request.inv,
            }
          : {},
      ],
    },
    attributes: ["lid", "inv", "deliveryDate", "status", "tid"],
    include: [
      {
        model: db.Purchase,
        as: "purchaseInfo",
        where: request.pid
        ? {
            pid: request.pid,
          }
        : {},
        attributes: ["pid", "transportType"],
        include: [
          {
            model: db.Customer,
            as: "customerInfo",
            attributes: ["cid", "name"],
          },
        ],
      },
      {
        model: db.Transporter,
        as: "transporterInfo",
        attributes: ["tid", "firstName", "lastName"],
      },
    ],
    offset: size * index,
    limit: size * 1,
    order: [["deliveryDate", "DESC"]],
  });

  return query;
}

async function getById(id) {
  const query = await db.Logistic.findById(id);

  return query;
}

async function getInfoById(id) {
  const query = await db.Logistic.findOne({
    where: {
      lid: id,
    },
    attributes: ["lid", "inv", "deliveryDate", "status"],
    include: {
      model: db.Purchase,
      as: "purchaseInfo",
      attributes: ["pid", "transportType", "transportLocation"],
      include: [
        {
          model: db.Customer,
          as: "customerInfo",
          attributes: ["cid", "name", "shipToLocation", "billToLocation"],
          include: [
            {
              model: db.Address,
              as: "shipTo",
            },
            {
              model: db.Address,
              as: "billTo",
            },
          ],
        },
        {
          model: db.Address,
          as: "transportInfo",
        },
      ],
    },
  });

  return query;
}

async function update(id, request) {
  const query = await db.Logistic.findOne({
    where: {
      lid: id,
    },
  });

  const update = await query.update({
    inv: request.inv,
    deliveryDate: request.deliveryDate,
    status: request.status,
    updatedDate: new Date(),
    updatedBy: request.updatedBy,
  });

  return update;
}

async function deleteItem(id) {
  const response = await db.Logistic.destroy({
    where: {
      lid: id,
    },
  });

  return response;
}

async function updateCompleteStatus(id) {
  const query = await db.Logistic.findOne({
    where: {
      lid: id,
    },
  });

  const update = await query.update({
    status: "success",
  });

  return update;
}

async function countByStatus(status) {
  const response = await db.Logistic.count({
    where: {
      status: status,
    },
  });

  return response;
}

module.exports = {
  insert,
  search,
  getById,
  update,
  deleteItem,
  getInfoById,
  // searchWaitingTrans,
  // purchaseBalance,
  updateCompleteStatus,
  countByStatus,
};
