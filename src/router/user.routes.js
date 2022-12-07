const express = require("express");
const router = express.Router();

const {
    showAllWorker,
    registWorker,
    login,
    checkPhone,
    updateAva,
    updateDataWorker,
    showWorkerById,
    deleteUser,
    workerSearch
} = require("../controller/user/worker.controller.js")

const {
    updateAvaCloud
} = require ("../controller/user/ava.controller")

const {
    registRecruiter,
    updateDataRecruiter,
    showRecruiterById
} = require ("../controller/user/recruiter.controller.js")

// const { insertAva, updateAva, showWorkerAva, showById } = require("../controller/user/ava.controller.js")

const  uploadAva  = require("../middleware/upload.ava.js");
const removeAva = require("../middleware/delete.ava.js");


router 
    .get("/list", showAllWorker)
    .get("/recruiter/show_by_id/:id", showRecruiterById)
    .get("/worker/show_by_id/:id", showWorkerById)
    .get("/worker/search", workerSearch)
    .get("/checkphone", checkPhone)
    .post("/register_worker", registWorker)
    .post("/register_recruiter", registRecruiter)
    .post("/login", login)
    .put("/update_ava1/:id", uploadAva, updateAva)
    .put("/update_ava2/:id", removeAva, uploadAva, updateAva)
    .put("/update_ava_cloudinary/:id", uploadAva, updateAvaCloud)
    .put("/update_worker_data/:id", updateDataWorker)
    .put("/update_recruiter_data/:id", updateDataRecruiter)
    .delete("/delete_user/:id", deleteUser);


module.exports = router;