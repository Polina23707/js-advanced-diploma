import Team from "./Team";
import Bowman from "./characters/Bowman";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Magician from "./characters/Magician";
import Daemon from "./characters/Daemon";
import Vampire from "./characters/Vampire";
/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  while (!!allowedTypes && !!maxLevel) {
    let level = 1 + Math.floor(Math.random() * maxLevel);
    const characterList = new Map([
      ['Bowman' , new Bowman(level)],
      ['Daemon' , new Daemon(level)],
      ['Magician' , new Magician(level)],
      ['Swordsman' , new Swordsman(level)],
      ['Undead' , new Undead(level)],
      ['Vampire' , new Vampire(level)]
    ])
  
    let randTypeIndex = Math.floor(Math.random() * allowedTypes.length);
    let character = characterList.get(allowedTypes[randTypeIndex]);

    if (character.level > 1) {
      character.levelUp();
    }

    yield character;
  }

}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  let characters = [];
  for (let i = 1; i<= characterCount; i++) {
    const playerGenerator = characterGenerator(allowedTypes, maxLevel);
    const character = playerGenerator.next().value;
    characters.push(character);
  }
  let team = new Team(characters);
  return team;
}

