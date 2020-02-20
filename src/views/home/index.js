import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import ComicsList from './../../containers/Comics/ComicsList';
class Home extends Component{
  render(){
      console.log("Home");
    return (
        <div className="w-full h-full">
            <ComicsList className="w-full"></ComicsList>
        </div>
    );
  }
}

export default Home;
