/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  // TODO: write your logic here
  constructor(characters) {
    this.characters = characters;
  }

  // generatePlayerTeam() {
  //   const playerTypes = ['Bowman', 'Swordsman', 'Magician'];
  //   return generateTeam(playerTypes, 3, 2);
  // }

  // generateRivalTeam() {
  //   const rivalTypes = ['Vampire', 'Undead', 'Daemon'];
  //   return generateTeam(rivalTypes, 3, 2);
  // }

  // renderTeamNew(positions, element, indexesList) {
  //   let index = Basic.generateRandom(positions);
  //   if (!indexesList.includes(positions[index])) {
  //     indexesList.push(positions[index]);
  //     this.characters.push(new PositionedCharacter(element, positions[index]));
  //   } else {
  //     index = Basic.generateRandom(positions);
  //     indexesList.push(positions[index]);
  //     this.characters.push(new PositionedCharacter(element, positions[index]));
  //   }
// }

}