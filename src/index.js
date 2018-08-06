import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class D3Gallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      text: PropTypes.string
    })).isRequired,
    background: PropTypes.shape({
      color: PropTypes.string,
      image: PropTypes.string
    }),
    backButton: PropTypes.function
  };

  state = {
    xm: 0,
    ym: 0,
    cx: 0,
    cy: 0,
    S: 0,
    xt: 0,
    yt: 0,
    zt: 0,
    objects: [],
    x: 0,
    y: 0,
    z: -30000
  }

  componentDidMount() {
    document.onmousemove = (e) => {
      if (window.event) e = window.event
      this.setState({
        xm: (e.x || e.clientX) - this.galRef.offsetLeft - this.galRef.offsetWidth * 0.5,
        ym: (e.y || e.clientY) - this.galRef.offsetTop - this.galRef.offsetHeight * 0.5
      })
    }
    const { objects } = this.state
    const zoom = this.galRef.offsetHeight / 900
    const img = this.galRef.getElementsByTagName('img')
    const span = this.galRef.getElementsByTagName('span')
    const { length } = img
    for (let i = 0; i < length; i++) {
      objects[i] = {
        x: zoom * Math.random() * this.galRef.offsetWidth * 3 - this.galRef.offsetWidth,
        y: zoom * Math.random() * this.galRef.offsetHeight * 3 - this.galRef.offsetHeight,
        width: img[i].naturalWidth,
        height: img[i].naturalHeight,
        z: Math.round(i * (10000 / length)),
        img: img[i],
        oxt: span[i],
        oxs: span[i].style
      }
      const zIndex = Math.round(1000000 - objects[i].z)
      if (objects[i].oxt.innerHTML === '') {
        objects[i].oxt.style.display = 'none'
      }
      objects[i].oxt.style.zIndex = zIndex
      objects[i].img.style.zIndex = zIndex
      objects[i].img.parent = this
      objects[i].img.alt = i
      objects[i].img.onclick = e => this.click(e.target.alt)
      objects[i].img.ondrag = () => false
    }
    this.setState({
      cx: this.galRef.offsetWidth / 2,
      cy: this.galRef.offsetHeight / 2
    })
    this.run()
    this.click(0)
  }

  componentDidUpdate() {
  }

  galRef = null;

  toPx = x => ''.concat(Math.round(x), 'px');

  run = () => {
    const {
      cx, xm, ym, cy, xt, yt, zt, x, y, z, objects: { length }
    } = this.state
    this.setState({
      cx: cx + (xm - cx) * 0.1,
      cy: cy + (ym - cy) * 0.1,
      x: x + (xt - x) * 0.05,
      y: y + (yt - y) * 0.05,
      z: z + (zt - z) * 0.02
    })
    let i = length
    while (i--) this.anim(i)
    setTimeout(this.run, 16)
  }

  anim = (n) => {
    const {
      objects, z, cx, cy, x, y
    } = this.state
    const zoom = this.galRef.offsetHeight / 900
    const f = 700 + objects[n].z - z
    if (f > 0) {
      const d = 1000 / f
      const X = this.galRef.offsetWidth * 0.5 + ((objects[n].x - x - cx) * d)
      const Y = this.galRef.offsetHeight * 0.5 + ((objects[n].y - y - cy) * d)
      const W = d * objects[n].width * zoom
      const H = d * objects[n].height * zoom
      objects[n].img.style.left = this.toPx(X - W * 0.5)
      objects[n].img.style.top = this.toPx(Y - H * 0.5)
      objects[n].img.style.width = this.toPx(W)
      objects[n].img.style.height = this.toPx(H)
      objects[n].oxs.left = this.toPx(X - W * 0.5)
      objects[n].oxs.top = this.toPx(Y + H * 0.5)
      objects[n].oxs.fontSize = this.toPx(1 + d * 20 * zoom)
      objects[n].oxs.lineHeight = objects[n].oxs.fontSize
    } else {
      objects[n].x = zoom * Math.random() * this.galRef.offsetWidth * 3 - this.galRef.offsetWidth
      objects[n].y = zoom * Math.random() * this.galRef.offsetHeight * 3 - this.galRef.offsetHeight
      objects[n].z += 10000
      objects[n].oxs.zIndex = Math.round(1000000 - objects[n].z)
      objects[n].img.style.zIndex = Math.round(1000000 - objects[n].z)
    }
    // this.setState({objects})
  };

  click = (n) => {
    const {
      objects, zt, S
    } = this.state
    const o = objects[n]
    if (S !== o) {
      this.setState({
        xt: o.x,
        yt: o.y,
        zt: o.z,
        S: o
      })
    } else {
      this.setState({
        xt: o.x,
        yt: o.y,
        zt: zt + 1600,
        S: 0
      })
    }
  };

  render() {
    const {
      className,
      images,
      backButton
    } = this.props
    return (
      <div ref={(e) => { this.galRef = e }} className={className} >
        {backButton({className: 'button'})}
        {images.map(({ src, text }, key) => [
          <img src={src} alt='' key={'img' + key} />,
          <span key={'span' + key} >{text}</span>
        ])}
      </div>
    )
  }
}

export default styled(D3Gallery)`
  position:absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  background:
    ${({ background = {} }) => (background.color || '#171717')}
    ${({ background = {} }) => (background.image && `url(${background.image})`)}
    no-repeat center;
  background-size: 60%;
  overflow: hidden;
  .button {
    position: relative;
    z-index: 1000000000;
  }
  img {
    position: absolute;
    background: #666666;
    overflow: hidden;
    cursor: pointer;
    left: 100%;
    border-color: #333;
    border-style: solid;
    border-width: 1px;
  }
  span {
    position: absolute;
    color: white;
    background-color: #00000090;
  }
`
