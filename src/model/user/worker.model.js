const { query } = require("express");
const pool = require("../../config/db");

const workerModel = {
  showAllWorker: () => {
    return new Promise((resolve, reject) => {
      let query = {
        text: `SELECT * FROM users ORDER BY full_name ASC`,
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  workerSearch: (field, value) => {
    return new Promise((resolve, reject) => {
      

      let query = {
        text: `SELECT * FROM users WHERE level_user = 3 AND ${field} ilike '%${value}%'  ORDER BY full_name ASC`,
      }
      pool.query(query, (err, res) => {
        err ? reject(err) : resolve(res);
      })
    })
  },
  showById: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE user_id = '${user_id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  registWorker: (data) => {
    return new Promise((resolve, reject) => {
      let query = {
        text: `INSERT INTO USERS
                        (
                            user_id,
                            full_name,
                            email,
                            phone,
                            password,
                            level_user
                        )
                        VALUES (
                            $1, $2, $3, $4, $5, $6
                        )
                `,
        values: [
          data.id,
          data.full_name,
          data.email,
          data.phone,
          data.password,
          data.level_user,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email ='${email}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  checkPhone: (phone) => {
    console.log(phone);
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT  * FROM users where phone = '${phone}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  updateAva: (user_id, avatar) => {
    return new Promise((resolve, reject) => {
      const updated_at = "now()";
      const query = {
        text: "UPDATE users SET avatar = $1, updated_at = $2 WHERE user_id = $3",
        values: [avatar, updated_at, user_id],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        console.log("lolos model");
        resolve(res);
      });
    });
  },
  updateDataWorker: (updatedData) => {
    return new Promise((resolve, reject) => {
      console.log("sampe di model");
      const updated_at = "now()";
      const query = {
        text: `UPDATE users SET
                    full_name = $1,
                    job_desc = $2,
                    domisli =  $3,
                    work_place = $4,
                    personal_desc = $5,
                    job_type = $6,
                    ig_account = $7,
                    git_account = $8,
                    gitlab_account = $9,
                    job_spec = $10,
                    updated_at = $11 
                    WHERE user_id = $12
                `,
        values: [
          updatedData.full_name,
          updatedData.job_desc,
          updatedData.domisli,
          updatedData.work_place,
          updatedData.personal_desc,
          updatedData.job_type,
          updatedData.ig_account,
          updatedData.git_account,
          updatedData.gitlab_account,
          updatedData.job_spec,
          updated_at,
          updatedData.user_id,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  deleteUser: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM users WHERE user_id = '${user_id}'`, (res, err) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },
};

module.exports = workerModel;
