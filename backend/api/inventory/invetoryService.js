const pool = require("../../config/database");
const { expcreateVendor, expfindUserDept } = require("../users/userService");
const { expcreateVendorID } = require("../users/createIdService");
const {
  expcheckDeptExist,
} = require("../shared/department/departmentValidator");

const { createPartID } = require("./createInventID");
// Helpers
const {
  findEquipment,
  createManufacturer,
  findEquipPart,
} = require("./inventoryHelperServices");

// Service functions
const createEquipment = (data, callBack) => {
  equipData = {
    hosp_id: data.hosp_id,
    asset_number: data.asset_number,
    serial_number: data.serial_number,
  };
  findEquipment(equipData, (err, results) => {
    if (err) {
      return callBack(err);
    } else if (results.length > 0) {
      return callBack(
        null,
        `Equipment with asset number ${data.asset_number} already exist in inventory`
      );
    } else {
      const deptCred = {
        hosp_id: data.hosp_id,
        // dept_id: data.dept_id,
        dept_name: data.dept_name,
      };
      expcheckDeptExist(deptCred, (error, results) => {
        if (error) {
          return callBack(error);
        } else if (results.length > 0) {
          data.dept_id = results[0].dept_id;
          data.vendor_id = expcreateVendorID(data.vendor_name);
          expcreateVendor(data, (error, results) => {
            if (error) {
              return callBack(error);
            } else {
              if (results.length > 0) {
                data.vendor_id = results[0].vendor_id;
              }
              createManufacturer(data.manufacturer, (error, results) => {
                if (error) {
                  return callBack(error);
                } else if (results.length > 0) {
                  // console.log(results);
                  data.manfacturer_id = results[0].manufacturer_id;
                  data.last_updated = new Date();
                  // data.date_installed = JSON.parse

                  // Insert equipment info
                  const dbQuery = `insert into equipment values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                  pool.getConnection((err, conn) => {
                    if (err) {
                      return callBack(error);
                    } else {
                      conn.query(
                        dbQuery,
                        [
                          data.asset_number,
                          data.equip_name,
                          data.model,
                          data.serial_number,
                          data.manfacturer_id,
                          data.manufac_year,
                          data.location,
                          data.dept_id,
                          data.hosp_id,
                          data.equip_type,
                          data.country_of_origin,
                          data.ppm_interval,
                          data.lifespan,
                          data.date_installed,
                          data.condition,
                          data.remark,
                          data.vendor_id,
                          data.last_updated,
                          data.last_updated_by,
                        ],
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
                    }
                  });
                }
              });
            }
          });
        } else {
          return callBack(
            null,
            `You can't assign this equipment to ${data.dept_name}, but this department does not Exist`
          );
        }
      });
    }
  });
};

const updateEquipment = (data, callBack) => {
  findEquipData = {
    hosp_id: data.hosp_id,
    asset_number: data.asset_number,
    serial_number: data.serial_number,
  };
  findEquipment(findEquipData, (error, results) => {
    if (error) {
      return callBack(error);
    } else if (results.length > 0) {
      const deptCred = {
        hosp_id: data.hosp_id,
        dept_name: data.dept_name,
        dept_id: data.dept_id,
      };
      expcheckDeptExist(deptCred, (err, results) => {
        if (err) {
          return callBack(err);
        } else if (results.length > 0) {
          const dbQuery =
            "update equipment set location = ?, dept_id = ?,ppm_interval = ?, `condition` = ?, remark = ?, last_updated = ?, last_updated_by = ? where asset_number = ? or serial_number = ?";
          //TODO: Write data update query here
          pool.getConnection((error, conn) => {
            if (error) {
              return callBack(error);
            } else {
              data.last_updated = new Date();
              conn.query(
                dbQuery,
                [
                  data.location,
                  results[0].dept_id,
                  data.ppm_interval,
                  data.condition,
                  data.remark,
                  data.last_updated,
                  data.user_id,
                  data.asset_number,
                  data.serial_number,
                ],
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
            }
          });
        } else {
          return callBack(null, `The new department does not exist`);
        }
      });
    } else {
      return callBack(
        null,
        `The equipment with asset number ${data.asset_number} cannot be found`
      );
    }
  });
};

const getAllEquipment = (data, callBack) => {
  expfindUserDept(data.user_id, (err, results) => {
    if (err) {
      return callBack(err);
    } else {
      const dbQuery1 = `select e.*,d.dept_name, m.manufacturer_name, v.*, u.first_name,u.surname,u.other_name,h.hosp_name from equipment as e join hospital as h on e.hosp_id = h.hosp_id join department as d on e.dept_id = d.dept_id join manufacturer as m on e.manufacturer_id = m.manufacturer_id join vendor as v on e.vendor_id = v.vendor_id left join user as u on e.last_updated_by = u.user_id where d.dept_id = ? order by e.equip_name`;
      const dbQuery2 = `select e.*,d.dept_name, m.manufacturer_name, v.*, u.first_name,u.surname,u.other_name,h.hosp_name from equipment as e join hospital as h on e.hosp_id = h.hosp_id join department as d on e.dept_id = d.dept_id join manufacturer as m on e.manufacturer_id = m.manufacturer_id join vendor as v on e.vendor_id = v.vendor_id left join user as u on e.last_updated_by = u.user_id where e.hosp_id = ? order by e.equip_name`;
      pool.getConnection((error, conn) => {
        if (error) {
          return callBack(error);
        } else {
          conn.query(
            results.length > 0 && results[0].dept_id ? dbQuery1 : dbQuery2,
            results.length > 0 && results[0].dept_id
              ? [results[0].dept_id]
              : [data.hosp_id],
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
        }
      });
    }
  });
};
// Spare parts functions
const createSparePart = (data, callBack) => {
  data.part_id = createPartID(data.part_name);
  const findPartData = {
    partName: data.part_name,
    asset_number: data.asset_number,
    part_id: data.part_id,
  };
  findEquipPart(findPartData, (error, results) => {
    if (error) {
      return callBack(error);
    } else if (results.length == 0) {
      data.vendor_id = expcreateVendorID(data.vendor_name);
      expcreateVendor(data, (err, results) => {
        if (err) {
          return callBack(err);
        } else {
          if (results.length > 0) {
            data.vendor_id = results[0].vendor_id;
          }

          const dbQuery = `insert into spare_part values(?,?,?,?,?,?,?,?,?)`;
          pool.getConnection((err, conn) => {
            if (err) {
              return callBack(err);
            } else {
              conn.query(
                dbQuery,
                [
                  data.part_id,
                  data.part_name,
                  data.serial_number,
                  data.quantity,
                  data.quantity,
                  data.vendor_id,
                  data.hosp_id,
                  data.asset_number,
                  data.expiry_date,
                ],
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
            }
          });
        }
      });
    } else if (typeof results === "string") {
      return callBack(null, results);
    } else {
      return callBack(null, `This spare part has already been added`);
    }
  });
};

const getAllSparePart = (data, callBack) => {
  const dbQuery = `select p.part_id,p.serial_number, p.part_name, p.initial_quantity, p.current_quantity,p.expiry_date, v.*, e.asset_number, e.equip_name from spare_part as p join equipment as e on p.equip_id = e.asset_number join vendor as v on p.vendor_id = v.vendor_id where p.hospital_id = ?`;
  pool.getConnection((err, conn) => {
    if (err) {
      return callBack(err);
    } else {
      conn.query(dbQuery, [data.hosp_id], (error, results) => {
        if (error) {
          conn.release();
          return callBack(error);
        } else if (results.length > 0) {
          conn.release();
          return callBack(null, results);
        } else {
          conn.release();
          return callBack(null, "No spare part available");
        }
      });
    }
  });
};

module.exports = {
  expcreateEquipment: createEquipment,
  expupdateEquipment: updateEquipment,
  expgetAllEquipment: getAllEquipment,
  expcreateSparePart: createSparePart,
  expgetAllSparePart:getAllSparePart,
};
