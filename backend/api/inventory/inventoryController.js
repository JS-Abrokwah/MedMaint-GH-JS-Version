const {
  expcreateEquipment,
  expupdateEquipment,
  expgetAllEquipment,
  expcreateSparePart,
  expgetAllSparePart,
} = require("./invetoryService");

const addEquipment = (req, res) => {
  const data = req.body;
  data.hosp_id = req.params.hosp_id;
  data.last_updated_by = req.params.user_id;
  expcreateEquipment(data, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occurred",
        errormsg:error
      });
    } else if (results.affectedRows) {
      return res.status(200).json({
        success: 1,
        message: `Equipment added successfully`,
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: results,
      });
    }
  });
};

const editEquipment = (req, res) => {
  // TODO Fininsh function logic
  const data = req.body;
  data.hosp_id = req.params.hosp_id;
  data.user_id = req.params.user_id;

  expupdateEquipment(data, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Sorry, Internal Error Occurred",
      });
    } else if (results.affectedRows) {
      return res.status(200).json({
        success: 1,
        message: `Equipment ${data.asset_number} info updated successfully`,
      });
    } else {
      return res.status(200).json({
        success: 0,
        message: results,
      });
    }
  });
};

const getEveryEquipment = (req, res) => {
  const data = req.params;
  expgetAllEquipment(data, (error, results) => {
    if (error) {
      // console.log(error);
      return res.status(500).json({
        success: 0,
        message: `Sorry, Internal Error Occured`,
      });
    } else {
      return res.status(200).json({
        success: 1,
        data: results,
      });
    }
  });
};

const addSparePart = (req, res) => {
  const data = req.body;
  data.hosp_id = req.params.hosp_id;
  data.user_id = req.params.user_id;
  expcreateSparePart(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: `Sorry, Internal Error occurred`,
      });
    } else if (results.affectedRows) {
      return res.status(200).json({
        success: 1,
        message: `Spare part added successfully`,
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: results,
      });
    }
  });
};

const getEverySparePart = (req, res) => {
  const data = req.params;
  expgetAllSparePart(data, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: `Sorry, Internal Error occurred`,
      });
    } else if (typeof results !== "string") {
      return res.status(200).json({
        success: 1,
        data: results,
      });
    } else {
      return res.status(200).json({
        success: 0,
        message: results,
      });
    }
  });
};

module.exports = {
  expaddEquipment: addEquipment,
  expeditEquipment: editEquipment,
  expgetEveryEquipment: getEveryEquipment,
  expaddSparePart: addSparePart,
  expgetEverySparePart:getEverySparePart,
};
