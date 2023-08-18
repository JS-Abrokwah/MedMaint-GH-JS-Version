const pool = require("../../config/database");
const findUserRole = (hosp_id, user_id, userRolecallBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      return userRolecallBack(err);
    } else {
      conn.query(
        `select role, dept_id, vendor_id from user where user_id = '${user_id}' and hospital_id = '${hosp_id}'`,
        (error, results) => {
          if (error) {
            conn.release();
            return userRolecallBack(error);
          } else {
            conn.release();
            return userRolecallBack(null, results);
          }
        }
      );
    }
  });
};
const authRegister = (permission) => {
  //Permission should be array
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permission.includes(userRole)) {
      next();
    } else {
      return res
        .status(401)
        .json(`Sorry, only 'Admin' roles have permission for this action`);
    }
  };
};

const authAction = (permission) => {
  //Permission should be array
  return (req, res, next) => {
    let userRole;
    findUserRole(req.params.hosp_id, req.params.user_id, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Sorry! Internal Error Occured",
        });
      } else {
        userRole = results[0]?.role;
        if (permission.includes(userRole)) {
          next();
        } else {
          return res
            .status(401)
            .json("Sorry, you don't have permission for this action!");
        }
      }
    });
  };
};

module.exports = { expauthRegister: authRegister, expauthAction: authAction, expfindUserRole:findUserRole };
