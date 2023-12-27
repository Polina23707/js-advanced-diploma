import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Basic from "./Basic";
import GamePlay from "./GamePlay";
import GameRule from "./GameRule";
import GameState from "./GameState";
import GameStateService from "./GameStateService";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.characters = [];
    this.level = 1;
    this.status = 1;
  }

  init() {
    localStorage.removeItem('activePlayer');
    localStorage.removeItem('activeRival');
    this.status = 1;
    let indexesList = [];

    this.gamePlay.addNewGameListener(() => this.onNewGameClick());
    this.gamePlay.addSaveGameListener(() => this.onSaveGameClick());
    this.gamePlay.addLoadGameListener(() => this.onLoadGameClick());

    if (this.level === 1) {
      this.gamePlay.drawUi(themes.prairie);
      this.playerTeam = GameRule.generatePlayerTeam();
      this.rivalTeam = GameRule.generateRivalTeam();

      this.playerTeam.characters.forEach(element => {
        this.renderTeam(Basic.playerPosition(this.gamePlay.boardSize), element, indexesList);
      });

    } else {
      this.rivalTeam = GameRule.generateRivalTeam();
    }
    
    localStorage.setItem('nextPlayer', 0);
    
    if (localStorage.activePlayer) {
      delete localStorage.activePlayer;
    }

    this.rivalTeam.characters.forEach(element => {
      this.renderTeam(Basic.rivalPosition(this.gamePlay.boardSize), element, indexesList);
    });

    this.gamePlay.redrawPositions(this.characters);

    this.gamePlay.addCellEnterListener((index) => {
      if (this.onCellEnter(index)) {
        this.showTip(index);
      }
    })

    this.gamePlay.addCellLeaveListener((index) => {
     if (this.onCellLeave(index)) {
      this.gamePlay.hideCellTooltip(index);
      }
    })

    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));
  }

  onCellClick(index) {
    // TODO: react to click
    if (this.status === 1) {
      if (localStorage.nextPlayer === '0') {
        let gamerCharacters = ['bowman', 'swordsman', 'magician'];
        let characters = this.characters;

        if (localStorage.activePlayer) {
    
          let activePlayer = GameRule.getCharacterByIndex(Number(localStorage.activePlayer), characters);
    
          if (this.characters.map((char) => char.position).includes(index)) {
    
            let character = GameRule.getCharacterByIndex(index, characters);
            if (gamerCharacters.includes(character.character.type)) {
              this.setActivePlayer(index);
            } else {
              if (GameRule.attackRadius(activePlayer, this.gamePlay.boardSize).includes(index)) {
                let target = GameRule.getCharacterByIndex(index, characters);
                this.makeDamage(activePlayer,target);
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
                GamePlay.showError('Это не персонаж игрока');
              }}
            })
          }  
        }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    let characterPositions = this.characters.map((char) => char.position);
    if (this.status === 1) {
      this.showOptions(index);
      if (characterPositions.includes(index)) {
        return true;
      }
    return false;
    }   
  } 

  showOptions(index) {
    if (localStorage.nextPlayer === '0') {
      if (localStorage.activePlayer) {
        let activePlayer = GameRule.getCharacterByIndex(Number(localStorage.activePlayer), this.characters);

        if (activePlayer) {
          if (this.characters.map((char) => char.position).includes(index)) {
            let rivals = GameRule.getRivalCharacters(this.characters);
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
      } 
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    if (this.status === 1) {
      let characterPositions = this.characters.map((char) => char.position);
      if (Number(localStorage.activePlayer) !== index) {
        this.gamePlay. deselectCell(index);
      }
      if (characterPositions.includes(index)) {
        return true;
      }
      return false;
    }
  }

  generateTip(level, attack, defence, health) {
    return `🎖${level} ⚔${attack} 🛡${defence} ❤${health}`
  }

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
      if (indexesList.includes(positions[index])) {
        index = Basic.generateRandom(positions);
      }
      indexesList.push(positions[index]);
      this.characters.push(new PositionedCharacter(element, positions[index]));
  }

  setActivePlayer(index) {
    if (localStorage.activePlayer) {
      this.gamePlay.deselectCell(localStorage.activePlayer);
    } 
    this.gamePlay.selectCell(index);
    localStorage.setItem('activePlayer', index);
  }

  setNextPlayer() {
    if (this.status === 1) {
      this.healthListener();
      if (localStorage.nextPlayer) {
        if (localStorage.nextPlayer === '0') {
          localStorage.setItem('nextPlayer' , 1);
          setTimeout(() => this.runRivalTurn(), 500);
        } else {
          localStorage.setItem('nextPlayer' , 0);
        }
      }
    }
  }

  runRivalTurn() {
    let activeRival = GameRule.setActiveRival(this.characters, this.gamePlay.boardSize);
    this.moveOrAttack(activeRival);
    this.setNextPlayer();
  }

  moveOrAttack() {
    let activeRival = GameRule.getCharacterByIndex(Number(localStorage.activeRival), this.characters);
    let rivalAttack = GameRule.checkRivalAttack(activeRival, GameRule.getPlayerCharacters(this.characters), this.gamePlay.boardSize);
    let target = GameRule.getCharacterByIndex(rivalAttack[0], this.characters);
    if (rivalAttack.length) {
      if (rivalAttack.length !== 1) {
        target = this.characters.filter((char) => rivalAttack.includes(char.position));
        target = target.sort((a, b) => a.character.health - b.character.health)[0];
      }
      this.makeDamage(activeRival,target);
    } else {
      activeRival.position = GameRule.checkRivalMoves(activeRival, this.gamePlay.boardSize, this.characters);
      this.gamePlay.redrawPositions(this.characters)
    }
  }

  makeDamage(attacker, target) {
    let characters = this.characters;
    let damage = GameRule.calculateDamage(attacker, target);
    this.gamePlay.showDamage(target.position, damage)
      .then(() => this.gamePlay.redrawPositions(characters));
    this.healthListener();
  }

  levelUp() {
    if (this.level === 4) {
      this.gameOver();
      return;
    }

    this.level += 1;
    let themesMap = new Map([
      [1, themes.prairie],
      [2, themes.desert],
      [3, themes.arctic],
      [4, themes.mountain]
    ])

    this.init();
    this.gamePlay.drawUi(themesMap.get(this.level));
    let playerCharacters = GameRule.getPlayerCharacters(this.characters);

    playerCharacters.forEach((char) =>{
      char.character.level += 1;
      char.character.levelUp();
      char.character.health += 80;
      if (char.character.health > 100) {
        char.character.health = 100;
      }
    })
    this.gamePlay.redrawPositions(this.characters);
  }

  healthListener() {
    let died = [];
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i].character.health <= 0) {
        died.push(i);
      }
    }

    if (died.length) {
      if (this.characters[died[0]].position === Number(localStorage.activePlayer)) {
        this.gamePlay.setCursor('default');
        localStorage.removeItem('activePlayer')
        
      } else if (this.characters[died[0]].position === Number(localStorage.activeRival)) {
        localStorage.removeItem('activeRival')
      }
      this.gamePlay.deselectCell(this.characters[died[0]].position);
      this.characters.splice(died[0], 1);     
      this.gamePlay.redrawPositions(this.characters);

      if (!GameRule.getPlayerCharacters(this.characters).length) {
        this.gameOver();
        return;
      } else if (!GameRule.getRivalCharacters(this.characters).length) {
        this.levelUp();
      }
    }
  }

  gameOver() {
    this.gamePlay.setCursor('default');
    this.status = 0;
    this.characters.forEach((char) => {
      this.gamePlay.deselectCell(char.position);
    })
    this.gamePlay.addNewGameListener(() => {
      this.level = 1;
      this.init();
    })
  }

  onNewGameClick() {
    this.level = 1;
    this.characters = [];
    this.init();
  }

  onSaveGameClick() {
    GameState.from(this);
  }

  onLoadGameClick() {
    if (localStorage.state) {
      this.characters.forEach((char) => {
        this.gamePlay.deselectCell(char.position);
      })
      this.gamePlay.setCursor('default');
      let gameStateService = new GameStateService(localStorage);
      let gameState = gameStateService.load();
      this.characters = gameState.characters;
      this.level = gameState.level;
      this.status = gameState.status;
      this.gamePlay.redrawPositions(this.characters);
    }
  }
}



