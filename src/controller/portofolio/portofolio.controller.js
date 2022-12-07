const { v4: uuid } = require("uuid");
const { failed, success } = require("../../helper/response.helper");
const portofModel = require("../../model/portofolio/portofolio.model");
const workerModel = require("../../model/user/worker.model");
const cloudinary = require("../../helper/cloudinary");



const portofController = {
    showAllPortof: (req, res) => {
        console.log("test")
        portofModel.showAllPortof()
            .then((result) => {
                const data = result.rows;
                for (let i = 0; i < data.length; i++) {
                    const asset_image = data[i].portof_img.asset_id;
                    if (asset_image) {
                        console.log(asset_image)
                    }

                }

                success(res, result, "success", "success get all data")
            }).catch((err) => {
                failed(res, err.message, "failed", "failed to get all portofolio data")
            })
    },
    insertPortof: async (req, res) => {
        const portof_id = uuid();
        const user_id = req.params.id;
        const portof_img = await cloudinary.uploader.upload(req.file.path);
        try {
            // return (console.log(portof_img))
            console.log(portof_img.asset_id);
            workerModel.showById(user_id)
                .then(async (result) => {
                    const data = result.rows[0];
                    console.log(data)
                    const level_user = data.level_user;

                    console.log(portof_img);
                    const {
                        app_name,
                        link_repo,
                        portofolio_type,
                    } = req.body;
                    if (level_user == 3) {
                        const insertData = {
                            portof_id,
                            user_id,
                            portof_img,
                            app_name,
                            link_repo,
                            portofolio_type,
                            portof_img_public_id: portof_img.public_id,
                            portof_img_url: portof_img.url,
                            portof_img_secure_url: portof_img.secure_url,
                        }
                        console.log(insertData)
                        portofModel.insertPortof(insertData)
                            .then(async () => {

                                const result = await portofModel.showReferenceUserIdPortofId(user_id, portof_id)
                                // console.log(result.rows[])
                                const data = result.rows;
                                // console.log(data[0].full_name);
                                delete data[0].password;
                                success(res, data, "success", `added new data portofolio for mr: ${data[0].full_name}`)
                            }).catch((err) => {
                                failed(res, err.message, "failed", "failed to insert data")
                            })
                    } else {
                        failed(res, "failed", "only worker can access this form")
                    }
                })
        }
        catch (err) {
            failed(res, err.message, "failed", "internal server error");
        }

    },
    destroyPortof: (req, res) => {
        const portofolio_id = req.params.id;



        try {
            portofModel.showById(portofolio_id)
                .then((results) => {
                    const data = results.rows;
                    portofModel.deleteById(portofolio_id)
                        .then((results) => {
                            success(res, results, "success", `data image: ${data[0].portof_img} deleted successfully`)
                        }).catch((err) => {
                            failed(res, err.message, "failed", "fail to delete data")
                        })
                }).catch((err) => {
                    failed(res, err.message, "failed", `id: ${portofolio_id} not valid`)
                })
        }
        catch {
            failed(res, "failed", "internal server error");
        }
    },
    updatePortof: async (req, res) => {
        const portof_id = req.params.id;
        // data Before Update

        portofModel.showById(portof_id)
            .then(async (result) => {
                // return console.log(result.rows[0])
                const data = result.rows[0];
                let portof_img_update;
                // console.log(data)
                if (req.file) {
                    if (data.portof_img_public_id) {
                        const public_id = data.portof_img_public_id;
                        console.log("ini public id", public_id)
                        try {
                            if(public_id) {
                                await cloudinary.uploader.destroy(public_id);
                            }
                            
                        }
                        catch (err) {
                            failed(res, err.message, "failed", "something went wrong, fail delete file in cloudinary")
                        }
                    }
                    portof_img_update = await cloudinary.uploader.upload(req.file.path);
                    
                } else {
                    console.log("no")
                }
                console.log(portof_img_update);
                console.log("portof img update", portof_img_update)
                let portof_img, portof_img_public_id, portof_img_url, portof_img_secure_url;
                if(portof_img_update !== undefined) {
                    portof_img = portof_img_update
                    portof_img_public_id = portof_img_update.public_id
                    portof_img_url = portof_img_update.url
                    portof_img_secure_url = portof_img_update.secure_url
                } else {
                    portof_img = data.portof_img
                    portof_img_public_id = data.portof_img_public_id
                    portof_img_url = data.portof_img_url
                    portof_img_secure_url = data.portof_img_secure_url
                }
                const updateData = {
                    app_name: req.body.app_name || data.app_name || null,
                    link_repo: req.body.link_repo || data.link_repo || null,
                    portofolio_type: req.body.portofolio_type || data.portofolio_type || null,
                    portof_img,
                    portof_img_public_id,
                    portof_img_url,
                    portof_img_secure_url,
                    portof_id
                }
                portofModel.updatePortof(updateData)
                    .then(async () => {
                        const result = await portofModel.showById(portof_id);
                        success(res, result.rows[0], "success", "success update data");
                    })
                    .catch((err) => {
                        failed(res, err.message, "failed", "fail to update data")
                    })
            })
            .catch((err) => {
                failed(res, err.message, "failed", "data not valid")
            })


        // let portof_img;
        // if (req.path.file) {
        //     portof_img = await cloudinary.uploader.upload(req.file.path).then((result) => { console.log(result) });
        // } else {

        // }


        // try {
        //     portofModel.showById(portofolio_id)
        //         .then((result) => {
        //             const data = result.rows[0];
        //             const user_id = data.user_id;
        //             const updateData = {
        //                 app_name: req.body.app_name || data.app_name || null,
        //                 link_repo: req.body.link_repo || data.link_repo || null,
        //                 portofolio_type: req.body.portofolio_type || data.portofolio_type || null,
        //                 portof_img: portof_img || dataBU.portof_img,

        //                 portofolio_id,
        //                 user_id,
        //             }
        //             console.log(updateData.portof_img)
        //             portofModel.updatePortof(updateData)
        //                 .then(async () => {
        //                     const result = await portofModel.showById(portofolio_id);
        //                     success(res, result.rows[0], "success", "success update data");
        //                 })
        //                 .catch((err) => {
        //                     failed(res, err.message, "failed", "fail to update data")
        //                 })

        //         })
        //         .catch((err) => {
        //             failed(res, err.message, "failed", "data not valid")
        //         })
        // }
        // catch {

        // }
    },
    showByUserId: (req, res) => {
        const user_id = req.params.id;

        try {
            workerModel.showById(user_id)
                .then((result) => {
                    // return console.log(portof_img);
                    const data = result.rows[0];
                    const level_user = data.level_user;
                    if (level_user == 3) {
                        portofModel.showByIdUserJoin(user_id)
                            .then(async (result) => {
                                const data = result.rows;
                                console.log(data.length)
                                for (let i = 0; i < data.length; i++) {
                                    delete data[i].password;
                                }
                                // delete data[0].password;
                                success(res, data, "success", "success get data")
                            })
                            .catch((err) => {
                                failed(res, err.message, "failed", "failed to update data");
                            })

                    } else {
                        failed(res, "failed", "only worker can access this data")
                    }
                })
        }
        catch {
            failed(res, "failed", "internal server error")
        }
    },
    deleteCloudinaryTest: async (req, res) => {
        try {
            // untuk delete gunakan public id dari image
            await cloudinary.uploader.destroy('noc3kg2mtivleday1fko');
        }
        catch (err) {
            console.log(err);
        }
    },
    showById: async (req, res) => {
        const portof_id = req.params.id;
        await portofModel.showById(portof_id)
            .then((result) => [
                success(res, result.rows[0], "success", `success get data by id: ${portof_id}`)
            ])
            .catch((err) => {
                failed(res, err.message, "failed", `failed to get data by id: ${portof_id}`)
            })
    }
}

module.exports = portofController;