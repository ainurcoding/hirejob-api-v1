// uuid is a function
const { v4: uuid } = require("uuid");
const { success, failed } = require("../../helper/response.helper");
const skillModel = require("../../model/skill/skill.model");
const workerModel = require("../../model/user/worker.model");


const skillController = {
    insertSkill: (req, res) => {


        const id = uuid();
        const user_id = req.params.id;
        const name_skill = req.body.name_skill;

        try {
            workerModel.showById(user_id)
                .then(async (result) => {
                    const data = result.rows[0];
                    console.log(data)
                    if (data.level_user == 3) {
                        const insertData = {
                            id,
                            user_id,
                            name_skill
                        }
                        // console.log(insertData)
                        skillModel.insertSkill(insertData)
                            .then(async () => {
                                const result = await skillModel.showSkillReferenceUser(user_id);
                                const dataUpdated = result.rows;
                                success(res, dataUpdated, "success", `success added skilss on users ${dataUpdated[0].full_name}`)
                            }).catch((err) => {
                                failed(res, err.message, "failed", "failed insert skill")
                            })
                    } else {
                        failed(res, "failed", "just worker can access this form");
                    }
                })
        } catch {
            failed(res, "error", "internal server error");
        }
    },
    deleteSkill: (req, res) => {
        const skill_id = req.params.id;

        try {
            skillModel.showSkillById(skill_id)
                .then((result) => {
                    data = result.rows[0];
                    skillModel.deleteSkill(skill_id)
                        .then(() => {
                            success(res, "success", `success deleted data with skill_id: ${data.skill_id} and name skill: ${data.name_skill}`);
                        }).catch((err) => {
                            failed(res, err.message, "failed", "failed to delete data")
                        })
                }).catch((err) => {
                    failed(res, err.message, "failed", "data not exist");
                })
        }
        catch {
            failed(res, "error", "internal server error");
        }
    },
    showSkillByUserId: (req, res) => {
        const user_id = req.params.id;
        try {
            workerModel.showById(user_id)
                .then((result) => {
                    const data = result.rows[0];
                    // console.log(data.level_user);
                    if (data.level_user == 3) {
                        console.log(user_id)
                        skillModel.showSkillByUserId(user_id)
                            .then((results) => {
                                // return console.log(results.rows);
                                success(res, results.rows, "success", `success get data skill from mr: ${data.full_name}`)
                            })
                            .catch((err) => {
                                failed(res, err.message, "failed", `failed to get data from mr: ${data.full_name}`);
                            })
                    } else {
                        failed(res, "failed", "skill data just for worker")
                    }
                }).catch((err) => {
                    failed(res, err.message, "failed", `data with id: ${user_id} not valid`)
                })

        }
        catch {
            failed(res, "error", "internal server error");
        }
    },
    showAllSkills: (req, res) => {
        try {
            skillModel.showAllSkills()
                .then((result) => {
                    success(res, result.rows, "success", `success show all skills`)
                })
                .catch((err) => {
                    failed(res, err.message, "failed", "something went wrong, fail to get data")
                })
        }
        catch (err) { 
            failed(res, err.message, "failed", "internal server error");
        }
        
    }
}

module.exports = skillController;

