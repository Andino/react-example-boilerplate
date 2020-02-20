import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import animationData from './assets/json/spinner.json'
import Home from './views/home'
import ComicDetail from './views/comics/detail'
import Lottie from 'react-lottie';
import Navbar from './components/navbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  constructor (props){
    super(props);
    this.state = {
        isStopped: false,
        isPaused: false,
    };
    console.log("App");

  }
  componentDidMount(){
    setTimeout(()=> {
      this.setState({
        isStopped: true,
      });
    }, 1000);
  }

  render(){
  
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const PrincipalComponent = () =>{
        if(this.state.isStopped){
          return (
            
            <Router>
              <Navbar></Navbar>
                <div className="h-full mt-20">
                  <div className="h-full">
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/comics/:id" component={ComicDetail}></Route>
                    <Route exact path="/stories" component={Home}></Route>
                  </div>
                </div>
            </Router>
          );
        }
        else{
          return (
            <div className="bg-black h-full flex justify-center items-center w-full">
            <Lottie
              className = "w-full"
              options={defaultOptions}
              height={100}
              width={100}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}/>
            {/* <button style={buttonStyle} onClick={() => this.setState({isStopped: true})}>stop</button>
            <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>play</button>
            <button style={buttonStyle} onClick={() => this.setState({isPaused: !this.state.isPaused})}>pause</button> */}
            </div>
          );
        }
    };
    return (
      
      <div className="h-screen">
        <PrincipalComponent></PrincipalComponent>
      </div>
    );
  }
}

export default App;
