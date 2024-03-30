const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthCont]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyMsg= document.querySelector("[data-copyMsg]");
const copyBtn= document.querySelector("[data-copy]");

const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");

const indicator= document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generateBtn");
const allCheckBox= document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*()_+-=[{}|\];,./<>?/"';

let password= "";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");
//set strength circle to grey


//isme basically 5-6 func create honge
//1-> copyContent()         2-> handleSlider()
//3-> generatePassword()    4->setIndicator()[circle colour]
//5-> getRandomInteger(min,max)=> for pass
//6-> bki 3 options ke liye bhi similarly functions bnaa dena


//set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    // const min= inputSlider.min;
    // const max= inputSlider.max;
    // inputSlider.style.backgroundSize ={ ((passwordLength - min)/(max-min))*100}+"%100"
}

function setIndicator(color){
    indicator.style.backgroundColor= color;
    //shadow bhi dekhna agr possible
    indicator.style.boxShadow=`0.2px 0.5px 8px 1px ${color}`;
}

function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min)) +min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum= getRndInteger(0,symbols.length);
    return symbols.charAt[randNum];

}



function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper&& hasLower &&(hasNum || hasSym)&& passwordLength>=10){
        setIndicator("#0f0");

    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator("#ff0");

    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
         //isse copy kr skte hai
        copyMsg.innerHTML="copied";

    }
    catch(e){
        copyMsg.innerText="failed";
    }

    //to make copy wla span
    copyMsg.classList.add("active")

    setTimeout(() => {
        copyMsg.classList.remove("active")
    },2000 );
    
}




function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special condn
    if(checkCount>passwordLength){
        let mypr=new Promise((resolve, reject) => {
            reject("PLEASE HOLD");
        })
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp= array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str +=el));
    return str;

}
inputSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener("click", ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener("click",()=>{
    //none of the checkbox are selected
    if(checkCount==0){
        return;
    }
    if(passwordLength<checkCount){
        let myprom=new Promise((resolve, reject) => {
            reject("PLease choose again");
        })
    }

    //ab nya pass kesse actually aayega dekhte hai

    //remove old pass
    password="";

    //ab smjho jesse koi bhi checkbox aur length di ho
    //phle basic condn 
    //jesse sbhi checkbox jo bhi tick hai unka km se km ek 
    //ek char daalke bki jo bch gye unme kuch bhi daaldo

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
    // if(numbersCheck.checked){
    //     password +=generateRandomNumber();
    // }
    //ye approach toh theek hai but socho agr 1k checkboxes hote toh 
    //bhi yhi krte toh ab hm isse better approach se krte hai
    // isko arr mein daalke wha se select kro
    
    let funcArr= [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password +=funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex= getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    

    //shuffle the password
    password=shufflePassword(Array.from(password));

    //display pass
    passwordDisplay.value=password;

    calcStrength();

    
});

//jb glitch aaye between pass length and checkboxes tb dekho

// console.log(Math.floor(Math.random()*2));