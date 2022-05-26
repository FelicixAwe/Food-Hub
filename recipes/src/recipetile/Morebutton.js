import React from 'react';
//
// function handleClick(LikeFlag){
//
// }

export default class Morebutton extends React.Component{
  state = {

  }

  handleClick(){
    
  }

  render(){
    return (
      <button className="Morebutton"
          onClick = {() => this.handleClick()}>
          {this.state.Icon}
      </button>
    )
  }
}