const pool = require("../../config/db");


const avaModel = {
    insertAva: (data, avatar) => {
        return pool.query(
            `INSERT INTO avatar_user (ava_id, avatar, user_id) VALUES
            ($1, $2, $3)`,
            [data.id, avatar, data.user_id]
        );
    },
    updateAva: (updateData) => {
        return new Promise((resolve, reject) => {
            updated_at = 'now()';
            const query = {
                text: `UPDATE users SET 
                        avatar = $1, 
                        ava_public_id = $2, 
                        ava_url = $3, 
                        ava_secure_url = $4,
                        updated_at = $6 
                        WHERE user_id = $5`,
                values: [
                        updateData.avatar, 
                        updateData.ava_public_id, 
                        updateData.ava_url, 
                        updateData.ava_secure_url, 
                        updateData.user_id,
                        updated_at, 
                    ]
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
    getUserJoinAva: (user_id) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `
                        SELECT 
                            email,
                            users.user_id,
                            full_name,
                            phone,
                            job_desc,
                            domisli,
                            work_place,
                            personal_desc,
                            job_spec,
                            ig_acc,
                            git_account,
                            tiktok_account,
                            avatar_user.avatar
                        FROM 
                            users
                        INNER JOIN avatar_user
                            ON users.user_id = avatar_user.user_id
                        WHERE users.user_id = $1
                        `,
                values: [user_id],
            }
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    detailByUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: 'SELECT * FROM avatar_user WHERE user_id = $1',
                values: [user_id],
            }
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            })
        })
    },
    showWorkerAva: () => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `
                SELECT 
                    email,
                            users.user_id,
                            full_name,
                            email,
                            phone,
                            job_desc,
                            domisli,
                            work_place,
                            personal_desc,
                            avatar_user.avatar
                        FROM 
                            users
                        INNER JOIN avatar_user
                            ON users.user_id = avatar_user.user_id
                        `
            }
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    
}

module.exports = avaModel;