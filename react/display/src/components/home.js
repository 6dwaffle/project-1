import React,{useState,useEffect, useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { LoremIpsum } from "lorem-ipsum";
import rn from 'random-number'
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 20,
    min: 10
  },
  wordsPerSentence: {
    max: 20,
    min: 8
  }
});

//styles
const Background = styled.section`
background-image: linear-gradient(to right, black , grey);
width: 100vw;
height: 100vh;
`
const Box = styled.div`
background-color: #202020;
color: #fff;
position: relative;
width: 60%;
height: 80%;
justify-content: center;
top: 10%;
left:20%;
`
const Home = () => {
  // values
  const [randomText, setRandomText] = useState(lorem.generateParagraphs(1)+"");
  const [cityList, setCityList] = useState([]);
  const [repairList, setRepairList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [modelNoList, setModelNoList] = useState([]);
  const [cityValue, setCityValue] = useState('');
  const [repairValue,setRepairValue] = useState('');
  const [brandValue,setBrandValue] = useState('');
  const [modelValue,setModelValue] = useState('');
  //api calls
  
  const options ={min:0,max:randomText.length,integer:true}
  const isInitialMount = useRef(true);
  useEffect(() =>{
    const fetchCity = async()=>{ if (isInitialMount.current) {
      isInitialMount.current = false;
   } else{
      try{
        await axios.get('http://localhost:8080/api').then((response)=>{setCityList(response.data)
      })
    }
    catch(err){
      if (err.response){
        console.error(err.response.data);
        console.error(err.response.status);
      }
      else{
          console.log(err.message)
        }
      }
    }
  }
    fetchCity()
  })
  
  useEffect(() =>{
    const fetchRepair = async()=>{
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else{
        try{
          await axios.post('http://localhost:8080/api/repair',{"city":cityValue}).then((response)=>{setRepairList(response.data)})
        }
        catch(err){
          if (err.response){
            console.error(err.response.data);
            console.error(err.response.status);
          }
          else{
            console.log(err.message)
        }
      }
    }
  }
  fetchRepair()
})
useEffect(() =>{
  const fetchBrand = async()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else{
      try{
        await axios.post('http://localhost:8080/api/brand',{"city":cityValue,"device":repairValue}).then((response)=>{setBrandList(response.data)})
      }
      catch(err){
        if (err.response){
          console.error(err.response.data);
          console.error(err.response.status);
        }
        else{
          console.log(err.message)
        }
      }
    }
  }
  fetchBrand()
})
useEffect(() =>{
  const fetchModel = async()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else{
      try{
        await axios.post('http://localhost:8080/api/model',{"city":cityValue,"device":repairValue,"brand":brandValue}).then((response)=>{setModelNoList(response.data)})
      }
      catch(err){
        if (err.response){
          console.error(err.response.data);
          console.error(err.response.status);
        }
        else{
          console.log(err.message)
        }
      }
    }
  }
  fetchModel()
})
const wordFind = ()=>{
  let gen = rn.generator(options);
  let index = gen();
  let result = []
  for (let i=0;i<2;i++){
  while (randomText[index]!=" "|| randomText[index]=="."){
    index = gen()
  }
  index+=1;
  let word = ""
  while (randomText[index]!=" "){
    word+=randomText[index]
    index+=1;
  }
  result.push(word)
}
  return (result)
}
const twoFunc1 = (e) =>{
  let newText = lorem.generateParagraphs(1);
  setCityValue(e);
  
  setRandomText(newText)
  console.log(e)
  
  const replaceWords = wordFind()
  newText = newText.replace(replaceWords[0], e)
  newText = newText.replace(replaceWords[1], e)
  setRandomText(newText)
  console.log(newText)
}
const twoFunc2 = (e) =>{
  setRepairValue(e)
  console.log(e)
  let newText = randomText
  console.log(newText)
  const replaceWords = wordFind()
  newText = newText.replace(replaceWords[0], e)
  newText = newText.replace(replaceWords[1], e)
  setRandomText(newText)
  console.log(newText)
}
const twoFunc3 = (e) =>{
  setBrandValue(e)
  console.log(e)
  let newText = randomText
  console.log(newText)
  const replaceWords = wordFind()
  newText = newText.replace(replaceWords[0], e)
  newText = newText.replace(replaceWords[1], e)
  setRandomText(newText)
  console.log(newText)
}
const twoFunc4 = (e) =>{
  setModelValue(e)
  console.log(e)
  let newText = randomText
  const replaceWords = wordFind()
  newText = newText.replace(replaceWords[0], e)
  newText = newText.replace(replaceWords[1], e)
  setRandomText(newText)
  console.log(newText)
}
//render
return (
  <Background>
      <Box>
    <select value={cityValue} onChange={(e)=>twoFunc1(e.target.value)}>
      <option selected >--Select--</option>
      {
        cityList.map((x) =>(<option title=''>{x}</option>))
      }
    </select>
    <select value={repairValue} onChange={(e)=>twoFunc2(e.target.value)}>
      <option selected>--Select--</option>
      {
        repairList.map((x) =>(<option title=''>{x}</option>))
      }
    </select>
    <select value={brandValue} onChange={(e)=>twoFunc3(e.target.value)}>
      <option selected>--Select--</option>
      {
        brandList.map((x) =>(<option title=''>{x}</option>))
      }
    </select>
    <select value={modelValue} onChange={(e)=>twoFunc4(e.target.value)}>
      <option selected>--Select--</option>
      {
        modelNoList.map((x) =>(<option title=''>{x}</option>))
      }
    </select>
    <p>{randomText}</p>
    </Box>
    </Background>
  )
}

export default Home