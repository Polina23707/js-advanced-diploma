export default class Position {

  static playerPosition(size) {
    let playerIndexes = [];
    let first = 0;
    let second = 1;

    for (let i = 0; i < size - 1 ; i++) {
      playerIndexes.push(first);
      playerIndexes.push(second);
      first += size;
      second += size;
    }
    return playerIndexes;
  }

  static rivalPosition(size) {
    let rivalIndexes = [];
    let third = size - 2;
    let forth = size - 1;

    for (let i = 0; i < size - 1 ; i++) {
      rivalIndexes.push(third);
      rivalIndexes.push(forth);
      third += size;
      forth += size;
    }
    return rivalIndexes;
  }  
}
