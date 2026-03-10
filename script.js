const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const dropdown=document.querySelectorAll(".dropdown select")
  const btn=document.querySelector("form button")
  const fromcurr=document.querySelector(".from select")
  const tocurr=document.querySelector(".to select")
  let updatemsg=document.querySelector(".msg")
  
  for(let select of dropdown){
    for(curentcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curentcode;
        newOption.value=curentcode;
        if(select.name==="from" && curentcode==="USD"){
            newOption.selected="selected"
        }
        else if(select.name==="to" && curentcode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
  }
const updateflag=(element)=>{
  let currcode=element.value;
  let countrycode=countryList[currcode];
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
  let img=element.parentElement.querySelector("img")
  img.src=newsrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtval=amount.value;
    if(amtval===""|| amtval<1){
        amount.value="1"
    }
   // console.log(fromcurr.value,tocurr.value)
    
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate)
     let finalAmount = amtval * rate;
    //console.log(finalAmount)
    updatemsg.innerText=`${amtval} ${fromcurr.value} =${finalAmount} ${tocurr.value}`
    //console.log(updatemsg)
})

