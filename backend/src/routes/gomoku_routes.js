const router = require('express').Router();
const gameController = require('../controllers/game_controller.js')

router.get('/create-game', gameController.createGame);

router.get('/add-player', gameController.addPlayer);

router.get('/play', gameController.play);

module.exports = router;
