import  React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchComics, fetchMoreComics} from './../../actions/comics'
import animationData from './../../assets/json/spinner.json'
import Lottie from 'react-lottie';
import { bindActionCreators } from 'redux';
import ComicsCard from './../../components/ComicsCards'
import {Animated} from "react-animated-css";
import "./../../css/animate.css";
import debounce from "lodash.debounce";

class comicsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStopped: false,
            isPaused: false,
            error: false,
            hasMore: true,
            isLoading: false,
        };
        window.onscroll = debounce(() => {
            const {fetchMorecomics, comics} = this.props;
            const {error, hasMore, isLoading} = this.state;
            if (
              window.innerHeight + document.documentElement.scrollTop
              > document.body.scrollHeight
            ) {
                fetchMorecomics(comics.length);
            }
          }, 100);
    }
    componentDidMount() {
        const {fetchComicsAction} = this.props;
        fetchComicsAction();
    }

    render(){
        let {comics} = this.props;
        return(            
            <Body comics={comics}></Body>
        )
    }
};
let Body = ({comics}) =>{
    if(!comics.length){
        return (
            <div className="bg-black h-full flex justify-center items-center w-full">
            <Lottie
              className = "w-full"
              options={defaultOptions}
              height={100}
              width={100}/>
            {/* <button style={buttonStyle} onClick={() => this.setState({isStopped: true})}>stop</button>
            <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>play</button>
            <button style={buttonStyle} onClick={() => this.setState({isPaused: !this.state.isPaused})}>pause</button> */}
            </div>
        )
    }
    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-1/2 m-5">
                <h1 className="text-6xl">Comics: <small className="font-light text-gray-600 text-3xl">view all the comics created by the Marvel's industries</small></h1>
            </div>
            <div className="flex flex-wrap items-center w-full content-center justify-center">
                {comics.map(comic => {
                    return(
                        <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                            <ComicsCard comics= {comic} key={comic.id}></ComicsCard>
                        </Animated>
                    );
                })}
            </div>
        </div>
    )
}

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchComicsAction: fetchComics,
    fetchMorecomics: fetchMoreComics,
}, dispatch)
 

const mapStateToProps = ({comics}) => {
    return {
        comics: comics
    }
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(comicsList);