const pool = require("../../config/db")

const workexpModel = {
    insertWorkExp: (insertData) => {
        // console.log("model",insertData);
        const query = {
            text: `
                INSERT INTO work_exp (
                    work_exp_id,
                    user_id,
                    position,
                    company_name,
                    month_year,
                    description
                ) VALUES (
                    $1, $2, $3, $4, $5, $6
                )
            `,
            values: [
                insertData.work_exp_id,
                insertData.user_id,
                insertData.position,
                insertData.company_name,
                insertData.month_year,
                insertData.description
            ]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(reject)
                }
            })
        })
    },
    showById: (work_exp_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM work_exp WHERE work_exp_id = '${work_exp_id}'`, (err, res) => {
                if (err) {
                    reject(err) 
                } else {
                    resolve(res)
                }
            })
        })
    },
    showByUserIdJoin: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT 
                    users.*,
                    work_exp.*
                FROM 
                    users
                INNER JOIN 
                    work_exp 
                ON 
                    users.user_id = work_exp.user_id
                WHERE users.user_id = '${user_id}'
            `, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },
    updateWorkExp: (updateData) => {
        const updated_at = 'now()';
        console.log("model", updateData)
        const query = {
            text: `
                UPDATE work_exp SET 
                position = $1,
                company_name = $2,
                month_year = $3,
                description = $4,
                updated_at = $5
                WHERE work_exp_id = $6
            `,
            values: [
                updateData.position,
                updateData.company_name,
                updateData.month_year,
                updateData.description,
                updated_at,
                updateData.work_exp_id
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
    deleteWorkExp: (work_exp_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM work_exp WHERE work_exp_id ='${work_exp_id}'`, (err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
}

module.exports = workexpModel;