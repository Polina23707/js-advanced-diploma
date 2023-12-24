export default class Basic {

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

  static createLine(index, size) {
    let line = [];
    for (let i = 0; i < size; i++) {
      line.push(index);
      index++;
    }
    return line;
  }

  static createBoard(size) {
    let board = [];
    let index = 0;

    for (let i = 0; i < size ; i++) {
      board.push(Basic.createLine(index, size));
      index += size; 
    }
    return board;
  }

  static neighboringPositions(current, size, radius) {
    let board = Basic.createBoard(size);
    let location = Basic.getLocation(current, board);

    let line = location[0];
    let column = location[1];
    let neighbors = [];

    let neighborLines = [line];
    for (let i = 1; (i <= radius); i++) {
      let next = line + i;
      if (next > -1 && next < size) {
        neighborLines.push(next);
      }

      let previous = line - i;
      if (previous > -1 && previous < size) {
        neighborLines.push(previous);
      }
    }

    let neighborCulumns = [column];
    for (let i = 1; i <= radius; i++) {
      let next = column + i;

      if (next > -1 && next < size) {
        neighborCulumns.push(next);
      }
      let previous = column - i;

      if (previous > -1 && previous < size) {
        neighborCulumns.push(previous);
      }
    }

    neighborLines = neighborLines.sort((a,b) => a - b );
    neighborCulumns = neighborCulumns.sort((a,b) => a - b );

    for (let i = 0; i < neighborLines.length; i++) {
      for (let j = 0; j < neighborCulumns.length; j++) {
        neighbors.push((board[neighborLines[i]][neighborCulumns[j]]))
      }
    }
    return neighbors;
  }

  static getLocation(current, board) {
    let line = undefined;
    let column = undefined;
    let location = [];

    board.forEach((item, index) => {
      if (item.indexOf(current) !== -1) {
        column = item.indexOf(current);
        line = index;
      }
    })
    location.push(line);
    location.push(column);
    return location;
  }

  static getAverage(array) {
    let line = 0;
    let column = 0;
    for (let i = 0; i < array.length; i++) {
      line +=array[i][0];
      column +=array[i][1];
    }

    let average = [Math.floor(line/array.length), Math.floor(column/array.length)];
    return average; 
  }

  static findClosest(rivals, average) {
    let distance = [];
    rivals.forEach(rival => {
      let a = Math.abs(rival[0] - average[0]);
      let b = Math.abs(rival[1] - average[1]);
      distance.push(Math.sqrt(a^2 + b^2));
      }
    );
    const min = (values) => values.reduce((x, y) => Math.min(x, y));
    return distance.indexOf(min(distance)); 
  }

  static generateRandom(array) {
    return Math.floor(Math.random() * array.length);
  }
}
