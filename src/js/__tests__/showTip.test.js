/**
 * @jest-environment jsdom
 */

import GamePlay from '../GamePlay';
import GameController from '../GameController';
import GameState from '../GameState';

jest.mock('../app.js');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should ...', () => {
  const element = document.createElement('div');
  element.setAttribute('id', '#game-container');
  
  let gamePlay = new GamePlay();
  gamePlay.bindToDOM(document.querySelector('#game-container'));
  let gameState = new GameState(localStorage);
  let gameController = new GameController(gamePlay, gameState);
  gameController.init();
  expect(2).toBe(2);
});