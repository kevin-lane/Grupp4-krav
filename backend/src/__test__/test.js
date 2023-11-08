const gameHandler = require('../controllers/game.json');
const gameHandle = require('../controllers/game_controller.js');
const express = require('express');
const request = require('supertest');

const mockRes = {
    send: jest.fn(),
  };
describe('controller', () => {

    describe('when creating a game ', () => {
      const game = gameHandler;

      it('should have expected properties', () => {

        expect(game).toHaveProperty('id'); //Id of game generated server side
        expect(game).toHaveProperty('name'); // A name that is displayed
        expect(game).toHaveProperty('round'); // Which round we currently play
        expect(game).toHaveProperty('player1'); // {id: uuid, name: name}
        expect(game).toHaveProperty('player2');
        expect(game.board).toHaveProperty('rows'); // How many rows our board has got
        expect(game.board).toHaveProperty('cols'); // How many columns our board has got
        expect(game).toHaveProperty('state'); // state of the game object = {playing, win1, win2, tie}
      });
    });

    describe('when sending game', () => {
        const game = gameHandle.createGame;
        const gameData = gameHandler

        const req = {};
    game(req, mockRes);


        it('should have expected properties', () => {
            expect(mockRes.send).toHaveBeenCalledWith(gameData);

          /*expect(game).toHaveProperty('id'); //Id of game generated server side
          expect(game).toHaveProperty('name'); // A name that is displayed
          expect(game).toHaveProperty('round'); // Which round we currently play
          expect(game).toHaveProperty('player1'); // {id: uuid, name: name}
          expect(game).toHaveProperty('player2');
          expect(game).toHaveProperty('rows'); // How many rows our board has got
          expect(game).toHaveProperty('cols'); // How many columns our board has got
          expect(game).toHaveProperty('state'); // state of the game object = {playing, win1, win2, tie}*/
        });
      });
  });
