require("dotenv").config();
const nodemailer = require("nodemailer");
const { sign } = require("jsonwebtoken");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

const sendResetPassword = (data, callBack) => {
  const token = sign({ result: data }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  });

  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: data.email,
    subject: "Reset Password",
    html: `<div style="text-align:center;">
    <h4>You just requested for your MedMaint_GH password reset</h4>
    <h5>If you remember this action,</h5>
    <h5>then <a href="${process.env.CLIENT_URL}/users/reset_password/${data.user_id}/${token}">Click Here</a> to continue.</h5>
    <h5>Else, ignore this message</h5    
    </div>`,
    replyTo: data.admin_email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return callBack(error);
    } else {
      return callBack(null, info.response);
    }
  });
};

const sendNewUser = (data, callBack) => {
  //Define Mail Here
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: data.email,
    subject: "MedMaint-GH Account Registration Notice",
    html: `<div style="text-align:center;">
    <h4>You have been registered as ${data.personnel} on MedMaint-GH.<br>Below are your login credentials</h4>
    <h5>Email: ${data.email} <br>Password: ${data.password}</h5>
    <h5><a href="${process.env.CLIENT_URL}">Click Here</a> to log into your account.</h5>   
    </div>`,
    replyTo: data.admin_email,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return callBack(err);
    } else {
      return callBack(null, info.response);
    }
  });
};

const removeUserMail = (data, callBack) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: data.email,
    subject: "MedMaint-GH: Account Removal Notice",
    html: `<div style="text-align:center; background-color=#ffffff; color:#000000">
    <h4><span style="color: #ff0000">Sorry</span>,<br>Your MedMaint-GH account has been revoked by your Administrator</h4>
    <br>
    <p>You can contact ${data.admin_email} for details</p>
    </div>`,
    replyTo: data.admin_email,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return callBack(err);
    } else {
      return callBack(null, info.response);
    }
  });
};

const customMail = (data, callBack) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: data.to,
    subject: data.subject,
    html: `<div style="text-align:center;">
    <p>${data.message}</p>
    <br>
    <span>Sender: </span><h5>${data.sender_name} (<span style="color:#00ff00;">${data.sender_role} at ${data.hospital_initials}</span>)</h5>
    </div>`,
    replyTo: data.sender_email,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return callBack(err);
    } else {
      return callBack(null, info.response);
    }
  });
};

module.exports = {
  expsendResetPassword: sendResetPassword,
  expsendNewUser: sendNewUser,
  expremoveUserMail: removeUserMail,
  expcustomMail: customMail,
};
