/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут
  console.log(index);
  console.log(boardSize);
  const map = new Map([
    [0 , 'top-left'],
    [boardSize - 1 , 'top-right'],
    [boardSize * boardSize - boardSize, 'bottom-left'],
    [boardSize * boardSize - 1, 'bottom-right']    
  ])
  console.log(map);
  if (map.has(index)) {
    console.log('angle');
    return map.get(index);
  } else if (index < boardSize -1) {
    console.log('top');
    return 'top';
  } else if (index % boardSize === 0) {
    console.log('left');
    return 'left';
  } else if (index > boardSize * boardSize - boardSize && index < boardSize * boardSize - 1) {
    console.log('bottom');
    return 'bottom';
  } else if ((index + 1) % boardSize === 0) {
    return 'right';
  } else {
    console.log('center');
    return 'center';
  }
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
