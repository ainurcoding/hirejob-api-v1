const {
    success,
    failed,
    succesWithToken
} = require("../../helper/response.helper");
const recruiterModel = require("../../model/user/recruiter.model");
const workerModel = require("../../model/user/worker.model");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs")
const jwtToken = require("../../helper/auth.helper");
const { registRecruiter } = require("../../model/user/recruiter.model");


const recruiterController = {
    // recruiter
    registRecruiter: async (req, res) => {
        try {
            const {
                full_name,
                email,
                company_recruiter,
                position_recruiter,
                phone,
                password
            } = req.body;
            const id = uuid();
            const level_user = '2';



            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    failed(res, err.message, "failed", "fail hash password");
                }

                const data = {
                    id,
                    level_user,
                    company_recruiter,
                    position_recruiter,
                    full_name,
                    email,
                    phone,
                    password: hash,
                };

                recruiterModel
                    .registRecruiter(data)
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
    updateDataRecruiter: async (req, res) => {
        const id = req.params.id

        try {
            workerModel.showById(id)
                .then((result) => {
                    // console.log(result.rows[0].level_user)
                    const data = result.rows[0]
                    const level_user = data.level_user;
                    const updateData = {
                        full_name: req.body.full_name || data.full_name,
                        company_recruiter: req.body.company_recruiter || data.company_recruiter,
                        business_sector_recruiter: req.body.business_sector_recruiter || data.business_sector_recruiter || null,
                        work_place: req.body.work_place || data.work_place || null,
                        job_desc: req.body.job_desc || data.job_desc || null,
                        personal_desc: req.body.personal_desc || data.personal_desc || null,
                        email: req.body.email || data.email,
                        ig_account: req.body.ig_account || data.ig_account || null,
                        phone: req.body.phone || data.phone,
                        linkedin_recruiter: req.body.linkedin_recruiter || data.linkedin_recruiter || null,
                        user_id: id,
                    }
                    console.log("update data", updateData)
                    if (level_user == 2) {
                        recruiterModel.updateDataRecruiter(updateData)
                        .then(async () => {
                            const results = await workerModel.showById(id);
                            const dataUpdated = results.rows[0];
                            delete dataUpdated.password;
                            success(res, dataUpdated, "success", "success update data")
                        }).catch((err) => {
                            failed(res, err.message, "failed", "failed to update")
                        })
                    } else {
                        failed(res, "failed", "you cannot access this form")
                    }
                })
                .catch((err) => {
                    failed(res, err.message, "failed", "data not found")
                })

            return

        }
        catch {

        }

    }, 
    showRecruiterById: (req,res) => {
        const user_id = req.params.id;

        recruiterModel.showById(user_id)
        .then((result) => {
            success(res, result.rows, "success", "success show data user")
        })
        .catch((err) => {
            failed(res, err.message, "failed", "fail to get data user")
        })
    }
}

module.exports = recruiterController;