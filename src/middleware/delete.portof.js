const fs = require("fs");
const { moveMessagePortToContext } = require("worker_threads");
const portofModel = require("../model/portofolio/portofolio.model");
const cloudinary = require("../helper/cloudinary");

const removePortof = async (req, res, next) => {
  const portof_id = req.params.id;
  
  
  const data = await portofModel.showById(portof_id);
  const public_id = data.rows[0].portof_img_public_id;
  // return console.log(data.rows[0].portof_img_public_id)
//   console.log("ini di remove");
  
  
try {
  // untuk delete gunakan public id dari image
  console.log(public_id)
  await cloudinary.uploader.destroy(public_id);
  next();
}
catch (err) {
  return(err);
}
};

module.exports = removePortof;