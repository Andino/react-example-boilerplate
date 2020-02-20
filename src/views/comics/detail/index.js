import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import ComicsList from './../../../containers/Comics/ComicsList';
class ComicDetail extends Component{
  render(){
    return (
        <div className="w-full h-full">
            <ComicsList className="w-full"></ComicsList>
        </div>
    );
  }
}

export default ComicDetail;