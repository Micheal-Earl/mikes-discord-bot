class Grid {
  constructor() {
    this.height = 5;
    this.width = 5;
    this.layout = this.generate();
  }

  generate = () => {
    let out = [];
    for (let i = 0; i < this.height; i++) {
      out[i] = [];
      for (let j = 0; j < this.width; j++) {
        out[i].push("#");
      }
    }

    return out;
  };

  stringify = (x = null, y = null) => {
    let out = "";
    if (x != null || y != null) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          if (i === x && j === y) {
            out += "X" + "   ";
          } else {
            out += this.layout[i][j] + "   ";
          }
        }
        out += "\n";
      }
    } else {
      out = this.layout
        .map((square) => {
          let row = square;
          return row.join("   ");
        })
        .join("\n");
    }

    console.log(out);

    return out;
  };
}

module.exports = new Grid();
