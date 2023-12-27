// Проверьте, в нужном ли количестве и диапазоне уровней (учёт аргумента maxLevel) создаются персонажи при вызове generateTeam

import { generateTeam } from "../generators";

test('generate team', () => {
  let types = ['Bowman', 'Magician'];
  const team = generateTeam(types, 3, 5);

  expect(team.characters.length).toBe(5);
})

test('check team members level', () => {
  let types = ['Bowman', 'Magician'];
  const team = generateTeam(types, 3, 5);
  let playersLevel = [];
  team.characters.forEach(char => {
    playersLevel.push(char.level);
  });
  let result = (playersLevel.includes(4));
  expect(result).toBe(false);
})

test('check team members type', () => {
  let types = ['Bowman', 'Magician'];
  const team = generateTeam(types, 3, 5);
  let playersType = [];
  team.characters.forEach(char => {
    playersType.push(char.type);
  });
  let result = (playersType.includes('Undead'));
  expect(result).toBe(false);
})