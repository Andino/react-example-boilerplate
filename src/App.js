import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import animationData from './assets/json/spinner.json'
import Home from './views/home'
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
            <div className="h-full mt-20">
              <Router>
              <div className="h-full">
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/2" component={this.render2}></Route>
                </div>
              </Router>
            </div>
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
        <Navbar></Navbar>
        <PrincipalComponent></PrincipalComponent>
      </div>
    );
  }
}

export default App;
