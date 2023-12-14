import Character from "../Character";

test('new Character throw Exception', () => {
  expect(() => new Character(1)).toThrow('Dont use new Character()');
});