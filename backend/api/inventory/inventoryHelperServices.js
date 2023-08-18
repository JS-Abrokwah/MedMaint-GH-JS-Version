const pool = require("../../config/database");

// Helper Functions
module.exports = {
  findEquipment: (data, findCallBack) => {
    // data contains asset number and serial_number
    pool.getConnection((err, conn) => {
      if (err) {
        return findCallBack(err);
      } else {
        conn.query(
          `select * from equipment where hosp_id = '${data.hosp_id}' and (asset_number = '${data.asset_number}' or serial_number = '${data.serial_number}')`,
          (error, results) => {
            if (error) {
              conn.release();
              return findCallBack(error);
            } else {
              conn.release();
              return findCallBack(null, results);
            }
          }
        );
      }
    });
  },

  createManufacturer: (man_name, manCallBack) => {
    pool.getConnection((err, conn) => {
      if (err) {
        return manCallBack(err);
      } else {
        conn.query(
          `select * from manufacturer where manufacturer_name = '${man_name}'`,
          (error, results) => {
            if (error) {
              conn.release();
              return manCallBack(error);
            } else if (results.length > 0) {
              conn.release();
              return manCallBack(null, results);
            } else {
              conn.query(
                `insert into manufacturer(manufacturer_name) values('${man_name}')`,
                (error, results) => {
                  if (error) {
                    conn.release();
                    return manCallBack(error);
                  } else {
                    conn.query(
                      `select * from manufacturer where manufacturer_name = '${man_name}'`,
                      (error, results) => {
                        if (error) {
                          conn.release();
                          return manCallBack(error);
                        } else {
                          conn.release();
                          // console.log(results);
                          return manCallBack(null, results);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  },

  findEquipPart: (data, callBack) => {
    const dbQuery = `select p.part_id, p.part_name, e.equip_name from spare_part as p join equipment as e on p.equip_id = e.asset_number where (p.part_name like '${data.partName}' or p.part_id = '${data.part_id}')and e.asset_number ='${data.asset_number}' and p.current_quantity != ${0}`;
    pool.getConnection((err, conn) => {
      if (err) {
        return callBack(err);
      } else {
        conn.query(`select asset_number, equip_name from equipment where asset_number = '${data.asset_number}'`,
        (error,results)=>{
          if (error){
            conn.release()
            return callBack(error)
          }else if(results.length>0){
            conn.query(dbQuery, (error, results) => {
              if (error) {
                conn.release();
                return callBack(error);
              } else {
                conn.release();
                return callBack(null, results);
              }
            });
          }else{
            return callBack(null, `The equipment (${data.asset_number}) whose spare part is being added does not exist`)
          }
        })
      }
    });
  },
};
