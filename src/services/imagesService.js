const db = require("../models");
const googleService = require("../services/googleService");
const { Op } = require("sequelize");

async function insert(request) {
  
  const response = await db.Images.create(request);

  return response;
}

async function search(ref, type) {
  const query = await db.Images.findAndCountAll({
    where: {
      [Op.and]: [
        request.ref
          ? {
              ref: ref,
            }
          : {},
        request.type
          ? {
              type: type,
            }
          : {},
      ],
    },
    order: [
      ["createdDate", "DESC"],
      ["order", "ASC"],
    ],
  });

  return query;
}

async function getById(id) {
  const query = await db.Images.findOne({
    where : {
      imd : id
    }
  });

  return query;
}

async function deleteItem(id) {
  const response = await db.Images.destroy({
    where: {
      imd: id,
    },
  });

  return response;
}

module.exports = {
  insert,
  search,
  getById,
  deleteItem,
};
