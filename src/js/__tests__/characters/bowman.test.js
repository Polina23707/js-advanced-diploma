import Bowman from "../../characters/Bowman";

test('new Character throw Exception', () => {
  const character = new Bowman(1);
  const result = {
    attack: 25, defence: 25, health: 50, level: 1, type: 'bowman',
  }; 
  expect(character).toEqual(result);
});