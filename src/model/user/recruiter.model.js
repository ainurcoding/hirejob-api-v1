const { query } = require("express");
const pool = require("../../config/db");

const recruiterModel = {
    showAllWorker: () => {
        return new Promise((resolve, reject) => {
            let query = {
                text: `SELECT * FROM users ORDER BY full_name ASC`,
            }
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    showById: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM users WHERE user_id = '${user_id}'`,
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
    registRecruiter: (data) => {
        return new Promise((resolve, reject) => {
            let query = {
                text: `INSERT INTO USERS
                        (
                            user_id,
                            full_name,
                            email,
                            phone,
                            password,
                            company_recruiter,
                            position_recruiter,
                            level_user
                        )
                        VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8
                        )
                `,
                values: [
                    data.id, 
                    data.full_name, 
                    data.email, 
                    data.phone, 
                    data.password, 
                    data.company_recruiter, 
                    data.position_recruiter, 
                    data.level_user
                ]
            };
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM users WHERE email ='${email}'`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result);
                }
            )
        })
    },
    
    checkPhone: (phone) => {
        console.log(phone)
        return new Promise((resolve, reject) => {
            pool.query (
                `SELECT  * FROM users where phone = '${phone}'`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result);
                }
            )
        })
    },
    updateAva: (user_id, avatar) => {
        return new Promise((resolve, reject) => {
            const updated_at = 'now()';
            const query = {
                text: 'UPDATE users SET avatar = $1, updated_at = $2 WHERE user_id = $3',
                values: [avatar, updated_at, user_id]
            }
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err)
                }
                console.log('lolos model');
                resolve(res)
            })
        })
    },
    updateDataRecruiter: (updatedData) => {
        return new Promise((resolve, reject) => {
            console.log("sampe di model")
            const updated_at = 'now()';
            const query = {
                text: `UPDATE users SET
                    company_recruiter = $1,
                    business_sector_recruiter = $2,
                    work_place = $3,
                    email = $4,
                    ig_account = $5,
                    phone = $6,
                    linkedin_recruiter = $7,
                    personal_desc = $8,
                    updated_at = $9,
                    full_name = $10
                    WHERE user_id = $11
                `,
                values: [
                    updatedData.company_recruiter, 
                    updatedData.business_sector_recruiter, 
                    updatedData.work_place, 
                    updatedData.email,
                    updatedData.ig_account,
                    updatedData.phone,
                    updatedData.linkedin_recruiter,
                    updatedData.personal_desc,
                    updated_at,
                    updatedData.full_name,
                    updatedData.user_id,
                ],
            }
            pool.query(query, (err, res) => {
                if(err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    
}

module.exports = recruiterModel;