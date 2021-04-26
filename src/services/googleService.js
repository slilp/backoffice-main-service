const { multer } = require('../middleware/melter');
const {Storage} = require('@google-cloud/storage');
const jsonkey = require('../../pfar-thai-3bb4464378ea.json');
const {format} = require('util');
const gc = new Storage({
  credentials: jsonkey
});

const bucket = gc.bucket("pfar-thai");

async function uploadImage(file) {

    // if (!req.files || req.files.length == 0) {
    //   return "";
    // }
  
    // Create a new blob in the bucket and upload the file data.
    const fileName = `${Date.now()}`;
    // const fileName = `${Date.now()}${file.originalname}`;
    const blob = bucket.file(fileName);

    return new Promise((resolve,reject)=>{
      const blobStream = blob.createWriteStream();
  
      blobStream.on('error', err => {
        reject(error);
      });
      let publicUrl = "";
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        publicUrl = format(
          `https://storage.googleapis.com/${'pfar-thai'}/${blob.name}`
        );
        resolve(fileName);
      });
    
      blobStream.end(file.buffer);
  
    });
};

async function deleteImage(path){

  const blob = bucket.file(path);

  const result = await blob.delete();

  return  result;
}


module.exports = {
    uploadImage,
    deleteImage
}