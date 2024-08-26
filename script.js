//light @ dark theme
const toggleelement=document.querySelector(".themes__toggle");
const darkthemetoggle= () =>{toggleelement.classList.toggle("themes__toggle--isActive");};
toggleelement.addEventListener("click",darkthemetoggle)


// replace mode with enter key
const togglebyenter=(e)=>{
    if(e.key==="Enter"){darkthemetoggle();}
}
toggleelement.addEventListener("keydown",togglebyenter);


//logic code******************************************
let storedNumber="";
let currentNumber="";
let operation="";


//مسك العناصر اللي هتعامل معاها
const resultelement=document.querySelector(".calc__result");  //screen
const keyelements=document.querySelectorAll("[data-type]"); //buttons


//دالة خاصة بالعرض علي الشاشة
const updateUi=(value)=>{
    resultelement.innerText = !value ? "0" : value;
};


//هل تم الضغط علي الصفر او النقطه
const numberButtonHandler=(value)=>{
    if(value ==="."&& currentNumber.includes(".")) return;
    if(value ==="0"&& !currentNumber) return;
    currentNumber+=value;
    updateUi(currentNumber);
};


//دالة الريسيت
const resetButtonHandler=() =>{
     storedNumber="";
     currentNumber="";
     operation="";
     updateUi(currentNumber);

};


// دالة الحذف
const deleteButtonHandler=() =>{
if(!currentNumber || currentNumber ==="0") return;
if(currentNumber.length === 1){currentNumber=""}else{
currentNumber=currentNumber.substring(0,currentNumber.length-1);
}
updateUi(currentNumber);
};


// الدالة الخاصة بالعمليات الحسابية
const executeOperation=()=>{
if(currentNumber && storedNumber && operation){
switch(operation){
    case"+":storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);break;
    case"-":storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);break;
    case"*": storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);break;
    case"/": storedNumber = parseFloat(storedNumber)/parseFloat(currentNumber);break;
}
currentNumber="";
updateUi(storedNumber);
}
}




const operationButtonHandler=(operationValue)=>{
if(!storedNumber && !currentNumber )return;    //لو فاضيين متعملش حاجه

if(currentNumber && !storedNumber){
storedNumber=currentNumber;
currentNumber="";
operation = operationValue;
}else if(storedNumber){
    operation=operationValue;
if(currentNumber) executeOperation();
}
}


// الدالة الرئيسية
const keyElementHandler=(element) =>{
    element.addEventListener("click",()=>{
        const type=element.dataset.type;
        if(type==="number"){
            numberButtonHandler(element.dataset.value)
        }else if(type==="operation"){
            switch(element.dataset.value){
case"Delete":resetButtonHandler();break;  //reset button
case"Backspace":deleteButtonHandler();break;  //delete button
case"Enter":executeOperation();break;  //equal button
default:operationButtonHandler(element.dataset.value);
            }
        }
            });
};
keyelements.forEach(keyElementHandler);


//use keyboard
const numbersinput=["0","1","2","3","4","5","6","7","8","9","."];
const operationsinput=["+","-","*","/"];

const keysinput=[...numbersinput ,...operationsinput,"Backspace","Enter","Delete"];

//هنا بيشوف الزر اللي تم الضغط عليه نوعه اي وبناءا علي ذلك يتم تنفيذ الامر المناسب
window.addEventListener("keydown",(e) =>{
  //  const key=e.key;
  //  keyboardwithouthover(e.key);
    keyboardwithhover(e.key);
});

/* const keyboardwithouthover=(key)=>{
    if(numbersinput.includes(key)){
        numberButtonHandler(key);
    }else if(operationsinput.includes(key)){
        operationButtonHandler(key);
    }else if(key === "Backspace"){
        deleteButtonHandler();
    }else if(key==="Enter"){
    executeOperation();
    }
    else if(key==="Delete"){
        resetButtonHandler();
        }
} */


const keyboardwithhover=(key)=>{
if(keysinput.includes(key)){
const element=document.querySelector(`[data-value="${key}"]`);
element.classList.add("hover");
element.click();
setTimeout(()=>element.classList.remove("hover"),100);
}
};
