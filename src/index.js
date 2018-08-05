import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class D3Gallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      text: PropTypes.string,
    })).isRequired,
    background: PropTypes.shape({
      color: PropTypes.string,
      image: PropTypes.string,
    }),
    backButton: PropTypes.element,
  };

  state = {
    xm: 0,
    ym: 0,
    cx: 0,
    cy: 0,
    nx: 0,
    ny: 0,
    nw: 0,
    nh: 0,
    S: 0,
    xt: 0,
    yt: 0,
    zt: 0,
    zoom: 1,
    objects: [],
    x: 0,
    y: 0,
    z: -30000,
  }

  componentDidMount() {
    document.onmousemove = (e) => {
      const {
        nx, nw, ny, nh,
      } = this.state;
      if (window.event) e = window.event;
      this.setState({
        xm: (e.x || e.clientX) - nx - nw * 0.5,
        ym: (e.y || e.clientY) - ny - nh * 0.5,
      });
    };
    this.resize();
    const {
      nw,
      nh,
      objects,
      zoom,
    } = this.state;
    const img = this.galRef.getElementsByTagName('img');
    const span = this.galRef.getElementsByTagName('span');
    const { length } = img;
    for (let i = 0; i < length; i++) {
      objects[i] = {
        n: i,
        x: zoom * Math.random() * nw * 3 - nw,
        y: zoom * Math.random() * nh * 3 - nh,
        z: Math.round(i * (10000 / length)),
        w: img[i].width,
        h: img[i].height,
        oxt: span[i],
        oxs: span[i].style,
        obj: img[i],
        obs: img[i].style,
        F: false,
        CF: 100,
        sto: [],
      };
      const zIndex = Math.round(1000000 - objects[i].z);
      if (objects[i].oxt.innerHTML === '') {
        objects[i].oxt.style.display = 'none';
      }
      objects[i].oxt.style.zIndex = zIndex;
      objects[i].obj.style.zIndex = zIndex;
      objects[i].obj.parent = this;
      objects[i].obj.alt = i;
      objects[i].obj.onclick = e => this.click(e.target.alt);
      objects[i].obj.ondrag = () => false;
    }
    this.setState({
      cx: nw / 2,
      cy: nh / 2,
    });
    this.run();
    this.click(0);
  }

  componentDidUpdate() {
    this.resize();
  }

  galRef = null;

  toPx = x => ''.concat(Math.round(x), 'px');

  resize = () => {
    const {
      nx, ny, nw, nh,
    } = this.state;
    const nnh = this.galRef.offsetHeight;
    if (nx !== this.galRef.offsetLeft
    || ny !== this.galRef.offsetTop
    || nw !== this.galRef.offsetWidth
    || nh !== nnh) {
      this.setState({
        nx: this.galRef.offsetLeft,
        ny: this.galRef.offsetTop,
        nw: this.galRef.offsetWidth,
        nh: nnh,
        zoom: nnh / 900,
      });
    }
  }

  run = () => {
    const {
      cx, xm, ym, cy, xt, yt, zt, x, y, z, objects: { length },
    } = this.state;
    this.setState({
      cx: cx + (xm - cx) * 0.1,
      cy: cy + (ym - cy) * 0.1,
      x: x + (xt - x) * 0.05,
      y: y + (yt - y) * 0.05,
      z: z + (zt - z) * 0.02,
    });
    let i = length;
    while (i--) this.anim(i);
    setTimeout(this.run, 16);
  }

  anim = (n) => {
    const {
      objects, zoom, nw, nh, z, cx, cy, zt, x, y,
    } = this.state;
    const o = objects[n];
    const f = 700 + o.z - z;
    if (f > 0) {
      const d = 1000 / f;
      const X = nw * 0.5 + ((o.x - x - cx) * d);
      const Y = nh * 0.5 + ((o.y - y - cy) * d);
      const W = d * o.w * zoom;
      const H = d * o.h * zoom;
      o.obs.left = this.toPx(X - W * 0.5);
      o.obs.top = this.toPx(Y - H * 0.5);
      o.obs.width = this.toPx(W);
      o.obs.height = this.toPx(H);
      o.oxs.left = this.toPx(X - W * 0.5);
      o.oxs.top = this.toPx(Y + H * 0.5);
      o.oxs.fontSize = this.toPx(1 + d * 20 * zoom);
      o.oxs.lineHeight = o.oxs.fontSize;
    } else {
      o.x = zoom * Math.random() * nw * 3 - nw;
      o.y = zoom * Math.random() * nh * 3 - nh;
      o.z += 10000;
      o.oxs.zIndex = Math.round(1000000 - o.z);
      o.obs.zIndex = Math.round(1000000 - o.z);
    }
  };

  click = (n) => {
    const {
      objects, zt, S,
    } = this.state;
    const o = objects[n];
    if (S !== o) {
      this.setState({
        xt: o.x,
        yt: o.y,
        zt: o.z,
        S: o,
      });
    } else {
      this.setState({
        xt: o.x,
        yt: o.y,
        zt: zt + 1600,
        S: 0,
      });
    }
  };

  render() {
    const {
      className,
      images,
      backButton,
    } = this.props;
    return (
      <div ref={(e) => { this.galRef = e; }} className={className} >
        {backButton({className: 'button'})}
        {images.map(({ src, text }) => [
          <img src={src} alt="" />,
          <span>{text}</span>,
        ])}
      </div>
    );
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
`;

