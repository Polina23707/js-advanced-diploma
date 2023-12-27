import GameRule from "../GameRule";
import PositionedCharacter from "../PositionedCharacter";
import Daemon from "../characters/Daemon";

test('check movement radius', () => {
  let daemon = new Daemon(1);
  let positionedCharacter = new PositionedCharacter(daemon, 32);
  let expectedMovements = [24, 25, 32, 33, 40, 41,];
  let result = GameRule.movementRadius(positionedCharacter, 8);
  expect(result).toEqual(expectedMovements);
})