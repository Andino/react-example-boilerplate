import React, { Component } from "react";
import { Link } from "react-router-dom";
import animationData from "./../../assets/json/spinner.json";
import Lottie from "react-lottie";
import ComicsCard from "./../../components/ComicsCards";
import { Animated } from "react-animated-css";
import "./../../css/animate.css";
import { Spinner, Button, Form, FormControl, Dropdown } from "react-bootstrap";

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      isPaused: false,
      error: false,
      hasMore: true,
      isLoading: false,
      comics: []
    };
  }

  componentDidMount() {
    this.setState({
      comics: JSON.parse(localStorage.getItem("bookmarks"))
    });
  }

  render() {
    let { isLoading, comics } = this.state;
    return (
      <Body
        comics={comics}
        isLoading={isLoading}
        handleInputChange={this.handleInputChange}
        onChange={this.handleChange}
        setFilter={this.setFilter}
      ></Body>
    );
  }
}

let Body = ({ comics, isLoading }) => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:flex lg:flex xl:flex justify-center flex-no-wrap  sm:flex-wrap md:flex-no-wrap lg:flex-no-wrap xl:flex-no-wrap mt-3">
        <div className="w-full md:flex lg:flex xl:flex justify-start flex-no-wrap  sm:flex-wrap md:flex-no-wrap lg:flex-no-wrap xl:flex-no-wrap ">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2  md:m-20 lg:m-20 xl:m-20">
            <h1 className="text-6xl">Bookmarks:</h1>
            <small className="font-light text-gray-600 text-3xl">
              All the comics you have selected as favorites
            </small>
          </div>
        </div>
      </div>
      <ComicsSection comics={comics} isLoading={isLoading}></ComicsSection>
    </div>
  );
};

const ComicsSection = ({ comics, isLoading }) => {
  if (comics == "") {
    return (
      <div className="flex flex-wrap items-center w-full content-center justify-center">
        <div className="h-full flex justify-center items-center content-center w-full text-3xl">
          Bookmars not added yet
        </div>
        <div className="w-full flex justify-center m-10">
          <SpinnerContainer isLoading={isLoading}></SpinnerContainer>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center w-full content-center justify-center">
      {comics.map(comic => {
        return (
          <Animated
            key={comic.id}
            animationIn="fadeInUp"
            animationOut="fadeOut"
            isVisible={true}
            animationInDuration={500}
          >
            <Link to={`comics/${comic.id}`}>
              <ComicsCard comics={comic} key={comic.id}></ComicsCard>
            </Link>
          </Animated>
        );
      })}
    </div>
  );
};

const SpinnerContainer = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return "";
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default Bookmarks;
