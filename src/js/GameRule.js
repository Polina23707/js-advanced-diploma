import Position from "./Basic";

export default class GameRule {
  constructor() {
    this.name = 'GameRule';
  }
  
  static setActiveRival(characters, boardSize) {

    let board = Position.createBoard(boardSize);
    let rivalTypes = ['vampire', 'undead', 'daemon'];

    let players = characters.filter((char) => !rivalTypes.includes(char.character.type));
    let rivals = characters.filter((char) => rivalTypes.includes(char.character.type));

    let playersLocation = players.map((player) => Position.getLocation(player.position, board));

    let rivalsLocation = rivals.map((rival) => Position.getLocation(rival.position, board));

    let closestRival = rivals[Position.findClosest(rivalsLocation, Position.getAverage(playersLocation))];

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

    let movements = Position.neighboringPositions(character.position, boardSize, radius.get(character.character.type));
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

    let attacks = Position.neighboringPositions(character.position, boardSize, radius.get(character.character.type));
    return attacks;
  }

  
}