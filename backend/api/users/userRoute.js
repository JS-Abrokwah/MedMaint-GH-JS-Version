const router = require("express").Router();
const {
  expregisterHospital,
  expgetUsers,
  expuserLogin,
  expforgotPasswordHandler,
  expresetPassword,
  expaddUser,
  expremoveUser,
  expaddClinician,
  expsendCustomMail
} = require("./userController");
const {
  expaddDepartment,
  expresetDeptKey,
  expremoveDepartment,
  expgetAllDepartments
} = require("../shared/department/departmentCotroller");

const { expauthRegister, expauthAction } = require("./validateUser");
const {
  checkToken,
  checkResetPasswordToken,
} = require("../Auth/validateToken");
const {
  expvalidateDepartment,
} = require("../shared/department/departmentValidator");

router.post("/register", expauthRegister(["Admin"]), expregisterHospital);
router.get(
  "/:hosp_id/:user_id/all_users",
  expauthAction(["Admin", "Engineer", "Clinician"]),
  checkToken,
  expgetUsers
);
router.post("/login", expvalidateDepartment, expuserLogin);
router.post("/forgot_password", expforgotPasswordHandler);
router.patch(
  "/reset_password/:user_id/:token",
  checkResetPasswordToken,
  expresetPassword
);
router.get("/check_token", checkToken, (req, res) => {
  res.status(200).json({
    success: 1,
  });
});
router.post(
  "/:hosp_id/:user_id/add-user",
  expauthAction(["Admin"]),
  checkToken,
  expaddUser
);
router.post(
  "/:hosp_id/:user_id/remove-user",
  expauthAction(["Admin"]),
  checkToken,
  expremoveUser
);
router.post(
  "/:hosp_id/:user_id/add-dept",
  expauthAction(["Admin"]),
  checkToken,
  expaddDepartment
);

router.patch(
  "/:hosp_id/:user_id/reset-deptKey",
  expauthAction(["Admin"]),
  checkToken,
  expresetDeptKey
);

router.post("/new-clinician", expaddClinician);
router.post(
  "/:hosp_id/:user_id/remove_dept",
  expauthAction(["Admin"]),
  checkToken,
  expremoveDepartment
);

router.get(
  "/:hosp_id/:user_id/department_listings",
  expauthAction(["Admin"]),
  checkToken,
  expgetAllDepartments
);

router.post(
  "/:hosp_id/:user_id/custom_mail",
  expauthAction(["Admin", "Engineer", "Clinician","ESP"]),
  checkToken,
  expsendCustomMail
);

module.exports = router;
