import express from 'express';
import {Cities, BrandOptions, ModelOptions, RepairOptions} from '../info.js'
const router = express.Router();

router.get('/',(req,res)=>{
    console.log('GET success \\cities fetched');
    const cities = Cities();
    res.send(cities);
})

router.post('/repair',(req,res)=>{
    console.log('POST success repair options fetched');
    const city = req.body[Object.keys(req.body)[0]];
    res.send(RepairOptions(city));
})
router.post('/brand',(req,res)=>{
    console.log('POST success brand options fetched');
    const info = Object.keys(req.body);
    const city = req.body[info[0]];
    const repair = req.body[info[1]];
    res.send(BrandOptions(city,repair));
});
router.post('/model',(req,res)=>{
    console.log('POST success model options fetched');
    const info = Object.keys(req.body);
    const city = req.body[info[0]];
    const repair = req.body[info[1]];
    const brand = req.body[info[2]];
    res.send(ModelOptions(city,repair,brand));
});

export default router;