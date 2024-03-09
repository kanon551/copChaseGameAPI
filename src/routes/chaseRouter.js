const express = require('express');
const asyncValidateToken = require('../middleware/validateTokenHandler');
const multer = require('multer');
const { getAllCops, ChooseCityByCop, fetchAllEligibleVehiclesByCity, getVehicleInventoryAfterChoosingVehicle, storeSelectedCops, getSelectedCops, getAllVehicles } = require('../controllers/YocketController');
const upload = multer();


const chaseRouter = express.Router();

    chaseRouter.route("/getAllCops").get(getAllCops);
    chaseRouter.route("/getSelectedCities").post(ChooseCityByCop);
    chaseRouter.route("/eligibleVehicles").post(fetchAllEligibleVehiclesByCity);
    chaseRouter.route("/getUpdatedInventory").post(getVehicleInventoryAfterChoosingVehicle);  
    chaseRouter.route("/saveSelectedCops").post(storeSelectedCops);
    chaseRouter.route("/obtainSelectedCops").get(getSelectedCops);
    chaseRouter.route("/getAllvehicles").get(getAllVehicles);

module.exports = chaseRouter;