// Проверьте, выдаёт ли генератор characterGenerator бесконечно новые персонажи из списка (учёт аргумента allowedTypes)

import { characterGenerator } from "../generators";

test('generate characters', () => {
  let types = ['Bowman', 'Magician'];
  const playerGenerator = characterGenerator(types, 2);
  let players = [];
  for (let i = 0; i < 10; i++) {
    players.push(playerGenerator.next().value);
  }
  expect(players.length).toBe(10);
})

test('check characters level', () => {
  let types = ['Bowman', 'Magician'];
  const playerGenerator = characterGenerator(types, 2);
  let players = [];
  for (let i = 0; i < 10; i++) {
    players.push(playerGenerator.next().value);
  }
  let playersLevel = players.map((char) => char.level);
  let result = (playersLevel.includes(3));
  expect(result).toBe(false);
})

test('check characters type', () => {
  let types = ['Bowman', 'Magician'];
  const playerGenerator = characterGenerator(types, 2);
  let players = [];
  for (let i = 0; i < 10; i++) {
    players.push(playerGenerator.next().value);
  }
  let playersLevel = players.map((char) => char.type);
  let result = (playersLevel.includes('Undead'));
  expect(result).toBe(false);
})