import React from 'react';
import {FaRegHeart, FaHeart} from "react-icons/fa";
import './Likebutton.css' ;
//
// function handleClick(LikeFlag){
//
// }

export default class Likebutton extends React.Component{
  state = {
    Like: false,
    Icon: <FaRegHeart className="LikeIcon" color="pink" size = "2em"/>
  }

  handleClick(){
    if (!this.state.Like){
      this.setState({
        Like: true,
        Icon:<FaHeart className="LikeIcon" color="pink" size = "2em"/>
      })
    }
    else{
      this.setState({
        Like: false,
        Icon:<FaRegHeart className="LikeIcon" color="pink" size = "2em"/>
      }
    )
    }
  }

  render(){
    return (
      <button className="Likebutton"
          onClick = {() => this.handleClick()}>
          {this.state.Icon}
      </button>
    )
  }
}


// export default function LikeButton() {
//   const [liked, setLiked] = useState(null);
//   return (
//     // LikeFlag = false,
//     <button className="Likebutton"
//     onClick = {() => alert("1")}>
//     <Icon className="LikeIcon" color="pink"/>
//     </button>
//   );
// }
