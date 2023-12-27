import GameRule from "../GameRule";
import PositionedCharacter from "../PositionedCharacter";
import Bowman from "../characters/Bowman";

test('check movement radius', () => {
  let bowman = new Bowman(1);
  let positionedCharacter = new PositionedCharacter(bowman, 32);
  let expectedMovements = [16, 17, 18, 24, 25, 26, 32, 33, 34, 40, 41, 42, 48, 49, 50];
  let result = GameRule.attackRadius(positionedCharacter, 8);
  expect(result).toEqual(expectedMovements);
})