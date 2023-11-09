const gameHandler = require('../controllers/game.json');
const gameHandle = require('../controllers/game_controller.js');
const express = require('express');
const request = require('supertest');


describe('controller', () => {
    const mockRes = {
        send: jest.fn(),
      };

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
        const req = {};
        const gamecreate = gameHandle.createGame(req, mockRes);
        const gameData = gameHandler


   // gamecreate(req, mockRes);

        it('should have expected properties', () => {
            expect(mockRes.send).toHaveBeenCalledWith(gameData);


        });
      });

      describe('when adding player', () => {

        const gameadd = gameHandle.addPlayer;


        const req = {};

    gameadd(req, mockRes);



        it('should have expected properties', () => {

            expect(mockRes.send).toHaveBeenCalledWith({status: "added player"});



        });
      });

      describe('when playing', () => {

        const gameplay = gameHandle.play;

        const req = {};

    gameplay(req, mockRes);

        it('should have expected properties', () => {

            expect(mockRes.send).toHaveBeenCalledWith({status: "game started"});


        });
      });
  });
