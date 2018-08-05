import React, { Component } from 'react'

import ExampleComponent from 'react-3dgallery'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent
          images={[
            {src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_960_720.jpg'},
            {src: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg'},
          ]}
          backButton={({className}) => <button className={className} onClick={() => console.log("back action")}>Back</button>}
        />
      </div>
    )
  }
}
