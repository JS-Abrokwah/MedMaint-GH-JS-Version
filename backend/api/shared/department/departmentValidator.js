const pool = require("../../../config/database");
const { compareSync } = require("bcrypt");

const checkDeptExist = (data, deptExistCallBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      return deptExistCallBack(err);
    } else {
      conn.query(
        `select h.hosp_id, h.hosp_name, d.dept_id,d.dept_name from hospital as h join department as d on d.hospital_id = h.hosp_id where h.hosp_id = '${data.hosp_id}' and (d.dept_name like '${data.dept_name}' or d.dept_id = '${data.dept_id}')`,
        (error, results) => {
          if (error) {
            conn.release();
            return deptExistCallBack(error);
          } else {
            conn.release();
            return deptExistCallBack(null, results);
          }
        }
      );
    }
  });
};

const findDepartment = (dept_key, callBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      callBack(err);
    } else {
      conn.query(`select * from department`, (error, results) => {
        if (error) {
          conn.release();
          return callBack(error);
        } else if (results.length > 0) {
          return callBack(
            null,
            // results.find((result) => compareSync(dept_key, result.dept_key))
            results.find((result) => dept_key === result.dept_key)
          );
        } else {
          conn.release();
          return callBack(null, null);
        }
      });
    }
  });
};

// Validate Department for clinician login use case
const validateDepartment = (req, res, next) => {
  // return (req, res, next) => {
  if (req.body.dept_key) {
    findDepartment(req.body.dept_key, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Sorry, Internal Error Occured",
        });
      } else if (results) {
        //log user in
        return next();
      } else {
        return res.status(400).json({
          success: 0,
          message: `Department key '${req.body.dept_key}' does not match any department. Check if you entered the right key. Otherwise, your Admin may have reset the key`,
        });
      }
    });
  } else {
    return next();
  }
};
// };

module.exports = {
  expfindDepartment: findDepartment,
  expcheckDeptExist: checkDeptExist,
  expvalidateDepartment: validateDepartment,
};
