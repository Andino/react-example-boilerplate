import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchComics, fetchMoreComics } from "./../../actions/comics";
import animationData from "./../../assets/json/spinner.json";
import Lottie from "react-lottie";
import { bindActionCreators } from "redux";
import ComicsCard from "./../../components/ComicsCards";
import { Animated } from "react-animated-css";
import "./../../css/animate.css";
import debounce from "lodash.debounce";
import { Spinner, Button, Form, FormControl, Dropdown } from "react-bootstrap";

class comicsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: {
        name: "",
        value: ""
      },
      isStopped: false,
      isPaused: false,
      isFiltered: false,
      error: false,
      hasMore: true,
      isLoading: false,
      title: "",
      filter: [
        { name: "Comic", value: "comic" },
        { name: "Magazine", value: "magazin" },
        { name: "Trade paperback", value: "trade paperback" },
        { name: "Hardcover", value: "hardcover" },
        { name: "Digest", value: "digest" },
        { name: "Graphic novel", value: "graphic novel" },
        { name: "Digital comic", value: "digital comic" },
        { name: "Infinite comic", value: "infinite comic" }
      ]
    };
    window.onscroll = debounce(async () => {
      const { fetchMorecomics, comics } = this.props;
      const { isLoading, filters } = this.state;
      if (
        window.innerHeight + document.documentElement.scrollTop >
          document.body.scrollHeight &&
        comics.length > 0
      ) {
        this.setState({
          isLoading: true
        });
        await fetchMorecomics(comics.length, filters);
        this.setState({
          isLoading: false
        });
      }
    }, 100);
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = () => {
    this.callFilters();
  };

  setFilter = async selected => {
    await this.setState({
      selectedFilter: selected
    });
    this.callFilters();
  };

  callFilters = async () => {
    this.setState({
      isLoading: true,
      isFiltered: true
    });
    let filters = "";
    let { title, selectedFilter } = this.state;

    if (selectedFilter.name != "") {
      filters = filters + `&format=${selectedFilter.value}`;
    }
    if (title != "") {
      filters = isNaN(title)
        ? filters + `&title=${title}`
        : filters + `&issueNumber=${title}`;
    }
    const { fetchComicsAction } = this.props;
    await fetchComicsAction(filters);
    this.setState({
      isLoading: false,
      isFiltered: false
    });
  };

  componentDidMount() {
    const { fetchComicsAction } = this.props;
    fetchComicsAction();
  }

  render() {
    let { comics } = this.props;
    let { isLoading, filter, selectedFilter, title, isFiltered } = this.state;
    return (
      <Body
        comics={comics}
        isLoading={isLoading}
        isFiltered={isFiltered}
        handleInputChange={this.handleInputChange}
        onChange={this.handleChange}
        filters={filter}
        setFilter={this.setFilter}
        selectedFilter={selectedFilter}
        title={title}
      ></Body>
    );
  }
}

let Body = ({
  comics,
  isLoading,
  onChange,
  filters,
  setFilter,
  selectedFilter,
  title,
  handleInputChange,
  isFiltered
}) => {
  if (!comics.length && selectedFilter.name == "" && title == "") {
    return (
      <div className="bg-black h-full flex justify-center items-center w-full">
        <Lottie
          className="w-full"
          options={defaultOptions}
          height={100}
          width={100}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:flex lg:flex xl:flex justify-center flex-no-wrap  sm:flex-wrap md:flex-no-wrap lg:flex-no-wrap xl:flex-no-wrap mt-3">
        <div className="w-full md:flex lg:flex xl:flex justify-center flex-no-wrap  sm:flex-wrap md:flex-no-wrap lg:flex-no-wrap xl:flex-no-wrap ">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2  md:m-20 lg:m-20 xl:m-20">
            <h1 className="text-6xl">Comics:</h1>
            <small className="font-light text-gray-600 text-3xl">
              view all the comics created by the Marvel's industries
            </small>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 md:m-20 lg:m-20 xl:m-20 items-start md:items-center lg:items-end xl:items-end flex justify-end">
            <Dropdown className="">
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {selectedFilter.name == "" ? "Filters" : selectedFilter.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {filters.map(filter => {
                  return (
                    <Dropdown.Item onClick={() => setFilter(filter)}>
                      {filter.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
                className="w-full"
                name="title"
                value={title}
              />
              <Button
                onClick={onChange}
                className="bg-transparent border-2 border-red-700 text-red-700 hover:text-red-500  hover:border-red-500 transition duration-200 ease-in-out"
              >
                Search
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <ComicsSection
        comics={comics}
        isLoading={isLoading}
        isFiltered={isFiltered}
      ></ComicsSection>
    </div>
  );
};

const ComicsSection = ({ comics, isLoading, isFiltered }) => {
  if (!comics.length) {
    return (
      <div className="flex flex-wrap items-center w-full content-center justify-center">
        <div className="h-full flex justify-center items-center content-center w-full">
          Register not found
        </div>
        <div className="w-full flex justify-center m-10">
          <SpinnerContainer isLoading={isLoading}></SpinnerContainer>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center w-full content-center justify-center">
      {isFiltered == true
        ? ""
        : comics.map(comic => {
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
      <div className="w-full flex justify-center m-10">
        <SpinnerContainer isLoading={isLoading}></SpinnerContainer>
      </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchComicsAction: fetchComics,
      fetchMorecomics: fetchMoreComics
    },
    dispatch
  );

const mapStateToProps = ({ comics }) => {
  return {
    comics: comics
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(comicsList);
