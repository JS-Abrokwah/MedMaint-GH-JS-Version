const router = require("express").Router();
const {
  expaddEquipment,
  expeditEquipment,
  expgetEveryEquipment,
  expaddSparePart,
  expgetEverySparePart,
} = require("./inventoryController");
const { expauthAction } = require("../users/validateUser");
const { checkToken } = require("../Auth/validateToken");

router.post(
  "/:hosp_id/:user_id/add_equipment",
  expauthAction(["Admin"]),
  checkToken,
  expaddEquipment
);
router.patch(
  "/:hosp_id/:user_id/update_equipment_info",
  expauthAction(["Admin", "Engineer"]),
  checkToken,
  expeditEquipment
);

router.get(
  "/:hosp_id/:user_id/equipment_listings",
  expauthAction(["Admin", "Engineer", "Clinician"]),
  checkToken,
  expgetEveryEquipment
);

router.post(
  "/:hosp_id/:user_id/new_spare-part",
  expauthAction(["Admin"]),
  checkToken,
  expaddSparePart
);

router.get(
  "/:hosp_id/:user_id/spare-part_listings",
  expauthAction(["Admin"]),
  checkToken,
  expgetEverySparePart
);

module.exports = router;
