export default class View {
  constructor (options) {
    this.canvas = document.getElementById('canvas')
    this.optionsPanel = document.getElementById('options')
    this.resultPanel = document.getElementById('result')
    this.buttonNewGame = document.getElementById('button__newGame')
    this.buttonHideResult = document.getElementById('button__hideResult')
    this.timer = document.getElementById('timer')

    this.miliseconds = 0
    this.canvasWidth = 600
    this.context = this.canvas.getContext('2d')
    this.tileWidth = this.canvas.width / options.sizeX
    this.options = options

    this.deviceSize = window.innerWidth > window.innerHeight ? window.innerHeight * 0.8 : window.innerWidth * 0.8
  }

  drawBoard (board) {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y].revealed && board[x][y].isBomb) {
          this._drawRectangle(x, y, this.options.tileColor)
          this._drawText(x, y, '💣')
        } else if (board[x][y].revealed && !board[x][y].isBomb) {
          this._drawRectangle(x, y, this.options.tileColor)
        } else {
          this._drawRectangle(x, y, this.options.backgroundColor)
        }
        if (board[x][y].counter > 0) {
          this._drawText(x, y, board[x][y].counter)
        }

        if (board[x][y].flagged && !board[x][y].revealed) {
          this._drawText(x, y, '🚩')
        }
      }
    }
  }

  startTimer () {
    window.INTERVAL = setInterval(() => {
      let hours = Math.floor(this.miliseconds / 1000 / 60 / 60)
      let minutes = Math.floor(this.miliseconds / 1000 / 60)
      let seconds = Math.floor(this.miliseconds / 1000)
      let miliseconds = this.miliseconds % 1000

      if (hours < 10) {
        hours = '0' + hours
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      if (miliseconds < 100) {
        miliseconds = '0' + miliseconds
      } else if (miliseconds < 10) {
        miliseconds = '0' + miliseconds
      }

      this.timer.innerText = `${hours}:${minutes}:${seconds}:${miliseconds}`
      this.miliseconds += 10
    }, 1)
  }

  stopTimer () {
    clearInterval(window.INTERVAL)
  }

  resetTimer () {
    this.timer.innerText = `00:00:00`
    this.seconds = 0
  }

  resizeCanvas () {
    let width = this.deviceSize
    let height = this.deviceSize

    if (this.options.sizeX > this.options.sizeY) {
      height = (this.deviceSize * (this.options.sizeY / this.options.sizeX))
    } else {
      width = (this.deviceSize * (this.options.sizeX / this.options.sizeY))
    }

    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
    this.canvas.width = width
    this.canvas.height = height
    this.tileWidth = this.canvas.width / this.options.sizeX
  }

  _drawText (x, y, text) {
    this.context.font = 0.7 * this.tileWidth + 'px Arial'
    this.context.fillStyle = this.options.textColor
    this.context.textAlign = 'center'
    this.context.fillText(text, x * this.tileWidth + this.tileWidth / 2, y * this.tileWidth + this.tileWidth / 1.3)
  }

  _drawRectangle (x, y, color) {
    this.context.strokeStyle = this.options.borderColor
    this.context.fillStyle = color
    this.context.beginPath()
    this.context.rect(x * this.tileWidth, y * this.tileWidth, this.tileWidth, this.tileWidth)
    this.context.fill()
    if (this.options.border) {
      this.context.stroke()
    }
  }
}
