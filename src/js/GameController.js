import GamePlay from "./GamePlay";
import Bowman from "./characters/Bowman";
import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import { generateTeam } from "./generators";
import Position from "./Position";
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    this.playerTeam = this.generatePlayerTeam();
    this.rivalTeam = this.generateRivalTeam();

    let positionedList = [];
    let indexesList = [];

    this.playerTeam.characters.forEach(element => {
      let playerPositions = Position.playerPosition(8);
      let index = this.generateRandom(playerPositions);

      if (!indexesList.includes(index)) {
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, playerPositions[index]));
      } else {
        index = this.generateRandom(playerPositions);
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, playerPositions[index]));
      }
    });

    this.rivalTeam.characters.forEach(element => {
      let rivalPositions = Position.rivalPosition(8);
      let index = this.generateRandom(rivalPositions);

      if (!indexesList.includes(index)) {
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, rivalPositions[index]));
      } else {
        index = this.generateRandom(rivalPositions);
        indexesList.push(index);
        positionedList.push(new PositionedCharacter(element, rivalPositions[index]));
      }
    });

    this.gamePlay.redrawPositions(positionedList);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  generatePlayerTeam() {
    const playerTypes = ['Bowman', 'Swordsman', 'Magician'];
    return generateTeam(playerTypes, 3, 2);
  }

  generateRivalTeam() {
    const rivalTypes = ['Vampire', 'Undead', 'Daemon'];
    return generateTeam(rivalTypes, 3, 2);
  }

  generateRandom(array) {
    return Math.floor(Math.random() * array.length);
  }
}



