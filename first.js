let boxes=document.querySelectorAll(".box");
let resbtn=document.querySelector("#reset-button");
let winnerText=document.querySelector(".winner-text");
let msg=document.querySelector("#msg1");
let msg2=document.querySelector("#msg2");
let newGame=document.querySelector("#new-game");
let count=0;
let win=false;

let turnO=true;

const winptt=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    winnerText.classList.add("hide");
    count=0;
    win=false;
    for(let box of boxes){
        box.classList.remove("winning-box");
    }
    
}

boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        count++;
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
        if(count===9){
            if(win===false){
                draw();
            }
        }
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const draw=()=>{
    msg.innerText = drawMsgs[Math.floor(Math.random() * drawMsgs.length)];
    winnerText.classList.remove("hide");
    disableBoxes();
}
const showWinner=(winner)=>{
    msg.innerText=`User ${winner} wins, \n`
    msg2.innerText = winMsgs[Math.floor(Math.random() * winMsgs.length)];
    winnerText.classList.remove("hide");
    disableBoxes();
};

const drawMsgs = [
  "You both are \nequally Smart or \nequally Dumb",
  "Both of you played perfectly",
  "Keep playing untill \none of you mess up",
];

const winMsgs = [
  "your friend really needs more practice.",
  "Winner winner, chicken dinner!",
  "You're officially awesome!"
];

const checkWinner=()=>{
    for(let ptt of winptt){
        let pos1=boxes[ptt[0]].innerText;
        let pos2=boxes[ptt[1]].innerText;
        let pos3=boxes[ptt[2]].innerText;

        if(pos1!=="" && pos1===pos2 && pos2===pos3){
            boxes[ptt[0]].classList.add("winning-box");
            boxes[ptt[1]].classList.add("winning-box");
            boxes[ptt[2]].classList.add("winning-box");
            showWinner(pos1);
            win=true;
    
        }
    }
};

resbtn.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);