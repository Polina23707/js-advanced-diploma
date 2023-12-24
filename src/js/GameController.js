import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import { generateTeam } from "./generators";
import Basic from "./Basic";
import GamePlay from "./GamePlay";
import Rival from "./GameRule";
import GameRule from "./GameRule";
import Team from "./Team";

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
    localStorage.setItem('nextPlayer', 0);
    localStorage.setItem('Positions', indexesList);
    this.rival = new Rival;
    // this.renderCharacters();
    

    let indexesList = [];
    if (!!localStorage.activePlayer) {
      delete localStorage.activePlayer;
    }

    this.playerTeam.characters.forEach(element => {
      this.renderTeam(Basic.playerPosition(this.gamePlay.boardSize), element, indexesList);
    });

    this.rivalTeam.characters.forEach(element => {
      this.renderTeam(Basic.rivalPosition(this.gamePlay.boardSize), element, indexesList);
    });

    
    this.gamePlay.redrawPositions(this.characters);

    this.gamePlay.addCellEnterListener((index) => {
      if (this.onCellEnter(index)) {
        this.showTip(index)
      }
    })

    this.gamePlay.addCellLeaveListener((index) => {
     if (this.onCellLeave(index)) {
      this.gamePlay.hideCellTooltip(index);
     }
    })

    this.gamePlay.addCellClickListener((index) => {
      this.onCellClick(index);
    })
  }

  // renderCharacters() {
  //   this.Team = new Team(this.characters);
  //   console.log(this.Team);
  // }

  onCellClick(index) {
    // TODO: react to click
    if (localStorage.nextPlayer === '0') {
    let gamerCharacters = ['bowman', 'swordsman', 'magician'];

    if (!!localStorage.activePlayer) {

      let activePlayer = this.getCharacterByIndex(Number(localStorage.activePlayer));

      if (this.characters.map((char) => char.position).includes(index)) {

        let character = this.getCharacterByIndex(index);
        if (gamerCharacters.includes(character.character.type)) {
          this.setActivePlayer(index);
        } else {
          if (!!GameRule.attackRadius(activePlayer, this.gamePlay.boardSize).includes(index)) {
            this.makeDemageNew(Number(localStorage.activePlayer), index);
            this.setNextPlayer();
          } 
        }
        
      } else {
        if (GameRule.movementRadius(activePlayer, this.gamePlay.boardSize).includes(index)) {
          activePlayer.position = index;
          this.setActivePlayer(index);
          this.gamePlay.redrawPositions(this.characters);
          this.setNextPlayer();
        } 
      }

    } else {
      this.characters.forEach((char) => {
        if (char.position === index) {
          if (gamerCharacters.includes(char.character.type)) {
            this.setActivePlayer(index)  
          } else {
            GameRule.showError('Это не персонаж игрока');
          }}
        })
      }  
    }
  }


  onCellEnter(index) {
    // TODO: react to mouse enter
    if (localStorage.nextPlayer === '0') {
      let rivalTypes = ['vampire', 'undead', 'daemon'];
      
    if (!!localStorage.activePlayer) {
      let activePlayer = this.getCharacterByIndex(Number(localStorage.activePlayer));
        if (!!this.characters.map((char) => char.position).includes(index)) {
          let rivals = this.characters.filter((char) => rivalTypes.includes(char.character.type));

          if (rivals.map((char) => char.position).includes(index)) {
            if (GameRule.attackRadius(activePlayer, this.gamePlay.boardSize).includes(index)) {
              this.gamePlay.setCursor('crosshair');
              this.gamePlay.selectCell(index, 'red');
            } else {
              this.gamePlay.setCursor('not-allowed');
            }

          } else {
            this.gamePlay.setCursor('pointer');
          }

      } else {
        if (GameRule.movementRadius(activePlayer, this.gamePlay.boardSize).includes(index)) {
          this.gamePlay.setCursor('pointer');
          this.gamePlay.selectCell(index, 'green');      
        } else {
          this.gamePlay.setCursor('not-allowed');
        }
      }
    }

    if (localStorage.getItem('Positions').includes(index)) {
      return true;
    }
    return false;
  }
  } 

