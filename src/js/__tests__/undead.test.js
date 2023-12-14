import Undead from "../characters/Undead";

test('new Character throw Exception', () => {
  const character = new Undead(1);
  const result = {
    attack: 40, defence: 10, health: 50, level: 1, type: 'undead',
  }; 
  expect(character).toEqual(result);
});