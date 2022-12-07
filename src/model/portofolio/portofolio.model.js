const pool = require("../../config/db");

const portofModel = {
    showAllPortof: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM portofolio ORDER BY app_name ASC ', (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })      
        })
    },
    insertPortof: (insertData) => {
        console.log(insertData)
        const query = {
            text: `
                INSERT INTO portofolio (
                    portofolio_id,
                    user_id,
                    app_name,
                    link_repo,
                    portofolio_type,
                    portof_img,
                    portof_img_public_id,
                    portof_img_url,
                    portof_img_secure_url
                ) VALUES (
                    $1,$2,$3,$4,$5,$6,$7,$8,$9
                )
            `,
            values: [
                insertData.portof_id,
                insertData.user_id,
                insertData.app_name,
                insertData.link_repo,
                insertData.portofolio_type,
                insertData.portof_img,
                insertData.portof_img_public_id,
                insertData.portof_img_url,
                insertData.portof_img_secure_url
            ]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },
    showReferenceUserIdPortofId: (user_id, portofolio_id) => {
        const query = {
            text: `
                    SELECT 
                        users.*,
                        portofolio.*
                    FROM 
                        users
                    INNER JOIN portofolio
                        ON users.user_id = portofolio.user_id
                    WHERE users.user_id = $1 AND portofolio.portofolio_id = $2
                    `,
            values: [user_id, portofolio_id],
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err,res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },
    showById: (portof_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM portofolio WHERE portofolio_id = '${portof_id}'`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    },
    deleteById: (portofolio_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM portofolio WHERE portofolio_id = '${portofolio_id}'`, (err, res) =>{
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                }
            )
        })
    },
    updatePortof: (updateData) => {
        const updated_at =  'now()';
        // return console.log(updateData.portof_img)
        const query = {
            text: `
                UPDATE portofolio SET
                app_name = $1,
                link_repo = $2,
                portofolio_type = $3,
                portof_img = $4,
                portof_img_public_id = $5,
                portof_img_url = $6,
                portof_img_secure_url = $7,
                updated_at = $8
                WHERE portofolio_id = $9
                `,
            values: [
                updateData.app_name,
                updateData.link_repo,
                updateData.portofolio_type,
                updateData.portof_img,
                updateData.portof_img_public_id,
                updateData.portof_img_url,
                updateData.portof_img_secure_url,
                updated_at,
                updateData.portof_id,
            ]

        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if(err) {
                    reject(err)
                } else [
                    resolve(res)
                ]
            })
        })
    },
    showByIdUserJoin: (user_id) => {
        return new Promise((resolve, reject) => {
                    
            pool.query(`
            SELECT 
                        users.*,
                        portofolio.*
                    FROM 
                        users
                    INNER JOIN portofolio
                        ON users.user_id = portofolio.user_id
                    WHERE users.user_id = '${user_id}'`, (err,res)=>{
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

}

module.exports = portofModel;