var PLAY=1;
var END = 3;
var Reset = 0;
var gameState = Reset;

var Point = 0;

function preload(){
  
  pogoLogo = loadImage("pokemon_logo_PNG5.png");
  rB = loadImage("download.png");
  sb = loadImage("startbutton.png");
  ashGrey = loadImage("ashwithgreninja.png");
  Giovanni = loadImage("Giovanni_Masters.png");
  inf = loadImage("info_logo.png");
  infinite = loadImage("back.png");
  ashRunning = loadAnimation("ashrun1.png","ashrun2.png","ashrun3.png","ashrun4.png");
  pokeball = loadImage("pokeball.png");
  vilan = loadAnimation("b1.png","b2.png","b3.png","b4.png");
  cC = loadSound("coin.mp3");
  grunt1 = loadAnimation("w1.png","w2.png","w3.png","w4.png");
  grunt2 = loadAnimation("w5.png","w6.png","w7.png","w8.png");
  grunt3 = loadAnimation("gr1.png","gr2.png","gr3.png","gr4.png");
  grunt4 = loadAnimation("gr5.png","gr6.png","gr7.png","gr8.png");
  gameOverImg = loadImage("GO.png");
  ashF = loadAnimation("ashFall.png");
  GioWon = loadAnimation("Lose.png");
  jumpSound = loadSound("jump.mp3");
  INFO = loadImage("INFO.png");
  backB = loadImage("backB.png");
  resetB = loadImage("Reset.png");
  bgM = loadSound("song.mp3");
  pidgey = loadAnimation("p0.png","p1.png","p2.png","p3.png","p4.png");
  
}

function setup() {
  
  createCanvas(1000,500);
  
  bG = createSprite(500,250);
  bG.addImage(rB);
  bG.scale=3.5;
  
  pogoL = createSprite(350,130);
  pogoL.addImage(pogoLogo);
  
  startB = createSprite(350,250);
  startB.addImage(sb);
  startB.scale=0.5;
  
  ashO = createSprite(120,350);
  ashO.addImage(ashGrey);
  ashO.scale=0.35;
  
  gio = createSprite(795,250);
  gio.addImage(Giovanni);
  
  info = createSprite(355,350);
  info.addImage(inf);
  info.scale = 0.23;
  
  moving = createSprite(300,200);
  moving.addImage(infinite);
  moving.scale=1.36;
  moving.visible=false;
  
  invGround = createSprite(500,482,3000,75);
  invGround.visible=false;
  
  ash = createSprite(150,350)
  ash.addAnimation("ashR",ashRunning);
  ash.visible=false;
  ash.scale=3
  
  vila=createSprite(30,300);
  vila.addAnimation("vil",vilan);
  vila.scale=2;
  vila.visible=false;
  
  gmOver = createSprite(500,250);
  gmOver.addImage(gameOverImg);
  gmOver.scale=0.4;
  gmOver.visible=false;
  
  inf = createSprite(500,250,1000,500);
  inf.addImage(INFO);
  inf.visible=false;
  
  bB = createSprite(50,50);
  bB.addImage(backB);
  bB.visible=false;
  bB.scale=0.4;
  
  bb = createSprite(50,50);
  bb.addImage(backB);
  bb.visible=false;
  bb.scale=0.4
  
  reset = createSprite(150,50);
  reset.addImage(resetB);
  reset.scale=0.3;
  reset.visible=false;
  
bgM.play();
bgM.setVolume(0.4)
  
      
  pokeballGroup=createGroup();
  GruntsG  = createGroup();
 
}

function draw() {
  
  background("white");
  drawSprites();
  
      
  
  if(mousePressedOver(startB) && gameState===Reset)
    {
      bG.visible=false;
      info.visible=false;
      gio.visible=false;
      ashO.visible=false;
      pogoL.visible=false;
      startB.visible=false;
      
      gameState=PLAY;
    }
  
  if(mousePressedOver(bb) && gameState===Reset){
    
    bb.visible=false;
    inf.visible=false;
  }
  
  
  if(mousePressedOver(bB) && gameState===END){
    gameState=Reset;
      bB.visible=false;
  }
  
  if(mousePressedOver(info) && gameState===Reset)
    {
      bG.visible=false;
      info.visible=false;
      gio.visible=false;
      ashO.visible=false;
      pogoL.visible=false;
      startB.visible=false;
      inf.visible=true;
      
      bb.visible=true;
    }
  
  if(mousePressedOver(reset) && gameState===END){
    gameState=PLAY;
  }
  
  if(gameState===PLAY)
    {
      
      textSize(32);
      text("Points: "+ Point,500,100);
      
      bgM.setVolume(0.5);
      
      moving.visible=true;
      moving.velocityX=-4;
      
      gmOver.visible=false;
      reset.visible=false;
      bB.visible=false;
      
      ash.velocityY = ash.velocityY + 0.5;  
      ash.collide(invGround);
      ash.debug=false;
      ash.visible=true;
      ash.changeAnimation("ashR")
      ash.setCollider("rectangle",0,0,18,24);
      
      
      if(keyDown("space") && ash.y >= 408.5 && gameState===PLAY){
        ash.velocityY = -12;
        jumpSound.play();
      }
      
      if (moving.x < 0){
           moving.x = moving.width/2;
      }
      
      
      
      vila.visible=true;
      vila.collide(invGround);
      vila.setCollider("rectangle",0,0,25,50);
      vila.changeAnimation("vil");
      vila.velocityY = vila.velocityY + 0.7;
      vila.debug=false;
      
      if(ash.isTouching(pokeballGroup)){
        cC.play();
        pokeballGroup.destroyEach();
        Point = Point+1;
      }
      
      if(GruntsG.isTouching(ash)){
        gameState=END;
      }
      
      GruntsG.collide(invGround);
      
      Grunts();
      PokeBall();
      birds();
      
    } 
  
  if(gameState===END){
    bgM.setVolume(0.1);
    bB.visible=true;
    reset.visible=true;
    moving.velocityX=0;
    GruntsG.setVelocityXEach(0);
    invGround.velocityX=0;
    pokeballGroup.setVelocityXEach(0);
    ash.velocityY=0; 
    vila.velocityY=0;
    pokeballGroup.destroyEach();
    GruntsG.destroyEach();
    Point=0;
    gmOver.visible=true;
    
    ash.addAnimation("AshFALL",ashF);
    ash.changeAnimation("AshFALL");
    
    vila.addAnimation("gio",GioWon);
    vila.changeAnimation("gio");
  }
  
  if(gameState===Reset){
      gmOver.visible=false;
      vila.visible=false;
      ash.visible=false;
      moving.visible=false;
      bG.visible=true;
      info.visible=true;
      gio.visible=true;
      ashO.visible=true;
      pogoL.visible=true;
      startB.visible=true;
      reset.visible=false;
      bgM.setVolume(0.3);
  }
  
  
  
  if (moving.x < 0){
      moving.x = moving.width/2;
    }
  
  
  
  
}

