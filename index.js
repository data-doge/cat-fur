const $ = require('jquery')
const raf = require('raf')
const { sin, PI } = Math

const canvas = $('#floor')[0]
const ctx = canvas.getContext('2d')

const canvasWidth = 400
const canvasHeight = 400

const drawCurve = ({ x0, y0, length, theta, amp, thetaOffset, cy }) => {
  let dx = amp * sin(theta * 2 * PI + thetaOffset)
  let y1 = y0 + length
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.bezierCurveTo(
    x0 + dx, y0 + cy,
    x0 - dx, y1 - cy,
    x0, y1
  )
  ctx.stroke()
}

const clear = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

let theta = 0
const draw = () => {
  clear()
  theta = theta + 0.01
  drawCurve({ x0: 50, y0: 50, length: 200, theta, amp: 50, thetaOffset: 0, cy: 50 })
  raf(draw)
}

raf(draw)
