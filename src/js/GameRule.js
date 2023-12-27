import Basic from "./Basic";
import { generateTeam } from "./generators";

export default class GameRule {
  constructor() {
    this.name = 'GameRule';
  }
  
  static generatePlayerTeam() {
    const playerTypes = ['Bowman', 'Swordsman', 'Magician'];
    return generateTeam(playerTypes, 3, 2);
  }

  static generateRivalTeam() {
    const rivalTypes = ['Vampire', 'Undead', 'Daemon'];
    return generateTeam(rivalTypes, 3, 2);
  }

  static setActiveRival(characters, boardSize) {

    let board = Basic.createBoard(boardSize);
    let rivalTypes = ['vampire', 'undead', 'daemon'];

    let players = characters.filter((char) => !rivalTypes.includes(char.character.type));
    let rivals = characters.filter((char) => rivalTypes.includes(char.character.type));

    let playersLocation = players.map((player) => Basic.getLocation(player.position, board));

    let rivalsLocation = rivals.map((rival) => Basic.getLocation(rival.position, board));

    let closestRival = rivals[Basic.findClosest(rivalsLocation, Basic.getAverage(playersLocation))];

    localStorage.setItem('activeRival', closestRival.position)
    return closestRival;
  }

  static chooseRival(characters) {
    let activeRival = characters.filter((char) => char.position === Number(localStorage.activeRival));
    return activeRival;
  }

  static movementRadius(character, boardSize) {
    let radius = new Map([
      ['swordsman', 4],
      ['undead' , 4],
      ['bowman' , 2],
      ['vampire', 2],
      ['magician', 1],
      ['daemon' , 1]
    ])

    let movements = Basic.neighboringPositions(character.position, boardSize, radius.get(character.character.type));
    return movements;
  }

  static attackRadius(character, boardSize) {
    let radius = new Map([
      ['swordsman', 1],
      ['undead' , 1],
      ['bowman' , 2],
      ['vampire', 2],
      ['magician', 4],
      ['daemon' , 4]
    ])

    let attacks = Basic.neighboringPositions(character.position, boardSize, radius.get(character.character.type));
    return attacks;
  }

  static checkRivalMoves(character, boardSize, characters) {
    let availableCells = GameRule.movementRadius(character, boardSize);
    let characterCells = characters.map((char) => char.position);
    let availableLocations = []
    availableCells.forEach((cell) => {
      if (!characterCells.includes(cell)) {
        availableLocations.push(Basic.getLocation(cell, Basic.createBoard(boardSize)));
      }
    })

    let playerLocation = Basic.getLocation(Number(localStorage.activePlayer), Basic.createBoard(boardSize));
    let closest = Basic.findClosest(availableLocations, playerLocation);
    return availableCells[closest];
  }

  static checkRivalAttack(activeRival, players, boardSize) {
    let availableAttack = GameRule.attackRadius(activeRival, boardSize);
    let availableforAttack = [];
    players.forEach((char) => {
      if (availableAttack.includes(char.position)) {
        availableforAttack.push(char.position);
      }
    })
    return availableforAttack;
  }

  static calculateDamage(attacker, target) {
    let demage = Math.floor(Math.max(attacker.character.attack - target.character.defence, attacker.character.attack * 0.1));
    target.character.health -= demage;
    return demage;
  }

  static getPlayerCharacters(characters) {
    let gamerCharacters = ['bowman', 'swordsman', 'magician'];
    return characters.filter((char) => gamerCharacters.includes(char.character.type));
  }

  static getRivalCharacters(characters) {
    let rivalCharacters = ['vampire', 'undead', 'daemon'];
    return characters.filter((char) => rivalCharacters.includes(char.character.type));
  }

  static getCharacterByIndex(index, characters) {
    return characters.filter((char) => char.position === index)[0];
  }
}