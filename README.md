# react-3dgallery [![NPM](https://img.shields.io/npm/v/%40absolom/react-3dgallery.svg)](https://www.npmjs.com/package/%40absolom/react-3dgallery) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> an adaptation of [this gallery](https://www.script-tutorials.com/3d-gallery-using-javascript/)

## Demo

[live demo](https://abs0lom.github.io/react-3dgallery/)

## Install

```bash
npm install --save @absolom/react-3dgallery
```

## Usage

```jsx
import React, { Component } from 'react'

import Gallery from '@absolom/react-3dgallery'

class Example extends Component {
  render () {
    return (
      <Gallery
          images={[
            {src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg'},
          ]}
          backButton={({className}) => <button className={className} onClick={() => console.log("back action")}>Back</button>}
        />
    )
  }
}
```

## All Properties

``` js
images = [
  {
    src: "url of image (required)",
    text: "optional label"
  },
  ...
]

background = {
  color: "optional color of background, default #000000",
  image: "url of optional background image"
}

backButton // a React element, like a button or link (required)
```

## To-do

* add option to set corner where the back button appears
* add option to set fullscreen display
* change the names of the variables for more explicit names
* continue to adapt the code to React logic

## License

MIT © [abs0lom](https://github.com/abs0lom)
