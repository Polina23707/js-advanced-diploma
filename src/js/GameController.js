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
      this.renderTeam(Position.playerPosition(8), element, indexesList);
    });

    

    this.rivalTeam.characters.forEach(element => {
      this.renderTeam(Position.rivalPosition(8), element, indexesList);
    });

    

    localStorage.setItem('Positions', indexesList);

    this.gamePlay.redrawPositions(this.characters);

    this.gamePlay.addCellEnterListener((index) => {
      if (this.onCellEnter(index)) {
        this.characters.forEach((e) => {
          if (e.position === index) {
            let tip = this.generateTip(e.character.level,e.character.attack,e.character.defence,e.character.health);
            this.gamePlay.showCellTooltip(tip , index);
          }
        })
      }
    })


    this.gamePlay.addCellLeaveListener((index) => {
     if (this.onCellLeave(index)) {
      this.gamePlay.hideCellTooltip(index);
     }
    })
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
    if (localStorage.getItem('Positions').includes(index)) {
      return true;
    }
    return false;
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

  renderTeam(positions, element, indexesList) {
      let index = this.generateRandom(positions);
      if (!indexesList.includes(positions[index])) {
        indexesList.push(positions[index]);
        this.characters.push(new PositionedCharacter(element, positions[index]));
      } else {
        index = this.generateRandom(positions);
        indexesList.push(positions[index]);
        this.characters.push(new PositionedCharacter(element, positions[index]));
      }
  }
}



