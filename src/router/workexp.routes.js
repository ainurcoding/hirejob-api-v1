const express = require("express");
const router= express.Router();

const {
    insertWorkExp,
    showByUserId,
    updateWorkExp,
    deleteWorkExp
} = require("../controller/workexp/workexp.controller")


router
    .get("/show_by_user_id/:id", showByUserId)
    .post("/insert_workexp/:id", insertWorkExp)
    .put("/update_workexp/:id", updateWorkExp)
    .delete("/delete_workexp/:id", deleteWorkExp);

module.exports = router;