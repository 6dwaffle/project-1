import data from './data.json' assert {type:"json"};

const Cities = ()=>{return (Object.keys(data))};
// console.log(cities);
const RepairOptions = (cityName)=>{try {return (Object.keys(data[cityName]))}catch{return []}};
const BrandOptions = (cityName,deviceType)=>{try{return(Object.keys(data[cityName][deviceType]))}catch{return []}};
const ModelOptions = (cityName,deviceType,brandName)=>{try{if (!data[cityName][deviceType][brandName]){
    return ([]);
}
else{
    return(data[cityName][deviceType][brandName])
}}catch{return []}};

export {Cities, BrandOptions, ModelOptions, RepairOptions}