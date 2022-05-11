var trex, trex_running, edges,sprite, nubes, nube,algodon;
var groundImage,cactus,cactus2,cactus3,cactus_var,nopal;
var suelo,trex_suprise,reset,gameover,reset2,gameover2,morir,cargar,saltar;
var puntacion = 0;
var gamestate = "play";

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nubes = loadImage("cloud.png");
  cactus = loadImage ("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  trex_suprise = loadAnimation("trex_collided.png");
  reset2 = loadImage("restart.png");
  gameover2 = loadImage("gameOver.png");
  saltar = loadSound("jump.mp3");
  morir = loadSound("die.mp3");
  cargar = loadSound("checkpoint.mp3")
}



function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //crear sprite de Trex
   sprite = createSprite(50,height -33,400,20);
   sprite.visible = false ;  
   trex = createSprite(50,height - 100,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("trex_suprise", trex_suprise);
    trex.debug = false ;
    edges = createEdgeSprites();
    suelo = createSprite(200,height -50,400,20);
    suelo.velocityX = -2;
    reset = createSprite(width/2,height/2,50,100);
    reset.visible = false ;
    reset.scale = 0.9 /2;
    reset.addImage("reset",reset2);
    gameover = createSprite(width/2,height/2-25,50,100);
    gameover.visible = false ;
    gameover.scale = 0.9 /2 ;
    gameover.addImage("gameover",gameover2);
   algodon = new Group();
   nopal = new Group();
    
   suelo.addImage("ground2.png",groundImage);
    //agregar tamaño y posición al Trex 
    trex.scale = 0.5;
    trex.x = 50

    var rand = Math.round(random(7,9));
    console.log(rand);
    
    
  }

  

  function draw(){
    //establecer color de fondo.
    console.log(trex.y);
    background("white");
    text ("puntos . . " + puntacion,width - 100,50)
    if (gamestate == "play"){
      if(touches.length > 0 || keyDown("space" ) && trex.y > height-70 ){
        trex.velocityY = -10;
        saltar.play();
       touches = [] 
      }
      suelo.velocityX = - (3+3*puntacion /100);
      if(puntacion % 100 === 0 && puntacion > 0 ){
       cargar.play();
       
      }
      trex.velocityY = trex.velocityY + 0.8;
        
      if (suelo.x < 0){       
        suelo.x =  suelo.width /2;

      }
      spawnClouds();
      cactusspawn();

      puntacion  += Math.round (getFrameRate()  /60);
      if(trex.isTouching (nopal) ){
        gamestate = "end";
        morir.play();
      }
    }else if (gamestate == "end"){
      algodon.setVelocityXEach(0);
      nopal.setVelocityXEach(0);
      suelo.velocityX = 0 ;
      algodon.setLifetimeEach(-1);
      nopal.setLifetimeEach(-1);
      trex.changeAnimation("trex_suprise",trex_suprise);
      reset.visible = true ;
      gameover.visible = true ;
      trex.velocityY = 0;
      if(mousePressedOver(reset) || keyDown("space") ){
        gamestate = "play";
        nopal.destroyEach();
        algodon.destroyEach();
        reset.visible = false ;
        gameover.visible = false;
        puntacion = 0 ;
        trex.changeAnimation("running",trex_running);
        
      }
      

    }
    
    //cargar la posición Y del Trex
    // console.log(trex.y)
  
    //hacer que el Trex salte al presionar la barra espaciadora
    
    
    
  
  

  
  //evitar que el Trex caiga
  trex.collide(sprite);

  drawSprites();
}


function spawnClouds(){ 
  // console.log(frameCount);

  //nubes aleatorias
  if(frameCount %  130 === 0){
    nube = createSprite(width,height -100,40,10);
    nube.addImage("cloud.png",nubes);
    nube.y = random(0,130);
    nube.velocityX = random (-6,-9) ;
    nube.lifetime = 300;
    //profundidad
    nube.depth = trex.depth;
    trex.depth += 1;
    algodon.add(nube);
    nube.velocityX = - (2+3*puntacion /100);
  }

}
function cactusspawn(){ 
  

  //nubes aleatorias
  if(frameCount % 130  === 0){

     var cactusrandom = Math.round(random(1,3))

    cactus_var = createSprite(width,height - 70 ,40,10);
    switch(cactusrandom){
      case 1 : cactus_var.addImage("rajas",cactus);
      break;
      case 2 : cactus_var.addImage("rajas",cactus2);
      break;
      case 3 : cactus_var.addImage("rajas",cactus3);
      break;
      default : break;
    }
   cactus_var.scale = 0.5
    
    cactus_var.velocityX = random (-6,-9) ;
    cactus_var.lifetime = 300;
    
    nopal.add(cactus_var);
    cactus_var.velocityX = - (3+3*puntacion /100);

  }

}



