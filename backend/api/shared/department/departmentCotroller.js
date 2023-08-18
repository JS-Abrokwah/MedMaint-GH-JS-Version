const {
  expcreateDepartment,
  expupdateDeptKey,
  expdeleteDepartment,
  expreadAllDepartments
} = require("./departmentService");

const addDepartment = (req, res) => {
  const data = req.body;
  data.hosp_id = req.params.hosp_id;

  expcreateDepartment(data, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occured!",
      });
    } else if (results.affectedRows) {
      return res.status(200).json({
        success: 1,
        message: "Department added successfully",
        dept_key: results.dept_key,
        data: results.results,
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: results,
      });
    }
  });
};

const resetDeptKey = (req, res) => {
  const data = req.body;
  data.hosp_id = req.params.hosp_id;
  expupdateDeptKey(data, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry Internal Error Occured!",
      });
    } else if (results.affectedRows) {
      return res.status(200).json({
        success: 1,
        message: `Department key reset successful. Kindly share the new department key \"${results.dept_key}\" with the clinicians in ${results.dept_name}`,
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: results,
      });
    }
  });
};

const getAllDepartments = (req, res) => {
  const hosp_id = req.params.hosp_id;
  expreadAllDepartments(hosp_id,(error,results)=>{
    if(error){
      res.status(500).json({
        success: 0,
        message: `Sorry, Internal Error Occured`,
      });
    }else{
      res.status(200).json({
        success:1,
        data:results
      })
    }
  })
};

const removeDepartment = (req, res) => {
  const data = req.body;
  data.hosp_id = req.params.hosp_id;
  expdeleteDepartment(data, (error, results) => {
    if (error) {
      res.status(500).json({
        success: 0,
        message: `Sorry, Internal Error Occured`,
      });
    } else if (results.affectedRows) {
      res.status(200).json({
        success: 1,
        message: `${data.dept_name} department successfully removed`,
      });
    } else {
      res.status(400).json({
        success: 0,
        message: `${data.dept_name} department not found`,
      });
    }
  });
};

module.exports = {
  expaddDepartment: addDepartment,
  expresetDeptKey: resetDeptKey,
  expremoveDepartment: removeDepartment,
  expgetAllDepartments:getAllDepartments
};