// OK
  onCellLeave(index) {
    // TODO: react to mouse leave
    if (Number(localStorage.activePlayer) !== index) {
      this.gamePlay. deselectCell(index);
    }
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

  generateTip(level, attack, defence, health) {
    return `🎖${level} ⚔${attack} 🛡${defence} ❤${health}`
  }

// OK 
  showTip(index) {
    this.characters.forEach((e) => {
      if (e.position === index) {
        let tip = this.generateTip(e.character.level,e.character.attack,e.character.defence,e.character.health);
        this.gamePlay.showCellTooltip(tip , index);
      }
    })
  }

  renderTeam(positions, element, indexesList) {
      let index = Basic.generateRandom(positions);
      if (!indexesList.includes(positions[index])) {
        indexesList.push(positions[index]);
        this.characters.push(new PositionedCharacter(element, positions[index]));
      } else {
        index = Basic.generateRandom(positions);
        indexesList.push(positions[index]);
        this.characters.push(new PositionedCharacter(element, positions[index]));
      }
  }

  //   renderTeam(positions, element, indexesList) {
      
      
  //     this.team = new Team(this.characters)
  // //     let index = Basic.generateRandom(positions);
  // //     if (!indexesList.includes(positions[index])) {
  // //       indexesList.push(positions[index]);
  // //       this.characters.push(new PositionedCharacter(element, positions[index]));
  // //     } else {
  // //       index = Basic.generateRandom(positions);
  // //       indexesList.push(positions[index]);
  // //       this.characters.push(new PositionedCharacter(element, positions[index]));
  // //     }
  // }

  getCharacterByIndex(index) {
    return this.characters.filter((char) => char.position === index)[0];
  }

  setActivePlayer(index) {
    if (!!localStorage.activePlayer) {
      this.gamePlay.deselectCell(localStorage.activePlayer);
    } 
    this.gamePlay.selectCell(index);
    localStorage.setItem('activePlayer', index);
    localStorage.setItem('activePlayerType', this.getCharacterByIndex(index).character.type);
  }

  calculateDamage(attacker, target) {
    let demage = Math.max(attacker.character.attack - target.character.defence, attacker.character.attack * 0.1);
    target.character.health -= demage;
    return demage;
  }

  makeDemageNew(attackerIndex, targetIndex) {
    let target = this.getCharacterByIndex(targetIndex);
    let attacker = this.getCharacterByIndex(attackerIndex);
    this.gamePlay.showDamage(targetIndex, this.calculateDamage(attacker, target));
    this.gamePlay.redrawPositions(this.characters);
  }

  setNextPlayer() {
    if (!!localStorage.nextPlayer) {
      if (localStorage.nextPlayer === '0') {
        localStorage.setItem('nextPlayer' , 1);
        this.runRivalTurn();
      } else {
        localStorage.setItem('nextPlayer' , 0);
      }
    }
  }

  runRivalTurn() {
    let activeRival = GameRule.setActiveRival(this.characters, this.gamePlay.boardSize);
    this.moveOrAttack(activeRival);
    this.setNextPlayer();
  }

  getPlayerCharacters() {
    let gamerCharacters = ['bowman', 'swordsman', 'magician'];
    return this.characters.filter((char) => gamerCharacters.includes(char.character.type));
  }

  moveOrAttack() {
    let activeRival = this.getCharacterByIndex(Number(localStorage.activeRival));
    if (!!this.checkRivalAttack(activeRival).length) {
      if (this.checkRivalAttack(activeRival).length === 1) {
        let target = this.checkRivalAttack(activeRival)[0];
        this.makeDemageNew(Number(localStorage.activeRival), target);

      } else {
        let target = this.checkRivalAttack(activeRival);
        let targetChar = this.characters.filter((char) => target.includes(char.position));
        targetChar = targetChar.sort((a, b) => a.character.health - b.character.health);
        this.makeDemageNew(Number(localStorage.activeRival), targetChar[0].position);
      }

    } else {
      activeRival.position = this.checkRivalMoves(activeRival, this.gamePlay.boardSize);
      this.gamePlay.redrawPositions(this.characters)
    }
  }

  checkRivalAttack(activeRival) {
    let availableAttack = GameRule.attackRadius(activeRival, this.gamePlay.boardSize);
    let players = this.getPlayerCharacters();
    let availableforAttack = [];
    players.forEach((char) => {
      if (availableAttack.includes(char.position)) {
        availableforAttack.push(char.position);
      }
    })
    return availableforAttack;
  }

  checkRivalMoves(character, boardSize) {
    let availableCells = GameRule.movementRadius(character, boardSize);
    let availableLocations = []
    availableCells.forEach((cell) => {
      availableLocations.push(Basic.getLocation(cell, Basic.createBoard(this.gamePlay.boardSize)));
    })

    let playerLocation = Basic.getLocation(Number(localStorage.activePlayer), Basic.createBoard(this.gamePlay.boardSize));
    let closest = Basic.findClosest(availableLocations, playerLocation);
    return availableCells[closest];
  }
}



