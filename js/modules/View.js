export default class View {
  constructor (options) {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    this.tileWidth = options.tileWidth
  }

  drawBoard (board) {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y].revealed && board[x][y].isBomb) {
          this._drawRectangle(x, y, '#333')
        } else if (board[x][y].revealed && !board[x][y].isBomb) {
          this._drawRectangle(x, y, 'white')
        } else {
          this._drawRectangle(x, y, 'black')
        }
      }
    }
  }

  _drawRectangle (x, y, color) {
    this.context.strokeStyle = 'red'
    this.context.fillStyle = color
    this.context.beginPath()
    this.context.rect(x * this.tileWidth, y * this.tileWidth, this.tileWidth, this.tileWidth)
    this.context.fill()
    this.context.stroke()
  }
}
