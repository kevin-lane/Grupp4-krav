const gameData = require('./game.json');
const { v4: uuidv4 } = require('uuid');


exports.createGame = (req, res) =>{
    gameData.id = uuidv4()
    gameData.player1.id = uuidv4()
    gameData.player2.id = uuidv4()


    res.send(gameData);
}

exports.addPlayer = (req, res) =>{
    res.send({status: "added player"});
}

exports.play = (req, res) =>{
    res.send({status: "game started"});
}
