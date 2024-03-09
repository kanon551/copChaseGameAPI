const {  fetchAllCops, selectCities, getAvailableVehicles, updateVehiclesOnSelection, saveSelectedCops, returnSelectedCops, fetchAllVehicles, cops, updateEligibleVehiclesList } = require("../services/yocketService");
const logger = require("../utils/logger");
const responseUtility = require('../utils/responseUtility');



//@desc GET ---
//@route GET /api/example/test
//@access private
const getAllCops = async(req,res,next) => {
    try{
            logger.info("Inside getAllCops function ------------->")
            const response = await fetchAllCops();
            return res.status(200).json(responseUtility.build('SUCCESS', response));
    }
    catch(error){
        return next(error);
    }
}

const ChooseCityByCop = async(req, res, next) => {
    try{
        
        
        const response =  await selectCities(req.body);

        return res.status(200).json(responseUtility.build('SUCCESS', response));
    }
    catch(error){
        return next(error);
    }
}

const fetchAllEligibleVehiclesByCity = async(req, res, next) => {
    try{


        const cities = Object.values(req.body);
        const copIds = Object.keys(req.body);


        const eligibleVehiclesList = await Promise.all(
            cities.map(async (city) => {
                const vehicleOptions = await getAvailableVehicles(city);
                return vehicleOptions;
            })
        )

        let completeData = [];

        for(let i=0; i<eligibleVehiclesList.length; i++){

            const foundCop = cops.find((cop) => cop.copID === copIds[i]);
            const updatedEligibleVehiclesList = await updateEligibleVehiclesList(eligibleVehiclesList[i]);
            console.log("updatedEligibleVehiclesList is !!!!!!!!!!!!-------------------------------------------")
            console.log(updatedEligibleVehiclesList)
            console.log("Completed-------------------------------------------")

            completeData.push({
                copId: copIds[i],
                copImage: foundCop.image,
                city: cities[i],
                vehicleOptions: updatedEligibleVehiclesList 
            })
        }


        return res.status(200).json(responseUtility.build('SUCCESS', completeData));
    }
    catch(error){
        return next(error);
    }
}

const getVehicleInventoryAfterChoosingVehicle = async(req, res, next) => {
    try{
        const {copId, vehicleKind, copVehicleRelations} = req.body

        const updatedVehiclesCop = await updateVehiclesOnSelection(copId, vehicleKind, copVehicleRelations);

        return res.status(200).json(responseUtility.build('SUCCESS', updatedVehiclesCop));

    }
    catch(err){
        return next(err);
    }
}

const storeSelectedCops = async(req, res, next) => {
    try{
        const response = await saveSelectedCops(req.body.selectedCops);

        return res.status(200).json(responseUtility.build('SUCCESS', response));

    }
    catch(err){
        return next(err);
    }
}

const getSelectedCops = async(req, res, next) => {
    try{
        const response = await returnSelectedCops();

        return res.status(200).json(responseUtility.build('SUCCESS', response));

    }
    catch(err){
        return next(err);
    }
}

const getAllVehicles = async(req,res,next) => {
    try{
        const response = await fetchAllVehicles();
        return res.status(200).json(responseUtility.build('SUCCESS', response));
    }
    catch(err){
        return next(err);
    }
}


module.exports = {getAllCops, ChooseCityByCop,getAllVehicles,  fetchAllEligibleVehiclesByCity,getSelectedCops, getVehicleInventoryAfterChoosingVehicle, storeSelectedCops };