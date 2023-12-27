/**
 * @jest-environment jsdom
 */

'use strict';

jest.mock('../app.js');

import GamePlay from "../GamePlay";
import GameStateService from "../GameStateService";
import GameController from "../GameController";

test('use jsdom in this test file', () => {
  const gamePlay = new GamePlay();
  gamePlay.bindToDOM(document.querySelector('#game-container'));

  const stateService = new GameStateService(localStorage);

  const gameCtrl = new GameController(gamePlay, stateService);
  gameCtrl.init();

  const element = document.createElement('div');
  const cell = document.querySelector('.cell');
  console.log(cell);
  expect(element).not.toBeNull();
});