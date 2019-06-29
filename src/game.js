/**
* Foutre le bordel chez Bezies.
* 
* Un jeu à prendre sur le ton de l'humour
*/

// Initialisation du jeu

var gameOptions = {
	renderer: Kiwi.RENDERER_CANVAS,
	width: 860,
	height: 600
};

var game = new Kiwi.Game("content", 'Bordel Bezies', null, gameOptions);
var myState = new Kiwi.State('myState');
var boite_fall = false;
var manteaux_fall = false;
var vitesse = 0;
var gravity = 9.81;
var coeff = 0.1;

myState.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.addImage('background','assets/background.png');
    this.addSpriteSheet('boite_1','assets/boite_1.png',100,100);
    this.addSpriteSheet('manteaux','assets/manteaux.png',100,500);
    this.addSpriteSheet('porte','assets/porte.png',165,506);
    this.addAudio( 'boom' , 'assets/boom.mp3');
    this.addAudio( 'chute' , 'assets/chute.mp3');
    this.addAudio( 'grincement' , 'assets/grincement.mp3');
}

myState.create = function(){
    Kiwi.State.prototype.create.call(this);
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['background'], 10, 10);
    this.boite_1 = new Kiwi.GameObjects.Sprite(this,this.textures.boite_1,483,44);
    this.manteaux = new Kiwi.GameObjects.Sprite(this,this.textures.manteaux,325,225);
    this.porte = new Kiwi.GameObjects.Sprite(this,this.textures.porte,606,113);
    this.addChild(this.background);
    this.addChild(this.boite_1);
    this.addChild(this.manteaux);
    this.addChild(this.porte);
    this.boom = new Kiwi.Sound.Audio(this.game, 'boom', 1, false);
    this.chute = new Kiwi.Sound.Audio(this.game, 'chute', 1, false);
    this.grince = new Kiwi.Sound.Audio(this.game, 'grincement', 1, false);
    this.boite_1.input.onRelease.addOnce(this.drop, this);
    this.manteaux.input.onRelease.addOnce(this.clothes, this);
    this.porte.input.onRelease.addOnce(this.door, this);
}

myState.update = function(){
   Kiwi.State.prototype.update.call(this);
   if (boite_fall)
   {
     if (this.boite_1.transform.y < 600)
     {
        vitesse += gravity*coeff;
        this.boite_1.transform.y += vitesse;
     }
     else
     {
        this.boom.play();
        boite_fall = false;
     }
   }
   if (manteaux_fall)
   {
    if (this.manteaux.transform.y < 600)
    {
       vitesse += gravity*coeff;
       this.manteaux.transform.y += vitesse;
    }
    else
    {
       this.chute.play();
       manteaux_fall = false;
    }
   }

};

myState.drop = function () {
    boite_fall = true;
    vitesse = 0;
}

myState.clothes = function () {
    manteaux_fall = true;
    vitesse = 0;
}

myState.door = function () {
   vitesse = 0;
   this.porte.transform.scaleX=-0.8;
   this.porte.transform.x+=120;
   this.grince.play();
}
game.states.addState(myState, true);