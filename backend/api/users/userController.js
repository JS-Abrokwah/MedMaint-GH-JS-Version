require("dotenv").config();
const {
  expregister,
  expgetUserService,
  expgetUserCredentials,
  expupdatePassword,
  expcreateUser,
  expremoveUser,
  expcreateClinician,
} = require("./userService");
const { sign } = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  expsendResetPassword,
  expsendNewUser,
  expremoveUserMail,
  expcustomMail,
} = require("./sendMail");
const {
  expfindDepartment,
} = require("../shared/department/departmentValidator");

const registerHospital = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  expregister(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Sorry, An internal Error occured",
      });
    }
    if (results == "Success") {
      return res.status(200).json({
        success: 1,
        message: "Registered Successfully\nLogin to continue",
      });
    } else {
      res.status(400).json({
        success: 0,
        message: results,
      });
    }
  });
};

const addUser = (req, res) => {
  const body = req.body;
  body.hosp_id = req.params.hosp_id;
  const mailData = {
    email: body.email,
    personnel: body.role,
    admin_email: body.admin_email,
  };
  expcreateUser(body, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occured!",
        error: error,
      });
    } else if (results.affectedRows) {
      mailData.password = results.password;
      expsendNewUser(mailData, (err, response) => {
        let mailingFeedback;
        if (err) {
          console.log(err);
          mailingFeedback = err;
        } else {
          console.log(response);
          mailingFeedback = response;
        }
        return res.status(200).json({
          success: 1,
          message: "Personnel added successfully",
          mailing: mailingFeedback,
        });
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: results,
      });
    }
  });
};

const removeUser = (req, res) => {
  const data = req.body;
  data.hosp_id = req.params.hosp_id;
  expremoveUser(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occured",
      });
    } else if (results.affectedRows) {
      expremoveUserMail(data, (error, info) => {
        let mailFeedBack = info;
        if (error) {
          console.log(error);
          mailFeedBack = error;
        }
        return res.status(200).json({
          success: 1,
          message: "User removed successfully",
          feedback: mailFeedBack,
        });
        console.log(mailFeedBack);
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: "Personnel not found",
      });
    }
  });
};

const getUsers = (req, res) => {
  const data = req.params;
  expgetUserService(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occured",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const addClinician = (req, res) => {
  const data = req.body;
  expfindDepartment(data.dept_key, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occured",
      });
    } else if (results) {
      data.hosp_id = results.hospital_id;
      data.role = "Clinician";
      data.dept_id = results.dept_id;
      data.dept_name = results.dept_name;
      const salt = genSaltSync(10);
      data.password = hashSync(data.password, salt);

      expcreateClinician(data, (error, results) => {
        if (error) {
          return res.status(500).json({
            success: 0,
            message: "Sorry!, Internal Error Occured",
          });
        } else if (results.affectedRows) {
          return res.status(200).json({
            success: 1,
            message: "Your registration was successful.",
          });
        } else {
          return res.status(400).json({
            success: 0,
            message: results,
          });
        }
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: `Department key '${data.dept_key}' does not match any department. Check if you entered the right key. Otherwise, your Admin may have reset the key`,
      });
    }
  });
};

const userLogin = (req, res) => {
  const body = req.body;
  expgetUserCredentials(body.email, (error, results) => {
    if (error) {
      res.status(500).json({
        success: 0,
        message: "An internal Server Error Occured",
      });
    }
    if (!results) {
      return res.status(403).json({
        success: 0,
        message: "Invalid email or password",
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.ACCESS_TOKEN, {
        expiresIn: "8h",
      });
      return res.status(200).json({
        success: 1,
        message: "login successfully",
        token: jsontoken,
        data: results,
      });
    } else {
      return res.status(403).json({
        success: 0,
        message: "Invalid email or password",
      });
    }
  });
};

const forgotPasswordHandler = (req, res) => {
  const body = req.body;
  expgetUserCredentials(body.email, (error, results) => {
    if (error) {
      // console.log(error);
      return res.status(500).json({
        success: 0,
        message: "An internal Server Error Occured",
      });
    }
    if (!results) {
      return res.status(403).json({
        success: 0,
        data: "Invalid email",
      });
    }
    results.password = undefined;
    expsendResetPassword(results, (error, response) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          data: "Sorry, Couldn't recover your password",
        });
      }
      if (response) {
        return res.status(200).json({
          success: 1,
          message: "A password reset link has been sent to your email",
          data: results,
        });
      }
    });
  });
};

const resetPassword = (req, res) => {
  const id = req.params.user_id;

  const salt = genSaltSync(10);
  const password = hashSync(req.body.password, salt);
  const data = {
    user_id: id,
    password: password,
  };
  expupdatePassword(data, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "An internal Server Error Occured",
      });
    }
    if (results) {
      return res.status(200).json({
        success: 1,
        message: `<p>Password reset successful<br><a href="${process.env.CLIENT_URL}/users/login">Click Here</a> to login</p>`,
      });
    }
  });
};

const sendCustomMail = (req, res) => {
  const body = req.body;
  expcustomMail(body, (error, info) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occured",
      });
    } else if (info) {
      return res.status(200).json({
        success: 1,
        message: "Email sent successfully",
        feedback: info,
      });
    } else {
      return res.status(422).json({
        success: 0,
        message: "Request cannot be processed!",
      });
    }
  });
};

module.exports = {
  expregisterHospital: registerHospital,
  expgetUsers: getUsers,
  expuserLogin: userLogin,
  expforgotPasswordHandler: forgotPasswordHandler,
  expresetPassword: resetPassword,
  expaddUser: addUser,
  expremoveUser: removeUser,
  expaddClinician: addClinician,
  expsendCustomMail: sendCustomMail,
};
