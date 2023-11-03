const router = require('express').Router();
const gameController = require('../controllers/game_controller.js')

router.get('/create_game', gameController.createGame);

router.get('/add_player', gameController.addPlayer);

router.get('/play', gameController.play);

module.exports = router;
