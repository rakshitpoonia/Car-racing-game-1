var ball,database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database=firebase.database();
    var ballPosition=database.ref('Ball/position');
    ballPosition.on("value",readposition,error);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
       writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    
    database.ref('Ball/position').set({
        'x':position.x+x,
        'y':position.y+y,
    })
}
function readposition(data){
position=data.val();
ball.x=position.x;
ball.y=position.y;
}
function error(){
    console.log("error in writing to database");
}