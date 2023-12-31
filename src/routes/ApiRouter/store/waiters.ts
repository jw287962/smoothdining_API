import { NextFunction, Request, Response } from "express";
import { helperFunctions } from "../../../controller/helper_Controller";

import { waiterController } from "../../../controller/waiters_Controller";
const express = require("express");
const router = express.Router();

// /api/account/store/waiter
router.use(helperFunctions.userHasStoreID); //should make sure storeID is under user
router.get(
  "/:storeID?",
  waiterController.validateHeaderStoreData,
  helperFunctions.nocache,
  waiterController.getAllWaiters
);

router.post(
  "/:storeID?",
  waiterController.validateHeaderStoreData,
  waiterController.validation.validateBodyWaiterData,
  waiterController.addNewWaiter
);

router.patch(
  "/:waiterID",
  waiterController.validateHeaderStoreData,
  waiterController.validation.validateBodyWaiterData,
  waiterController.updateWaiter
);
router.use(helperFunctions.handleFormValidationError);
module.exports = router;
