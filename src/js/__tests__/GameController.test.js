// import GameController from "../GameController";
// import GamePlay from "../GamePlay";
// import GameStateService from "../GameStateService";


// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;


// const dom = new JSDOM('../../../index.html', { url: 'https://localhost:8080' });

// global.window = dom.window;
// global.document = dom.window.document;


// test('show tooltip', () => {

//   const gamePlay = new GamePlay();
//   gamePlay.bindToDOM(document.querySelector('#game-container'));
  
//   const stateService = new GameStateService();
  
//   const gameCtrl = new GameController(gamePlay, stateService);
//   gameCtrl.init();

//   const result = {
//     attack: 25, defence: 25, health: 50, level: 1, type: 'bowman',
//   }; 
//   expect(2).toEqual(2);
// });