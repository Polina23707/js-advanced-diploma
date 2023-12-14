import Magician from "../characters/Magician";

test('new Character throw Exception', () => {
  const character = new Magician(1);
  const result = {
    attack: 10, defence: 40, health: 50, level: 1, type: 'magician',
  }; 
  expect(character).toEqual(result);
});