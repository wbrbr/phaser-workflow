var game = new Phaser.Game(800,600,Phaser.AUTO,'game');
var Game = {};

Game.game = function(){  };
Game.mainmenu = function() {  };
Game.boot = function(){  };
Game.gameover = function() {  };

Game.game.prototype = {

    create: function()
    {
    },

    update: function()
    {
    },

    render: function()
    {
    },
};

Game.mainmenu.prototype = {
    create: function()
    {
    },

    update: function()
    {
    },

};

Game.boot.prototype = {

    preload: function()
    {
    },

    create: function()
    {
    }

};

Game.gameover.prototype = {

    create: function()
    {
    },

    update: function()
    {
    }
};

game.state.add('boot',Game.boot);
game.state.add('game',Game.game);
game.state.add('gameover',Game.gameover);
game.state.add('mainmenu',Game.mainmenu);
game.state.start('boot');
