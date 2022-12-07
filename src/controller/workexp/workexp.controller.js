const { v4: uuid } = require("uuid");
const { failed, success } = require("../../helper/response.helper");
const workexpModel = require("../../model/workexp/workexp.model");
const workerModel = require("../../model/user/worker.model");


const workexpController = {
    insertWorkExp: (req, res) => {
        const user_id = req.params.id;
        const work_exp_id = uuid();

        try {
            workerModel.showById(user_id)
                .then(async (result) => {
                    const data = await result.rows[0];
                    // console.log(data)
                    if (data.level_user == 3) {
                        const insertData = {
                            work_exp_id,
                            user_id,
                            position: req.body.position,
                            company_name: req.body.company_name,
                            month_year: req.body.month_year,
                            description: req.body.description || null,

                        }
                        // console.log(insertData)
                        workexpModel.insertWorkExp(insertData)
                            .then(async (result) => {
                                // console.log("work exp id:", work_exp_id)
                                const dataInserted = await workexpModel.showById(work_exp_id);
                                // console.log(dataInserted.rows[0])
                                success(res, dataInserted.rows[0], "success", `success add work experience to worker: ${data.full_name}`)
                            })
                            .catch((err) => {
                                failed(res, "failed", "failed to add work exp")

                            })
                    } else {
                        failed(res, "failed", "only worker can access this form")
                    }
                })
        }
        catch {
            failed(res, "failed", "internal server error")
        }
    },
    showByUserId: (req, res) => {
        const user_id = req.params.id;

        try {
            workexpModel.showByUserIdJoin(user_id)
                .then(async (result) => {
                    const data = result.rows;
                    console.log(data)
                    for (let i = 0; i < data.length; i++) {
                        delete data[i].password
                    }
                    success(res, data, "success", `success get data work experience worker: ${data[0].full_name}`)
                })
                .catch((err) => {
                    failed(res, err.message, "failed", "failed to get data worker experience worker")
                })
        }
        catch {

        }
    },
    updateWorkExp: (req, res) => {
        const work_exp_id = req.params.id;
        try {
            workexpModel.showById(work_exp_id)
                .then(async (result) => {
                    // console.log(result.rows[0])
                    const data = result.rows[0];
                    // console.log(data)
                    console.log(req.body.description);
                    console.log(Object.keys(data).length)
                    if (Object.keys(data).length >= 8) {
                        const updateData = {
                            position: req.body.position || data.position,
                            company_name: req.body.company_name || data.company_name,
                            month_year: req.body.month_year || data.month_year,
                            description: req.body.description || data.description || null,
                            work_exp_id,
                        }
                        console.log(work_exp_id)
                        workexpModel.updateWorkExp(updateData)
                            .then(async (result) => {
                                console.log("inside then ", work_exp_id)
                                const data = await workexpModel.showById(work_exp_id);
                                success(res, data.rows[0], "success", `success update data from id:${work_exp_id}`)
                                // success(res, result, "success", "success update data")
                            })
                            .catch((err) => {
                                failed(res, err.message, "failed", "fail update data");
                            })

                    } else {
                        failed(res, "failed", "something went wrong");
                    }

                })
                .catch((err) => {
                    failed(res, err.message, "failed", `id: ${work_exp_id} not valid`)
                })
        }
        catch {
            failed(res, "error", "internal server error")
        }
    },
    deleteWorkExp: (req, res) => {
        const work_exp_id = req.params.id;
        try {
            workexpModel.deleteWorkExp(work_exp_id)
                .then((result) => {
                    success(res, result, "success", `id: ${work_exp_id} delete successfully`)
                })
                .catch((err) => {
                    failed(res, err.message, "failed", `fail to delete id: ${work_exp_id} please check in the database`)
                })
        }
        catch {
            failed(res, "fail", "internal server error")
        }

    }
}

module.exports = workexpController