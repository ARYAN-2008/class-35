var redball;
var database;
var position;

function setup(){
    database=firebase.database();
    createCanvas(500,500);

    redball = createSprite(250,250,40,40);
    redball.shapeColor = "red";

    var redballPosition=database.ref('ball/position');
    redballPosition.on("value", readPosition, showError);
}

function draw(){
    background("yellow");
    if(keyDown(LEFT_ARROW)){
        writePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(2,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+2);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
    'x':position.x + x,
    'y':position.y + y
    })
}

function readPosition(data){
position=data.val();
redball.x=position.x;
redball.y=position.y;

}

function showError(){
    console.log("Error in writing in the database");
}
