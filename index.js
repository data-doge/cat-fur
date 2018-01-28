const $ = require('jquery')
const raf = require('raf')
const range = require('lodash.range')
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
  ctx.strokeStyle = '#FFABBE'
  ctx.lineWidth = 3
  ctx.stroke()
}

const clear = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

let theta = 0
const draw = () => {
  clear()
  theta = theta + 0.01

  range(-100, 400, 100).forEach(y => {
    range(0, 410, 10).forEach(x => {
      drawCurve({
        x0: x,
        y0: y,
        length: 100,
        theta,
        thetaOffset: 0,
        amp: 50,
        cy: 20
      })
    })
  })
  raf(draw)
}

raf(draw)
