let runnuingTotal = 0;
let buffer = '0';
let previousOperator = null;
const buttons = document.querySelector('.calc-buttons');
const screen = document.querySelector('.screen')

buttons.addEventListener('click', (e)=>{
  buttonClick(e.target.innerText)
});

const buttonClick = (buttonValue) => {
  console.log(buttonValue)
  if(isNaN(parseInt(buttonValue))){
    handleSymbol(buttonValue);
  }else{
    handleNumber(buttonValue)
  }
  rerender();
}

const handleSymbol = (value) =>{
switch (value){
  case 'C':
    buffer = "0";
    runnuingTotal = 0;
    previousOperator = null;
    break;

  case '=':
    if(previousOperator === null){
      return;
    }
    flushOperation(parseInt(buffer));
    previousOperator = null;
    buffer = "" + runnuingTotal;
    runnuingTotal = 0;
    break;

  case '←':
    if(buffer.length === 1){
      buffer = '0';
    }else{
      buffer = buffer.substring(0, buffer.length - 1);
    }
    break;

  default:
    handleMath(value);
    break;
  }

}

const handleMath = (value) =>{
  const intBuffer = parseFloat(buffer);
  if(runnuingTotal===0){
    runnuingTotal = intBuffer
  }else{
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer='0';
}

const flushOperation= (intBuffer)=>{
  if(previousOperator === "+"){
    runnuingTotal+= intBuffer;
  } else if(previousOperator === "-"){
    runnuingTotal-= intBuffer;
  } else if(previousOperator === "÷"){
    runnuingTotal/= intBuffer;
  } else if(previousOperator === "×"){
    runnuingTotal*= intBuffer;
  }
};

const handleNumber = (value) =>{
  if(buffer === '0'){
    buffer = value;
  }else{
    buffer += value;
  }
}

const rerender = () => {
  screen.innerText = buffer;
}