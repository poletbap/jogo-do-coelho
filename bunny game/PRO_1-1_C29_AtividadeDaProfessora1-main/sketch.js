const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground;
var rope, rope2, rope3;
var fruit, fruit_con, fruit_con2, fruit_con3;
var bg_img, fruit_img, bunny_img;
var button, button2, button3;
var blink
var eat
var sad
var bkSound, cutSound, sadSound, eatSound, airSound;
var blower
var muteSound;
let engine;
let world;

function preload(){
bg_img = loadImage("background.png");
fruit_img = loadImage("melon.png");
bunny_img = loadImage("Rabbit-01.png");
blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
eat = loadAnimation("eat_0.png","eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
bkSound = loadSound("sound1.mp3");
sadSound = loadSound("sad.wav");
cutSound = loadSound("rope_cut.mp3");
eatSound = loadSound("eating_sound.mp3");
airSound = loadSound("air.wav");

blink.playing = true;
eat.playing = true;
eat.looping = false;
sad.playing = true;
sad.looping = false;

}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  bkSound.play();
  bkSound.setVolume(0.5);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;


  ground = new Ground(200,690,600,20);
  
  var fruit_options = {
    density: 0.001
  }
  

  button= createImg("cut_btn.png");
  button.position(20,30);
  button.size (50,50);
  button.mouseClicked(drop);

  button2= createImg("cut_btn.png");
  button2.position(330,35);
  button2.size (60,60);
  button2.mouseClicked(drop2);

  button3= createImg("cut_btn.png");
  button3.position(360,200);
  button3.size (60,60);
  button3.mouseClicked(drop3);



  blower = createImg("balloon.png");
blower.position(10,250);
blower.size(150,100);
blower.mouseClicked(blow);

muteSound = createImg("mute.png");
muteSound.position(450,20);
muteSound.size (50,50);
muteSound.mouseClicked(mute);

bunny = createSprite(420,620,100,100);
  bunny.addImage(bunny_img);
  bunny.scale = 0.25;
  bunny.addAnimation("blinkin",blink);
  bunny.addAnimation("eating",eat);
  bunny.changeAnimation("blinkin");
  bunny.addAnimation("crying",sad);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

fruit = Bodies.circle(280,0,20,fruit_options);
  Matter.Composite.add(rope.body,fruit);
fruit_con = new Link(rope,fruit);
fruit_con2 = new Link(rope2,fruit);
fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  
}

function draw() 
{
  
  
  background(51);
  
  image(bg_img,width/2,height/2, 500, 700);


  //ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  //image(fruit_img,fruit.position.x,fruit.position.y,60,60);
  ground.show();
 push();
 imageMode(CENTER);
  if(fruit != null ){
  image(fruit_img,fruit.position.x,fruit.position.y -120,60,60);
  
  }
  pop();
  rope.show();
  rope2.show();
  rope3.show();
 drawSprites();
 
 if(colide(fruit,bunny)== true){
  bunny.changeAnimation("eating");
  eatSound.play();
  }

  if(fruit != null&& fruit.position.y >=650){
bunny.changeAnimation("crying");
bkSound.stop();
sadSound.play();
fruit = null;
  }
  //if(coliide(fruit,ground.body)== true){
  //bunny.changeAnimation("crying");
//}
}


function drop(){
rope.break();
fruit_con.detach();
fruit_con = null;
cutSound.play();

}

function colide(body,sprite){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d <= 80){
    World.remove(engine.world,fruit);
    fruit = null;
    return true;
    } 
    else {
      return false;
    }
  }
}


function blow() {
 Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
airSound.play();
}


function mute(){
  if(bkSound.isPlaying()){
 bkSound.stop();
  }
  else{
    bkSound.play();
  }
}


function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cutSound.play();
}



function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3= null;
  cutSound.play();
}