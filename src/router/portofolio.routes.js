const express = require("express");
const router = express.Router();

const {
    insertPortof,
    destroyPortof,
    updatePortof,
    showByUserId,
    deleteCloudinaryTest,
    showAllPortof,
    showById
} = require("../controller/portofolio/portofolio.controller")

const uploadPortof = require("../middleware/upload.portof")
const removePortof = require("../middleware/delete.portof");

router 
    // .delete("/delete_portofolio/:id", removePortof, destroyPortof)
    .post("/insert_portofolio/:id", uploadPortof, insertPortof)
    .delete("/delete_portofolio/:id", removePortof, destroyPortof)
    .put("/update_portofolio/:id", uploadPortof, updatePortof)
    .get("/show_by_user_id/:id", showByUserId)
    .get("/detail/show_by_id/:id", showById)
    .get("/list_portof", showAllPortof)
    .delete("/delete_image_cloudinary", deleteCloudinaryTest);

    // punya delete
    // 
module.exports = router;