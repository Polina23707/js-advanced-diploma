import Vampire from "../characters/Vampire";

test('new Character throw Exception', () => {
  const character = new Vampire(1);
  const result = {
    attack: 25, defence: 25, health: 50, level: 1, type: 'vampire',
  }; 
  expect(character).toEqual(result);
});