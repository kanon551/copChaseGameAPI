const logger = require('../utils/logger');
const {ExceptionResolver} = require('../middleware/ExceptionResolver');
const { ForbiddenException, ResourceNotFound, BadRequestException, NotAcceptableException, NotFound, DataConstraintViolation } = require('../utils/exceptions');

const cops = [
    { id: 1, name: 'John Doe',copID: '#2216', gender: 'Male', country: 'America', image: 'https://static.vecteezy.com/system/resources/previews/030/337/543/large_2x/ai-generative-portrait-of-handsome-police-officer-police-car-in-background-free-photo.jpg' },
    { id: 2, name: 'Li Wei', copID: '#9987', gender: 'Male', country: 'China', image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsb2ZmaWNlMTFfYV9wb3J0cmFpdF9vZl9wcm91ZF9hbmRfY29uZmlkZW50X2FzaWFuX21hbGVfcF8xOTBiZWE0Yy0xNzEzLTQwZWYtYmRiNy0zYmE5YmJjZmE0ODhfMi5qcGc.jpg' },
    { id: 3, name: 'Priya Patel',copID:"#4109", gender: 'Female', country: 'India', image: 'https://storage.googleapis.com/pai-images/f4f4d5ade57d42cab09efc00c5597087.jpeg' },
    { id: 4, name: 'Alex Smith', copID: '#7654', gender: 'Male', country: 'Canada', image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9wb2xpY2VfbWFuX3NtaWxpbmdfYmVzaWRlX29mX2FfYmx1cnJ5X19jNzMyNmVhNC03OTkxLTQxMWItOGU5Yy1lMTcyMDQ3MzlhN2ItMDAxLWcuanBn.jpg' },
    { id: 5, name: 'Sophie Johnson', copID: '#1122', gender: 'Female', country: 'United Kingdom', image: 'https://i.pinimg.com/736x/76/0d/03/760d035ad945c95e079d75103b95bab2.jpg' },
    { id: 6, name: 'Mohammed Khan', copID: '#4567', gender: 'Male', country: 'Pakistan', image: 'https://leadpakistan.com.pk/news/wp-content/uploads/2022/12/Faisal-Shahkar.jpg' },
    { id: 7, name: 'Anna Garcia', copID: '#7890', gender: 'Female', country: 'Spain', image: 'https://img.freepik.com/premium-photo/portrait-beautiful-girl-police-uniform-professional-posing_540381-6067.jpg' },
    { id: 8, name: 'Yuki Tanaka', copID: '#2345', gender: 'Female', country: 'Japan', image: 'https://storage.googleapis.com/pai-images/2df121560c9e46c9a9315da59b085219.jpeg' },
    { id: 9, name: 'Klaus Schmidt', copID: '#6789', gender: 'Male', country: 'Germany', image: 'https://storage.googleapis.com/pai-images/5865c0769ac549ecbead184973f2ef41.jpeg' },
    { id: 10, name: 'Elena Rossi', copID: '#3210', gender: 'Female', country: 'Italy', image: 'https://storage.googleapis.com/pai-images/5febc47b3cee4796a84f01d4b88a7231.jpeg' },
  ];


const cities = ['Yapkashnagar', 'Lihaspur', 'Narmis City', 'Shekharvati', 'Nuravgram'];

const cityDistances = {
  'Yapkashnagar': 60,
  'Lihaspur': 50,
  'Narmis City': 40,
  'Shekharvati': 30,
  'Nuravgram': 20
};

const vehicles = [
  { kind: 'EV Bike', range: 60, count: 2, image: 'https://www.yankodesign.com/images/design_news/2022/12/auto-draft/tesla_cyberbike_concept_4.jpg' },
  { kind: 'EV Car', range: 100, count: 1 , image: 'https://img.freepik.com/premium-photo/futuristic-electric-vehicle-ev-system-nighttime-scene-with-electric-car-generative-ai_431161-2463.jpg'},
  { kind: 'EV SUV', range: 120, count: 1, image: 'https://wheelz.me/wp-content/uploads/2019/09/trail-7.jpg' }
];

const mutableVehicles = [
  { kind: 'EV Bike', range: 60, count: 2, image: 'https://www.yankodesign.com/images/design_news/2022/12/auto-draft/tesla_cyberbike_concept_4.jpg' },
  { kind: 'EV Car', range: 100, count: 1 , image: 'https://img.freepik.com/premium-photo/futuristic-electric-vehicle-ev-system-nighttime-scene-with-electric-car-generative-ai_431161-2463.jpg'},
  { kind: 'EV SUV', range: 120, count: 1, image: 'https://wheelz.me/wp-content/uploads/2019/09/trail-7.jpg' }
];

let selectedCities = {};
let selectedCops = []


const fetchAllCops = async() => {
    try{
          
        return cops;

    }
    catch(err){
        logger.error(`fetchAllCops -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}


const selectCities = async(body) => {
    try{

     const { copId, selectedCity } = body;

    if (!copId || !selectedCity) {
        throw new BadRequestException("Missing copId or selectedCity.");
    }
    else if (!cities.includes(selectedCity)) {
        throw new ResourceNotFound("Invalid city, please choose a valid city");
    }
    else if(Object.values(selectedCities).includes(selectedCity)){
        throw new NotAcceptableException(`${selectedCity} has already been selected by a cop with id: ${Object.keys(selectedCities).find(key => selectedCities[key] === selectedCity)}`);
    }

    selectedCities[copId] = selectedCity;
     
    return selectedCities;
    }
    catch(err){
      logger.error(`selectCities -> ${err.message}`)
      ExceptionResolver(err, null);
    }
  }


  const getAvailableVehicles = async(selectedCity) => {
    try{
        const distanceToTarget = cityDistances[selectedCity];
        const data = await vehicles.filter(vehicle => vehicle.range >= distanceToTarget * 2 && vehicle.count > 0);
        return data;
    }
    catch(err){
        logger.error(`getAvailableVehicles -> ${err.message}`)
        ExceptionResolver(err, null);
      }
    }


    const updateVehiclesOnSelection = async(copId, selectedVehicleKind, copVehicleRelations) => {
        try{
            const copOptions = await getCopOptions(copId, copVehicleRelations);

            const updatedVehicles = await mutableVehicles.map(vehicle => {
              if (vehicle.kind === selectedVehicleKind && copOptions.some(option => option.kind === selectedVehicleKind)) {
                vehicle.count -= 1;
              }
          
              return vehicle;
            }).filter(vehicle => vehicle.count > 0);
          
            return updatedVehicles;
        }
        catch(err){
            logger.error(`updateVehiclesOnSelection -> ${err.message}`)
            ExceptionResolver(err, null);
        }
    }

    const getCopOptions = async(copId, copVehicleRelations) => {
        try{
            const copRelation = await copVehicleRelations.find(relation => relation.copId === copId);
            return copRelation ? copRelation.vehicleOptions : [];
        }
        catch(err){
            logger.error(`getCopOptions -> ${err.message}`)
            ExceptionResolver(err, null);
        }
       
      }

    const saveSelectedCops = async(copsList) => {
        try{
            selectedCops = await copsList;
            return 'Cops detailed saved successfully';
        }
        catch(err){
            logger.error(`saveSelectedCops -> ${err.message}`)
            ExceptionResolver(err, null);
        }
    }

    const returnSelectedCops = async() => {
      try{
        selectedCities = {};
        return selectedCops;
      }
      catch(err){
        logger.error(`returnSelectedCops -> ${err.message}`)
        ExceptionResolver(err, null);
      }
    }
    const fetchAllVehicles = async() => {
      try{
        return vehicles;
      }
      catch(err){
        logger.error(`fetchAllVehicles -> ${err.message}`);
        ExceptionResolver(err, null);
      }
    }

    const updateEligibleVehiclesList = (eligibleVehiclesList) => {
      try{
        console.log("------------------------------------------------------------------------")
        console.log("eligibleVehiclesList is !!!!!!!-----------------------------------------------------------")
        console.log(eligibleVehiclesList)
        console.log("------------------------------------------------------------------------")
        console.log("mutableVehicles is !!!!!!!-----------------------------------------------------------")
        console.log(mutableVehicles)
        console.log("------------------------------------------------------------------------")

              let newArray = [...eligibleVehiclesList];

              mutableVehicles.forEach((mutableVehicle) => {
                const index = newArray.findIndex((cityVehicle) => cityVehicle.kind === mutableVehicle.kind);
              
                if (index !== -1) {
                  newArray[index] = { ...mutableVehicle };
                }
              });
              
              
              const lastArray = newArray.filter((cityVehicle) => cityVehicle.count !== 0);
              return lastArray;
              
            }
      catch(err){
        logger.error(`updateEligibleVehiclesList -> ${err.message}`);
        ExceptionResolver(err, null);
      }
          
    };

module.exports = {fetchAllCops, cops, selectCities,updateEligibleVehiclesList,  getAvailableVehicles,fetchAllVehicles, returnSelectedCops,  updateVehiclesOnSelection, saveSelectedCops  };