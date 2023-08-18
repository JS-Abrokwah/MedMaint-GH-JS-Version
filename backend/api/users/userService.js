// const { query } = require("express");
const { hashSync, genSaltSync } = require("bcrypt");
const pool = require("../../config/database");
const {
  expcreateHospitalID,
  expcreateUserID,
  expcreateVendorID,
  expcreatePassword,
} = require("./createIdService");

const { expfindUserRole } = require("./validateUser");

//Username and userId caller function
const genUserID = (data) => {
  const uName = `${data.first_name} ${data.surname} ${data?.other_name}`;
  const uID = expcreateUserID(
    uName,
    data.role,
    data.hosp_name,
    data.dept_name,
    data.vendor_name
  );
  // console.log(uID);
  return uID;
};
//Insert Admin data
const createAdmin = (data, hosp_id, callBack) => {
  let dbQuery = `insert into user
  values(?, ?, ?, ?,?,?,?,?,?,null,null,null,null,?,?);`;
  const user_id = genUserID(data);
  pool.getConnection((err, conn) => {
    if (err) {
      // console.log("Error getting connection");
      return callBack(null, "Unable to connect database!");
    } else {
      conn.query(
        dbQuery,
        [
          user_id,
          data.first_name,
          data.surname,
          data.other_name,
          data.email,
          data.password,
          data.phone,
          data.rank,
          data.role,
          hosp_id,
          data.profile_photo,
        ],
        (error, results, fields) => {
          if (error) {
            conn.release();
            return callBack(error);
          }
          conn.release();
          if (results.affectedRows) {
            // console.log(results);
            return callBack(null, "Success");
          }
        }
      );
    }
  });
  return;
};
//Register Hospital
const register = (data, callBack) => {
  const hosp_id = expcreateHospitalID(data.hosp_name);
  let dbQuery = `insert into hospital values(?,?,?,?,?,?)`;
  pool.getConnection((err, conn) => {
    if (err) {
      // console.log("Error getting connection");
      return callBack(null, "Unable to connect database!");
    } else {
      //Check if Hospital exist already.
      conn.query(
        `select hosp_name from hospital where hosp_name like '${data.hosp_name}'`,
        (error, results, fields) => {
          if (!error) {
            if (results.length > 0) {
              return callBack(
                null,
                `Sorry! ${data.hosp_name},located in ${data.town} is already registered.`
              );
            } else {
              // check if Someone is using the same mail
              conn.query(
                `select email from user where email = '${data.email}'`,
                (error, results, fields) => {
                  if (!error) {
                    if (results.length > 0) {
                      return callBack(
                        null,
                        `Sorry! The email address '${data.email}', has already been used`
                      );
                    } else {
                      //Insert hospital Data if it does not exist
                      conn.query(
                        dbQuery,
                        [
                          hosp_id,
                          data.hosp_name,
                          data.town,
                          data.region,
                          data.address,
                          data.logo,
                        ],
                        (error, results, fields) => {
                          if (error) {
                            return callBack(error);
                          }
                          //If hospital data is inserted
                          if (results.affectedRows) {
                            createAdmin(data, hosp_id, callBack); //Call this function to add admin
                            conn.release();
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          } else {
            conn.release();
            callBack(error);
          }
        }
      );
    }
  });
};
// Create Vendor
const createVendor = (data, vendorCallBack) => {
  const dbQuery = `insert into vendor values(?,?,?,?,?,?)`;
  pool.getConnection((err, conn) => {
    if (err) {
      // console.log(err);
      vendorCallBack(err);
      return;
    } else {
      conn.query(
        `select vendor_id from vendor where vendor_email = ? or vendor_name like ?`,
        [data.vendor_email, data.vendor_name],
        (error, results) => {
          if (error) {
            conn.release();
            // console.log(error);
            vendorCallBack(error);
            return;
          } else {
            //Vendor already exist
            if (results.length > 0) {
              conn.release();
              vendorCallBack(null, results);
              return;
            } else {
              //Vendor does not exist, insert vendor data
              conn.query(
                dbQuery,
                [
                  data.vendor_id,
                  data.vendor_name,
                  data.vendor_email,
                  data.vendor_phone,
                  data.vendor_address,
                  data.vendor_country,
                ],
                (error, results) => {
                  if (error) {
                    conn.release();
                    // console.log(error);
                    vendorCallBack(error);
                    return;
                  } else {
                    conn.release();
                    vendorCallBack(null, results);
                    return;
                  }
                }
              );
            }
          }
        }
      );
    }
  });
};

//Check whether user already exist
const checkEmailExist = (email, checkUserCallBack) => {
  // data contains user's email
  const dbQuery = `select user_id, first_name, surname, other_name, email from user where email = ?;`;

  pool.getConnection((err, conn) => {
    if (err) {
      return checkUserCallBack(err);
    } else {
      conn.query(dbQuery, [email], (error, results) => {
        if (error) {
          conn.release();
          return checkUserCallBack(error);
        } else {
          conn.release();
          return checkUserCallBack(null, results);
        }
      });
    }
  });
};

const findUserDept = (user_id, callBack) => {
  const dbQuery = `select u.user_id, d.dept_id,d.dept_name from user as u join department as d on u.dept_id = d.dept_id where u.user_id = ?`;
  pool.getConnection((err, conn) => {
    if (err) {
      return callBack(err);
    } else {
      conn.query(dbQuery, user_id, (error, results) => {
        if (error) {
          conn.release();
          return callBack(error);
        } else {
          conn.release();
          return callBack(null, results);
        }
      });
    }
  });
};

//Create Other users except clinician
const createUser = (data, callBack) => {
  checkEmailExist(data.email, (err, results) => {
    if (err) {
      // console.log(err);
      return callBack(err);
    } else if (results.length > 0) {
      return callBack(
        null,
        `Sorry someone is already using ${results[0].email} as their email`
      );
    } else {
      //get user affiliations
      pool.getConnection((error, conn) => {
        const engQuery = `select h.hosp_name, d.dept_name from hospital as h join department as d where h.hosp_id = ? and d.dept_id = ? and h.hosp_id = d.hospital_id;`;
        const espQuery = `select vendor_name from vendor where vendor_id = ?;`;
        const [dbQuery, queryData] =
          data.role == "Engineer"
            ? [engQuery, [data.hosp_id, data.dept_id]]
            : [espQuery, [data.vendor_id]];
        if (error) {
          // console.log(error);
          callBack(error);
        } else {
          conn.query(dbQuery, queryData, (error, results) => {
            if (error) {
              // console.log(error);
              return callBack(error);
            } else if (results) {
              //generate various IDs
              let genIdData;
              if (results.length < 1 && data.role == "Engineer") {
                callBack(
                  null,
                  `The department you are trying to assign ${
                    data.first_name + " " + data.surname + " " + data.other_name
                  } to, does not exist for your hospital. Add the department and try again`
                );
              } else {
                genIdData = {
                  first_name: data.first_name,
                  surname: data.surname,
                  other_name: data.other_name,
                  role: data.role,
                  hosp_name: results[0]?.hosp_name,
                  dept_name: results[0]?.dept_name,
                  vendor_name: results[0]?.vendor_name,
                };
                if (results.length < 1 && data.role == "ESP") {
                  genIdData.vendor_name = data.vendor_name;
                }

                data.user_id = genUserID(genIdData);
                let password = expcreatePassword(data);
                const passwordCopy = password;
                const salt = genSaltSync(10);
                data.password = hashSync(password, salt);
                const vendor_id = expcreateVendorID(data.vendor_name);
                data.vendor_id = vendor_id;
                //Define queries and queryData
                const EngQuery = `insert into user values(?, ?, ?, ?,?,?,?,?,?,?,null,null,null,?,null);`;

                const EngData = [
                  data.user_id,
                  data.first_name,
                  data.surname,
                  data.other_name,
                  data.email,
                  data.password,
                  data.phone,
                  data.rank,
                  data.role,
                  data.dept_id,
                  data.hosp_id,
                ];

                const ESPQuery = `insert into user values(?, ?, ?, ?,?,?,?,null,?,null,?,null,null,?,null);`;

                const ESPData = [
                  data.user_id,
                  data.first_name,
                  data.surname,
                  data.other_name,
                  data.email,
                  data.password,
                  data.phone,
                  data.role,
                  data.vendor_id,
                  data.hosp_id,
                ];

                //Assign the appropriate query and queryData base on user Role
                let dbQuery, queryData;
                if (data.role === "Engineer") {
                  dbQuery = EngQuery;
                  queryData = EngData;
                } else if (data.role === "ESP") {
                  dbQuery = ESPQuery;
                  queryData = ESPData;
                }

                if (data.role === "ESP") {
                  createVendor(data, (error, results) => {
                    if (error) {
                      // console.log(error);
                      return callBack(error);
                    } else if (results === "Unable to connect database!") {
                      return callBack(error);
                    } else if (results.length > 0 || results.affectedRows) {
                      queryData[8] =
                        results.length > 0 ? results[0].vendor_id : vendor_id;
                      pool.getConnection((error, conn) => {
                        if (error) {
                          // console.log(error);
                          return callBack(error);
                        } else {
                          conn.query(dbQuery, queryData, (error, results) => {
                            if (error) {
                              conn.release();
                              // console.log(error);
                              return callBack(error);
                            } else {
                              if (results.affectedRows) {
                                conn.release();
                                return callBack(null, {
                                  result: results,
                                  password: passwordCopy,
                                  affectedRows: results.affectedRows,
                                });
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                } else if (data.role === "Engineer") {
                  // Insert Engineer
                  pool.getConnection((error, conn) => {
                    if (error) {
                      // console.log(error);
                      return callBack(error);
                    } else {
                      conn.query(dbQuery, queryData, (error, results) => {
                        if (error) {
                          conn.release();
                          // console.log(error);
                          return callBack(error);
                        } else {
                          if (results.affectedRows) {
                            conn.release();
                            return callBack(null, {
                              results: results,
                              password: passwordCopy,
                              affectedRows: results.affectedRows,
                            });
                          }
                        }
                      });
                    }
                  });
                }
              }
            }
          });
        }
      });
    }
  });
};

const removeUser = (data, callBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      return callBack(err);
    } else {
      conn.query(
        `delete from user where user_id = '${data.user_id}' and hospital_id='${data.hosp_id}' and role != 'Admin'`,
        (error, results) => {
          if (error) {
            console.log(error);
            conn.release();
            return callBack(error);
          } else {
            conn.release();
            return callBack(null,results)
          }
        }
      );
    }
  });
};
// Create Clinician user
const createClinician = (data, callBack) => {
  checkEmailExist(data.email, (error, results) => {
    if (error) {
      // console.log(error);
      return callBack(error);
    } else if (results.length < 1) {
      pool.getConnection((err, conn) => {
        if (err) {
          // console.log(err);
          return callBack(err);
        }
        // console.log(data.hospital_id); //For debugging purpose
        conn.query(
          `select hosp_name from hospital where hosp_id ='${data.hosp_id}'`,
          (error, results) => {
            if (error) {
              conn.release();
              // console.log(error);
              return callBack(error);
            } else if (results.length > 0) {
              data.hosp_name = results[0].hosp_name;
              data.user_id = genUserID({
                first_name: data.first_name,
                surname: data.surname,
                other_name: data.other_name,
                role: data.role,
                hosp_name: data.hosp_name,
                dept_name: data.dept_name,
              });
              const dbQuery = `insert into user values(?,?,?,?,?,?,?,?,?,?,null,?,?,?,null)`;
              conn.query(
                dbQuery,
                [
                  data.user_id,
                  data.first_name,
                  data.surname,
                  data.other_name,
                  data.email,
                  data.password,
                  data.phone,
                  data.rank,
                  data.role,
                  data.dept_id,
                  data.duty_post,
                  data.profession,
                  data.hosp_id,
                ],
                (error, results) => {
                  if (error) {
                    conn.release();
                    // console.log(error);
                    return callBack(error);
                  } else {
                    conn.release();
                    // console.log(results);
                    callBack(null, results);
                  }
                }
              );
            } else {
              conn.release();
              return callBack(null, results);
            }
          }
        );
      });
    } else {
      return callBack(
        null,
        `Sorry, someone is already using '${data.email}' as their email`
      );
    }
  });
};

const getUserService = (data, callBack) => {
  expfindUserRole(data.hosp_id, data.user_id, (error, results) => {
    if (error) {
      return callBack(error);
    } else {
      const QueryForCli = {
        dbQuery: `select u.first_name, u.surname, u.other_name, u.email, u.phone,u.role, d.dept_name from user as u join department as d on u.dept_id = d.dept_id where u.dept_id = ? and u.role = 'Engineer'`,
        dbQueryData: [results[0].dept_id],
      };
      const QueryForEng = {
        dbQuery: `select u.first_name, u.surname, u.other_name, u.email, u.phone, u.duty_post, u.role, u.rank, u.profession, d.dept_name from user as u join department as d on u.dept_id = d.dept_id where u.dept_id = ? and u.user_id != ? and (u.role = 'Engineer' or u.role = 'Clinician')`,
        dbQueryData: [results[0].dept_id, data.user_id],
      };
      const QueryForAdm = {
        dbQuery: `select u.user_id, u.first_name, u.surname, u.other_name, u.email, u.phone, u.duty_post,u.role, u.rank, u.profession,u.profile_photo,d.dept_id, d.dept_name, v.* from user as u left join department as d on u.dept_id = d.dept_id left join vendor as v on u.vendor_id = v.vendor_id where u.hospital_id = ? and u.user_id != ?`,
        dbQueryData: [data.hosp_id, data.user_id],
      };

      // Actual Query
      let dbQuery, dbQueryData;
      if (results[0].role === "Clinician") {
        dbQuery = QueryForCli.dbQuery;
        dbQueryData = QueryForCli.dbQueryData;
      } else if (results[0].role === "Engineer") {
        dbQuery = QueryForEng.dbQuery;
        dbQueryData = QueryForEng.dbQueryData;
      } else if (results[0].role === "Admin") {
        dbQuery = QueryForAdm.dbQuery;
        dbQueryData = QueryForAdm.dbQueryData;
      }

      pool.getConnection((err, conn) => {
        if (err) {
          return callBack(err);
        } else {
          conn.query(dbQuery, dbQueryData, (error, results) => {
            if (error) {
              conn.release();
              return callBack(error);
            } else {
              conn.release();
              return callBack(null, results);
            }
          });
        }
      });
    }
  });
};

const getUserCredentials = (email, callBack) => {
  pool.getConnection((err, conn) => {
    if (err) {
      return callBack(err);
    } else {
      conn.query(
        `select u.user_id, u.first_name, u.surname, u.other_name, d.dept_id, d.dept_name, v.vendor_id, v.vendor_name, u.email, u.password, u.role, h.hosp_id, h.hosp_name from user as u join hospital as h on u.hospital_id = h.hosp_id left join department as d on u.dept_id = d.dept_id left join vendor as v on u.vendor_id = v.vendor_id where email = ?`,
        [email],
        (error, results) => {
          if (error) {
            conn.release();
            return callBack(error);
          } else {
            conn.release();
            return callBack(null, results[0]);
          }
        }
      );
    }
  });
};

const updatePassword = (data, callBack) => {
  let dbQuery = "update `user` set `password` = ? where `user_id` = ?";
  pool.getConnection((err, conn) => {
    if (err) {
      // console.log(err);
      return callBack(err);
    } else {
      conn.query(dbQuery, [data.password, data.user_id], (error, results) => {
        if (error) {
          conn.release();
          return callBack(error);
        } else {
          conn.release();
          return callBack(null, results);
        }
      });
    }
  });
};

module.exports = {
  expregister: register,
  expgetUserService: getUserService,
  expgetUserCredentials: getUserCredentials,
  expupdatePassword: updatePassword,
  expcreateUser: createUser,
  expremoveUser: removeUser,
  expcreateClinician: createClinician,
  expcreateVendor: createVendor,
  expfindUserDept: findUserDept,
};
