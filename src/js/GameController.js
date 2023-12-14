import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import { generateTeam } from "./generators";
import Position from "./Position";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.characters = [];
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    this.playerTeam = this.generatePlayerTeam();
    this.rivalTeam = this.generateRivalTeam();

    let indexesList = [];

    this.playerTeam.characters.forEach(element => {
      let playerPositions = Position.playerPosition(8);
      let index = this.generateRandom(playerPositions);
      if (!indexesList.includes(playerPositions[index])) {
        indexesList.push(playerPositions[index]);
        this.characters.push(new PositionedCharacter(element, playerPositions[index]));
      } else {
        index = this.generateRandom(playerPositions);
        indexesList.push(playerPositions[index]);
        this.characters.push(new PositionedCharacter(element, playerPositions[index]));
      }
    });

    this.rivalTeam.characters.forEach(element => {
      let rivalPositions = Position.rivalPosition(8);
      let index = this.generateRandom(rivalPositions);

      if (!indexesList.includes(rivalPositions[index])) {
        indexesList.push(rivalPositions[index]);
        this.characters.push(new PositionedCharacter(element, rivalPositions[index]));
      } else {
        index = this.generateRandom(rivalPositions);
        indexesList.push(rivalPositions[index]);
        this.characters.push(new PositionedCharacter(element, rivalPositions[index]));
      }
    });

    localStorage.setItem('Positions', indexesList);

    this.gamePlay.redrawPositions(this.characters);

    this.gamePlay.addCellEnterListener((index) => {
      if (this.onCellEnter(index)) {
        this.characters.forEach((e) => {
          if (e.position === index) {
            // console.log(e.character);
            let tip = this.generateTip(e.character.level,e.character.attack,e.character.defence,e.character.health);
            this.gamePlay.showCellTooltip(tip , index);
          }
        })
      }
    });
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (localStorage.getItem('Positions').includes(index)) {
      return true;
    }
    return false;
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

  generateTip(level, attack, defence, health) {
    return `🎖${level} ⚔${attack} 🛡${defence} ❤${health}`
  }
}



