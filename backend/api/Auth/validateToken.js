const { verify } = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7); //slice Bearer out of token
      verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          // return res.redirect(302, `${process.env.CLIENT_URL}/welcome`);
          return res.status(302).json({
            success:0,
            message:'Your session expired',
            redirect:'/welcome'
          });

        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },

  checkResetPasswordToken: (req, res, next) => {
    let token = req.params.token;
    if (token) {
      verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            success: 0,
            message: "Access Denied! Your session has expired",
            data: error,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },
};
