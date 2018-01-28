const $ = require('jquery')
const raf = require('raf')
const range = require('lodash.range')
const { sin, PI } = Math

const canvas = $('#floor')[0]
const ctx = canvas.getContext('2d')

const canvasWidth = 400
const canvasHeight = 400

const drawCurve = ({ x0, y0, length, theta, thetaOffset }) => {
  const amp = 100 * sin(theta * 0.021 * 2 * PI)
  const dx = amp * sin(theta * 2 * PI + thetaOffset)
  const cy = 50 + 20 * sin(theta * 0.29 * 2 * PI + PI) // 30 to 70
  const y1 = y0 + length
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.bezierCurveTo(
    x0 + dx, y0 + cy,
    x0 - dx, y1 - cy,
    x0, y1
  )
  const gradient = ctx.createLinearGradient(x0, y0, x0, y1)
  gradient.addColorStop('0', '#FFABBE')
  gradient.addColorStop('0.5', '#FFFFFF')
  gradient.addColorStop('1', '#FFABBE')
  ctx.strokeStyle = gradient
  ctx.lineWidth = 2
  ctx.stroke()
}

const clear = () => {
  ctx.fillStyle = 'rgba(177, 212, 247, 0.2)'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

let theta = 0

const draw = () => {
  clear()
  theta = theta + 0.01
  range(-100, 500, 100).forEach(y => {
    range(-50, 460, 10).forEach(x => {
      drawCurve({
        x0: x,
        y0: y,
        length: 100,
        theta,
        thetaOffset: 0
      })
    })
  })
  $('#label').css({
    top: 5 * sin(4 * PI * theta)
  })
  raf(draw)
}

raf(draw)
