import { Response, Request, NextFunction } from "express";

import shiftController from "../../../controller/shift_Controller";
import { helperFunctions } from "../../../controller/helper_Controller";
const express = require("express");
const router = express.Router();

router.use(helperFunctions.userHasStoreID);

// router.get("/:dateID", shiftController.queryShiftsToday);
router.get("/", shiftController.queryShiftsToday);

router.get("/:dateID", shiftController.queryShiftsDate);

router.post(
  "/:waiterID/:dateID?",
  shiftController.validation.createWaiterData,
  shiftController.createWaiterShiftData
);

router.put(
  "/:waiterID/:shiftNumber",
  shiftController.validation.updateWaiterData,
  shiftController.updateWaiterShiftData
);

router.put(
  // "/party/:waiterID/:shiftNumber",
  "/party",
  shiftController.validation.addPartyTableID,
  shiftController.addNewPartyTable
);
module.exports = router;
