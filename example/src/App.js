import React, { Component } from 'react'

import ExampleComponent from '@absolom/react-3dgallery'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent
          images={[
            {src: 'https://abs0lom.github.io/react-3dgallery/road-1072823_960_720.jpg'},
            {src: 'https://abs0lom.github.io/react-3dgallery/green-1072828_960_720.jpg'},
            {src: 'https://abs0lom.github.io/react-3dgallery/mountain-landscape-2031539_960_720.jpg'},
            {src: 'https://abs0lom.github.io/react-3dgallery/beach-1867285_960_720.jpg'},
            {src: 'https://abs0lom.github.io/react-3dgallery/nature-3082832_960_720.jpg'},
          ]}
          backButton={({className}) => <button className={className} onClick={() => window.location.href = "https://github.com/abs0lom/react-3dgallery"}>Back</button>}
        />
      </div>
    )
  }
}
