import Daemon from "../characters/Daemon";

test('new Character throw Exception', () => {
  const character = new Daemon(1);
  const result = {
    attack: 10, defence: 10, health: 50, level: 1, type: 'daemon',
  }; 
  expect(character).toEqual(result);
});