function PokeBall(){
  
  if(frameCount % 170 === 0)
        {
          pokeballC = createSprite(1000,Math.round(random(250,430)));
          pokeballC.addImage(pokeball);
          pokeballC.scale=0.035
          pokeballC.velocityX=-6;
          pokeballC.lifetime=180;
          
          pokeballGroup.add(pokeballC);
        }
  
}

function Grunts(){
  
  if(frameCount % 150 === 0)
    {
      grunt = createSprite(1000,407)
      grunt.velocityX=-7;
      grunt.collide(invGround);
      grunt.velocityY = grunt.velocityY + 1;
      grunt.scale=1.85;
      GruntsG.add(grunt);     
      grunt.setCollider("rectangle",0,0,30,45)
      grunt.debug=false;
      grunt.lifetime=180;
    
      
      var select_oppPlayer = Math.round(random(1,4));
      
      if(select_oppPlayer == 1) {
        grunt.addAnimation("GRUNT1",grunt1);
      }else if(select_oppPlayer == 2){
        grunt.addAnimation("GRUNT2",grunt2);
      }else if(select_oppPlayer == 3){
        grunt.addAnimation("GRUNT3",grunt3);
      }else if(select_oppPlayer == 4){
        grunt.addAnimation("GRUNT4",grunt4);
      }
      
    }
  
}

function birds(){
  if(frameCount % 130 === 0)
    {
      var select_opp = Math.round(random(1,3));
      
      if(select_opp == 1){
      pidge = createSprite(1100,150);
      pidge.addAnimation("fly",pidgey);
      pidge.changeAnimation("fly");
      pidge.lifetime=180;
      pidge.velocityX=-7;
      pidge.scale=0.4;
      
      pidg = createSprite(1125,100);
      pidg.addAnimation("fly",pidgey);
      pidg.changeAnimation("fly");
      pidg.velocityX=-7;
      pidg.lifetime=180;
      pidg.scale=0.4;
      
      pid = createSprite(1125,200);
      pid.addAnimation("fly",pidgey);
      pid.changeAnimation("fly");
      pid.velocityX=-7;
      pid.lifetime=180;
      pid.scale=0.4;
      }
      
      if(select_opp == 2){
      bidge = createSprite(1100,150);
      bidge.addAnimation("fly",pidgey);
      bidge.changeAnimation("fly");
      bidge.velocityX=-7;
      bidge.lifetime=180;
      bidge.scale=0.4;
      
      bidg = createSprite(1125,100);
      bidg.addAnimation("fly",pidgey);
      bidg.changeAnimation("fly");
      bidg.velocityX=-7;
      bidg.scale=0.4;
      
      bid = createSprite(1125,200);
      bid.addAnimation("fly",pidgey);
      bid.changeAnimation("fly");
      bid.velocityX=-7;
      bid.lifetime=180;
      bid.scale=0.4;
        
      bi = createSprite(1175,150);
      bi.addAnimation("fly",pidgey);
      bi.changeAnimation("fly");
      bi.velocityX=-7;
      bi.lifetime=180;
      bi.scale=0.4;
      }
      
      if(select_opp == 3){

      pidg = createSprite(1125,100);
      pidg.addAnimation("fly",pidgey);
      pidg.changeAnimation("fly");
      pidg.velocityX=-7;
      pidg.lifetime=180;
      pidg.scale=0.4;
      
      pid = createSprite(1125,200);
      pid.addAnimation("fly",pidgey);
      pid.changeAnimation("fly");
      pid.velocityX=-7;
      pid.lifetime=180;
      pid.scale=0.4;
      }
      
      

    }
}