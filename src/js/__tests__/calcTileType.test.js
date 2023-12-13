import { calcTileType } from "../utils";

test.each([
  [0, 8 , 'top-left'],
  [7, 8 , 'top-right'],
  [56, 8 , 'bottom-left'],
  [63, 8 , 'bottom-right'],
  [1, 8 , 'top'],
  [8, 8 , 'left'],
  [15, 8 , 'right'],
  [60, 8 , 'bottom'],
  [33, 8 , 'center'],
  [7, 7 , 'left']
])('Tile Type for index %i and %i size test', (index, size, type) => {
  expect(calcTileType(index, size)).toBe(type);
})