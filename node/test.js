const gen = ()=>{return(parseInt(Math.random() * 10))}
const randomText = "dsjnd jerhadndnn lflak ";
let index = gen()
for (let i=0; i<2;i++){
while (randomText[index]!=" "){
      index = gen()
      console.log(index)
    }
    index+=1;
    let word = "";
    while (randomText[index]!=" "){
      word+=randomText[index]
      index+=1;
      console.log(index)
    }
    console.log(word)
}