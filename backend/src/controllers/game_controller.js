const gameData = require('./game.json');


exports.createGame = (req, res) =>{
    res.json(gameData);
    res.send({status: "successsssss"});
}

exports.addPlayer = (req, res) =>{
    res.json({status: "added player"});
}

exports.play = (req, res) =>{
    res.json({status: "game started"});
}
