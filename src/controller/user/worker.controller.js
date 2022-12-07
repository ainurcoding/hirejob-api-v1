const {
    success,
    failed,
    succesWithToken
} = require("../../helper/response.helper");
const workerModel = require("../../model/user/worker.model");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs")
const jwtToken = require("../../helper/auth.helper");

const workerModelController = {
    showAllWorker: (req, res) => {
        try {
            workerModel
                .showAllWorker()
                .then((results) => {
                    success(res, results, "success", "success get data");
                })
                .catch((err) => {
                    failed(res, err.message, "failed", "internal server error");
                })
        } catch (err) {
            failed(res, err.message, "failed", "internal server error");
        }


    },
    workerSearch: async (req, res) => {
        const {field, value} = req.query;
        
        const results = await workerModel.workerSearch(field, value);
        success(res, results, "success", "success get data");

    },
    registWorker: (req, res) => {
        try {
            const {
                full_name,
                email,
                phone,
                password
            } = req.body;
            const id = uuid();
            const level_user = '3';



            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    failed(res, err.message, "failed", "fail hash password");
                }

                const data = {
                    id,
                    level_user,
                    full_name,
                    email,
                    phone,
                    password: hash,
                };

                workerModel
                    .registWorker(data)
                    .then(() => {
                        delete data.password;
                        success(res, data, "success", "register success");
                    })
                    .catch((err) => {
                        failed(res, err.message, "failed", "register fail");
                    });
            });
        } catch (err) {
            failed(res, err.message, "failed", "internal server error");
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        workerModel
            .checkEmail(email)
            .then((result) => {
                const user = result.rows[0];
                if (result.rowCount > 0) {
                    bcrypt
                        .compare(password, result.rows[0].password)
                        .then(async (result) => {
                            if (result) {
                                const token = await jwtToken({
                                    id: user.user_id,
                                    email: user.email,
                                });

                                delete user.password;

                                succesWithToken(
                                    res,
                                    { token, data: user },
                                    "success",
                                    "login success"
                                );
                            } else {
                                // password wrong
                                failed(res, null, "failed", "email or password is wrong");
                            }
                        });
                } else {
                    // username wrong
                    failed(res, null, "failed", "username wrong");
                }
            })
            .catch((err) => {
                failed(res, err, "failed", "internal server error");
            });
    },
    checkPhone: async (req, res) => {
        const { phone } = req.body;

        workerModel
            .checkPhone(phone)
            .then((result) => {
                success(res, result.rows, "success", "data nomer ada")
            })
            .catch((err) => {
                failed(res, err, "failed", "internal server error")
            })
    },
    updateAva: async (req, res) => {
        try {
            const user_id = req.params.id;

            if (req.file) {
                avatar = req.file.filename;
            } else {
                failed(res, null, "failed", "image cannot be null")
            }

            workerModel
                .updateAva(user_id, avatar)
                .then(async () => {
                    console.log(req.file.filename);
                    console.log('lolos controller')
                    const result = await workerModel.showById(user_id);
                    success(res, result.rows[0], "success", "data has been update");
                })
        } catch (err) {
            failed(res, err.message, "failed", "internal server error");
        }
    },
    updateDataWorker: async (req, res) => {
        const user_id = req.params.id;
        workerModel
            .showById(user_id)
            .then((async (result) => {
                const data = result.rows[0]

                if (data.level_user == 3) {
                    const updatedData = {
                        full_name: req.body.full_name || data.full_name,
                        job_desc: req.body.job_desc || data.job_desc || null,
                        job_type: req.body.job_type || data.job_type || null,
                        domisli: req.body.domisli || data.domisli || null,
                        work_place: req.body.work_place || data.work_place || null,
                        personal_desc: req.body.personal_desc || data.personal_desc || null,
                        job_spec: req.body.job_spec || data.job_spec || null,
                        ig_account: req.body.ig_account || data.ig_account || null,
                        git_account: req.body.git_account || data.git_account || null,
                        gitlab_account: req.body.gitlab_account || data.gitlab_account || null,
                        user_id: req.params.id
                    }

                    workerModel
                        .updateDataWorker(updatedData)
                        .then(async () => {
                            console.log("sampe di controller")
                            const result = await workerModel.showById(user_id);
                            success(res, result.rows[0], "success", "data has been updated")
                        })
                        .catch((err) => {
                            failed(res, err.message, "failed", "fail to update data")
                        })
                } else {
                    failed(res, "failed", "only worker can access this form")
                }



            }))
            .catch((err) => {
                failed(err, err.message, "failed", "internal server error")
            })

    },
    showWorkerById: (req, res) => {
        const user_id = req.params.id;

        workerModel.showById(user_id)
            .then((result) => {
                success(res, result.rows, "success", "success get data worker")
            })
            .catch((err) => {
                failed(res, err.message, "failed", "failed to get data worker")
            })
    },
    deleteUser: async (req, res) => {
        const user_id = req.params.id;

        workerModel.deleteUser(user_id)
        .then((result) => {
            success(res, result, "succes", `success delete data id:${user_id}`)
        })
        .catch((err) => {
            failed(res, err.message, "failed", `fail to delete data id:${user_id}`)
        })
    }


}


module.exports = workerModelController;
