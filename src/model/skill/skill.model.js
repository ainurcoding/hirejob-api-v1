const pool = require("../../config/db");

const skillModel = {
    insertSkill: (data) => {
        
        console.log(data)
        console.log("ini di model insert")
        const query = {
            text: `
                INSERT INTO skills (
                    skill_id,
                    name_skill,
                    user_id
                ) VALUES (
                    $1, $2, $3
                )
            `,
            values: [data.id, data.name_skill, data.user_id]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    },
    showAllSkills: () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM skills ORDER BY name_skill ASC", (err, res) =>{
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    },
    showSkillById: (skill_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM skills WHERE skill_id = '${skill_id}'`, (err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })      
        })
    },
    showSkillReferenceUser: (user_id) => {
        const query = {
            text: `
                    SELECT 
                        users.*,
                        skills.name_skill,
                        skills.skill_id
                    FROM 
                        users
                    INNER JOIN skills
                        ON users.user_id = skills.user_id
                    WHERE users.user_id = $1
                    `,
            values: [user_id],
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
    deleteSkill: (skill_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM skills WHERE skill_id = '${skill_id}'`, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    },
    showSkillByUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM skills WHERE user_id = '${user_id}'`, (err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

}

module.exports = skillModel;