const pool = require("../../../config/database");
const { expcreateDeptId, expcreateDeptKey } = require("./createDeptIdService");
const { expcheckDeptExist } = require("./departmentValidator");

const createDepartment = (data, callBack) => {
  expcheckDeptExist(data, (error, results) => {
    if (error) {
      console.log(error);
      return callBack(error);
    } else if (results.length > 0) {
      return callBack(
        null,
        `Department of ${data.dept_name} is already registered for ${results[0].hosp_name}`
      );
    } else {
      pool.getConnection((err, conn) => {
        if (err) {
          console.log(err);
          return callBack(err);
        } else {
          conn.query(
            `select hosp_name from hospital where hosp_id = '${data.hosp_id}'`,
            (error, results) => {
              if (error) {
                conn.release();
                console.log(error);
                callBack(error);
              } else if (results.length > 0) {
                data.dept_id = expcreateDeptId(
                  results[0].hosp_name,
                  data.dept_name
                );
                const dkey = expcreateDeptKey(
                  results[0]?.hosp_name,
                  data.dept_name
                );
                // const departmentKey = dkey;
                // const salt = genSaltSync(10);
                // data.dept_key = hashSync(dkey, salt);
                data.dept_key = dkey
                const dbQuery = `insert into department values(?,?,?,?)`;

                conn.query(
                  dbQuery,
                  [data.dept_id, data.dept_name, data.hosp_id, data.dept_key],
                  (err, results) => {
                    if (err) {
                      conn.release();
                      return callBack(err);
                    } else {
                      conn.release();
                      return callBack(null, {
                        results: results,
                        dept_key: data.dept_key,
                        affectedRows: results.affectedRows,
                      });
                    }
                  }
                );
              } else {
                conn.release();
                return callBack(null, "Oops..., Something went wrong");
              }
            }
          );
        }
      });
    }
  });
};

const updateDeptKey = (data, callBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      return callBack(err);
    } else {
      conn.query(
        `select h.hosp_name,d.dept_name from hospital as h join department as d where h.hosp_id = '${data.hosp_id}' and d.dept_id = '${data.dept_id}'`,
        (error, results) => {
          if (error) {
            conn.release();
            return callBack(error);
          } else if (results.length > 0) {
            const dkey = expcreateDeptKey(
              results[0].hosp_name,
              results[0].dept_name
            );
            const departmentName = results[0].dept_name;
            data.dept_key = dkey
            const dbQuery = `update department set dept_key = ? where dept_id = ? and hospital_id = ?`;
            conn.query(
              dbQuery,
              [data.dept_key, data.dept_id, data.hosp_id],
              (error, results) => {
                if (error) {
                  conn.release();
                  return callBack(error);
                } else {
                  conn.release();
                  results.dept_key = data.dept_key;
                  results.dept_name = departmentName;
                  return callBack(null, results);
                }
              }
            );
          } else {
            console.log("Department not found!");
            return callBack(null, "Department not found!");
          }
        }
      );
    }
  });
};

const readAllDepartments = (hosp_id, callBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      return callBack(err);
    } else {
      conn.query(
        `select * from department where hospital_id = '${hosp_id}'`,
        (error, results) => {
          if(error){
            conn.release();
            return callBack(error)
          }else{
            conn.release();
            return callBack(null, results)
          }
        }
      );
    }
  });
};
// Delete Department
const deleteDepartment = (data, callBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      return callBack(err);
    } else {
      conn.query(
        `select d.dept_name, h.hosp_name from department as d join hospital as h where h.hosp_id = d.hospital_id and d.dept_id = ? and h.hosp_id = ?`,
        [data.dept_id, data.hosp_id],
        (error, results) => {
          if (error) {
            conn.release();
            return callBack(error);
          } else if (results.length > 0) {
            conn.query(
              `delete from department where dept_id = '${data.dept_id}' and hospital_id = '${data.hosp_id}'`,
              (error, results) => {
                if (error) {
                  conn.release();
                  return callBack(error);
                } else {
                  conn.release();
                  return callBack(null, results);
                }
              }
            );
          } else {
            conn.release();
            return callBack(null, results);
          }
        }
      );
    }
  });
};

module.exports = {
  expcreateDepartment: createDepartment,
  expupdateDeptKey: updateDeptKey,
  expdeleteDepartment: deleteDepartment,
  expreadAllDepartments:readAllDepartments
};
