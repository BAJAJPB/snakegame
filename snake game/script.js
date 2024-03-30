//Game Constants & Variables
let inputDir={x: 0, y: 0};
let foodSound= new Audio('food.mp3');
let gameOverSound= new Audio('gameover.mp3');
let moveSound= new Audio('move.mp3');
let musicSound= new Audio('music.mp3');
let speed=2;
let lastPaintTime=0;
let score=0;
let snakeArr =[
    {x: 13, y:15}
]
food={ x:6, y:8};
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //ye settimeout ka better version
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        //0.5s ke baad screen i.e.-1/2(if speed=5)
        //currenttime-lasttime /100 to convert into s
        return;
    };
    lastPaintTime=ctime;

    gameEngine();
}

function isCollide(snake){
    //jb snake khud se biddh jaaye
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y){
            // alert(" U Ate yoursel!");
            return true;


        }
    }
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0  || snakeArr[0].y>=18 || snakeArr[0].y<=0){
            // alert(" bahr nikl gye !");
        return true;
     }
    

}

function gameEngine(){
    //STEP1: Updating the snake array & Food

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir= {x:0, y:0};
        alert("Game Over !!");
        snakeArr={x: 13, y:15};
        musicSound.play();
        score=0;
    }


    //if food eaten, increment the score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="Score="+score;
        let a=1;
        let b=15;
        
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        //will give natural no.(1-15)

        for(let i=0; i<=score; i++){
            speed=speed+1/2;
        }
    }


    //moving the snake

    

    for (let i = snakeArr.length-2 ; i>=0;i--){
        const element=snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};  //nya object create ho gye iss way se 
    }

    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
    
    

    //part 2: display snake and food
    board.innerHTML="";

    //display the snake
    snakeArr.forEach((e, index) =>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        

        board.appendChild(snakeElement);

    })

    //dispalay the food
    snakeElement= document.createElement('div');
    snakeElement.style.gridRowStart =food.y;
    snakeElement.style.gridColumnStart=food.x;
    snakeElement.classList.add('food');
    board.appendChild(snakeElement);


}









//Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{

    inputDir= {x:0, y:1} 
     //Start the Game
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x=0 ;
            inputDir.y=-1;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x= +1;
            inputDir.y= 0;
            break;
        case "ArrowLeft":
            console.log("Arrow left");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});