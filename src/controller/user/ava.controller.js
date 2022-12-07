const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const { success, failed } = require("../../helper/response.helper");
const avaModel = require("../../model/user/ava.model")
const cloudinary = require("../../helper/cloudinary");
const workerModel = require("../../model/user/worker.model");

const avaController = {
    insertAva: (req, res) => {
        try {
            const { user_id } = req.body;
            const id = uuid()
            let avatar;

            if (req.file) {
                avatar = req.file.filename;
            }

            const data = {
                id,
                user_id
            };

            avaModel
                .insertAva(data, avatar)
                .then(async () => {
                    console.log(req.file.filename);
                    const result = await avaModel.getUserJoinAva(user_id);
                    success(res, result.rows[0], "success", "data has been inserted");
                })
                .catch((err) => {

                    failed(res, err.message, "failed", "internal server error");
                });
        }
        catch (err) {
            failed(res, err.message, "failed", "internal server error");
        }
    },
    updateAvaCloud: async (req, res) => {
        try {
            const user_id = req.params.id;
            let avatar;

            if (req.file) {
                avatar = await cloudinary.uploader.upload(req.file.path);
            }
            console.log("avatar");
            
            workerModel.showById(user_id)
                .then(async (result) => {
                    const data = await result.rows[0];
                    if (data.ava_public_id) {
                        const public_id = data.ava_public_id;
                        await cloudinary.uploader.destroy(public_id);
                    }
                    const updateData = {
                        user_id,
                        avatar,
                        ava_public_id: avatar.public_id || data.ava_public_id,
                        ava_url: avatar.url || data.ava_url,
                        ava_secure_url: avatar.secure_url || data.ava_secure_url
                    }
                    console.log("updateData",updateData)

                    avaModel
                        .updateAva(updateData)
                        .then(async () => {
                            console.log(avatar);
                            console.log('lolos controller')
                            const result = await workerModel.showById(user_id);
                            success(res, result.rows[0], "success", "data has been update");
                        })
                        .catch((err) => {
                            failed(res, err.message, "failed", "failed to update data, something went wrong")
                        })

                })
                .catch ((err) => {
                    failed(res, err.message, "failed", `user id: ${user_id} not valid`);
                })
        } catch (err) {
            failed(res, err.message, "failed", "internal server error");
        }
    },
    showWorkerAva: (req, res) => {
        try {
            avaModel
                .showWorkerAva()
                .then((results) => {
                    success(res, results, "success", "success get data");
                })
                .catch((err) => {
                    failed(res, err.message, "failed", "internal server error");
                })
        }
        catch {
            failed(res, err.message, "failed", "internal server error");
        }
    },
    showById: (req, res) => {
        user_id = req.params.id;

        try {
            avaModel
                .getUserJoinAva(user_id)
                .then((results) => {
                    success(res, results, "success", "success get data");
                })
                .catch((err) => {
                    failed(res, err.message, "failed", "internal server error");
                })
        }
        catch {
            failed(res, err.message, "failed", "internal server error");
        }

    }
}

module.exports = avaController;