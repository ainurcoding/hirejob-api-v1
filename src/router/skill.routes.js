const express = require("express");
const router = express.Router();

const {
    insertSkill,
    deleteSkill,
    showSkillByUserId,
    showAllSkills
} = require("../controller/skill/skill.controller.js");


router
    .post("/insert_skill/:id", insertSkill)
    .delete("/delete_skill/:id", deleteSkill)
    .get("/show_by_user_id/:id", showSkillByUserId)
    .get("/list_skill", showAllSkills);

module.exports = router;
