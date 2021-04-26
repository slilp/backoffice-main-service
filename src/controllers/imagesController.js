const imagesService = require("../services/imagesService");
const googleService = require("../services/googleService");

async function insertImages(req, res) {
  try {

    const path = await googleService.uploadImage(req.file);
    req.body.path = path;
    const insert = await imagesService.insert(req.body);

    return res.json({
      status: true,
      statusCode: "PFAR-200",
      message: "success",
      data: {insert,imagePath: `https://storage.googleapis.com/pfar-thai/${path}`},
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: "PFAR-500",
      message: error.message,
    });
  }
}

async function getImages(req, res) {
  try {
    const query = await imagesService.search(req.query.ref, req.query.type);
    
    if(query.count != 0){
      query.rows = query.rows.map( value => ({
        imd :  value.imd,
        path: `https://storage.googleapis.com/pfar-thai/${value.path}`
      }));
    }
    
    return res.json({
      status: true,
      statusCode: "PFAR-200",
      message: "success",
      data: query,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: "PFAR-500",
      message: error.message,
    });
  }
}


async function deleteImage(req, res) {
  try {
    
    const info = await imagesService.getById(req.params.imd);
    const r = await googleService.deleteImage(info.path);
    const response = await imagesService.deleteItem(req.params.imd);

    if (response == 0) {
      return res.status(404).json({
        status: true,
        statusCode: "PFAR-404",
        message: "not found data",
        data: response,
      });
    }

    return res.json({
      status: true,            
      statusCode: "PFAR-200",
      message: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: "PFAR-500",
      message: error.message,
    });
  }
}

module.exports = {
    insertImages,
    deleteImage,
    getImages
};
