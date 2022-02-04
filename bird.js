 let cvs = document.querySelector("#flappybird");
let ctx = cvs.getContext("2d");
let bird = document.createElement('img');


bird.src = "images/bird1.png";
 

let bg = document.createElement('img');
bg.src = "images/bg.png";
let pipeUp = document.createElement('img');
pipeUp.src = "images/pipeUp.png";
let pipeBottom = document.createElement("img")
pipeBottom.src = "images/pipeBottom.png";
let fg = document.createElement('img');
fg.src = "images/fg.png";

let xPos = 50;
let yPos = 250;
let grav = 0.3;
let change = 5;
let score = 0;

let pipes_x = [cvs.width, cvs.width+250];
let pipes_y = [0, -100];
let gap = 110;

document.addEventListener('click', function () {
    grav = 0;
    change = 0;
    yPos -= 5;
    grav = 0.3;
    change = 5;
});


function draw() {
    ctx.drawImage(bg,0,0);
    for (i=0; i<pipes_x.length; i++) {
        ctx.drawImage(pipeUp,pipes_x[i],pipes_y[i]);
        ctx.drawImage(pipeBottom,pipes_x[i],pipes_y[i] + pipeUp.height + gap);
        pipes_x[i] -=2;
        if (pipes_x[i] < 50) {
            pipes_x.push(pipes_x[pipes_x.length - 1] + 250);
            pipes_y.push(Math.floor(Math.random()*pipeUp.height) - pipeUp.height);
        }
        if (xPos + bird.width >= pipes_x[i] && xPos <= pipes_x[i] + pipeUp.width && (yPos <= pipes_y[i] + pipeUp.height || yPos + bird.height >= pipes_y[i] + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            pipes_x = [cvs.width];
    pipes_y = [0];
    score = 0;
    xPos = 10;
    yPos = 150;
    change = 5;
        }
        if (xPos == pipes_x[i - 1] + pipeUp.width + 2) {
            score +=1;
        }

    }
    ctx.drawImage(fg,0,394);
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Счет:" + score, 20, cvs.height - 44);
    yPos -= change;
    change -= grav;
    if (change > 0) {
        bird.src = "images/bird1_up.png";
    } 
    else {
        bird.src = "images/bird1_down.png";
    }

    ctx.drawImage(bird,xPos,yPos);
    
}


setInterval(draw,25)
