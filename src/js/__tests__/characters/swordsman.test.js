import Swordsman from "../../characters/Swordsman";

test('new Character throw Exception', () => {
  const character = new Swordsman(1);
  const result = {
    attack: 40, defence: 10, health: 50, level: 1, type: 'swordsman',
  }; 
  expect(character).toEqual(result);
});