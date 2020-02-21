import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import unknown from "./../../../assets/unknown.png";
import { apiUrl, publicApiKey, hash, ts } from "./../../../constants";
import { Animated } from "react-animated-css";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
  Image
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import axios from "axios";

const ComicDetail = () => {
  let { id } = useParams();
  // const [isLoading,setIsLoading] = useState(true)
  const [commicDetail, setCommicDetail] = useState([]);
  const [isBookmark, setIsBookmark] = useState(true);
  const [comicCharacters, setComicCharacters] = useState([]);
  const [comicStories, setComicStories] = useState([]);

  const fetchComicData = async () => {
    try {
      // setIsLoading(true);
      let {
        data: {
          data: { results }
        }
      } = await axios.get(
        `${apiUrl}/comics/${id}?ts=${ts}&apikey=${publicApiKey}&hash=${hash}`
      );
      setCommicDetail(results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComicCharacter = async () => {
    try {
      // setIsLoading(true);
      let {
        data: {
          data: { results }
        }
      } = await axios.get(
        `${apiUrl}/comics/${id}/characters?ts=${ts}&apikey=${publicApiKey}&hash=${hash}`
      );
      /*
       * If you want to see the characters fetch, use this request for obtain all the characters
       * await axios.get(`${apiUrl}/characters?ts=${ts}&apikey=${publicApiKey}&hash=${hash}`);
       */
      setComicCharacters(results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComicStories = async () => {
    try {
      // setIsLoading(true);
      let {
        data: {
          data: { results }
        }
      } = await axios.get(
        `${apiUrl}/comics/${id}/stories?ts=${ts}&apikey=${publicApiKey}&hash=${hash}`
      );

      setComicStories(results);
    } catch (error) {
      console.log(error);
    }
  };

  const verificateBookmark = () => {
    let flag = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (flag.filter(favorite => favorite.id == id).length > 0) {
      setIsBookmark(true);
      return;
    }
    setIsBookmark(false);
  };

  const addBookmark = item => {
    if (isBookmark) return deleteBookmark();

    let flag_array = [];
    let new_data = {
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail
    };
    flag_array = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (flag_array.filter(favorite => favorite.id == item.id).length == 0) {
      flag_array.push(new_data);
      localStorage.setItem("bookmarks", JSON.stringify(flag_array));
      setIsBookmark(true);
    }
  };

  const deleteBookmark = () => {
    let flag_array = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let new_array = flag_array.filter(favorite => favorite.id != id);
    localStorage.setItem("bookmarks", JSON.stringify(new_array));
    setIsBookmark(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComicData();
    verificateBookmark();
    fetchComicCharacter();
    fetchComicStories();
    // .finally(()=>setIsLoading(false))
  }, []);
  return (
    <div className="h-full">
      <div className="w-full h-full bg-black">
        {commicDetail.map(detail => {
          return (
            <Animated
              className="h-full"
              key={detail.id}
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible={true}
              animationInDuration={500}
            >
              <div className="h-full relative">
                <div
                  className="w-full h-screen flex flex-wrap bg-cover absolute top-0 z-0"
                  style={{
                    backgroundImage: `url(${detail.thumbnail.path}.${detail.thumbnail.extension})`,
                    opacity: "0.2",
                    filter: "blur(9px)"
                  }}
                ></div>
                <div className="w-full h-full flex justify-center items-center content-center ">
                  <div className="w-full h-full lg:flex xl:flex flex-no-wrap sm:flex-wrap md:flex-wrap lg:flex-no-wrap xl:flex-no-wrap  justify-center items-center content-center m-2 lg:m-20 xl:lg:m-20">
                    <div className=" xss:w-full xs:w-full sm:w-full md:w-full flex justify-center">
                      <div
                        className="w-48 h-64 mt-1 lg:mt-0 xl:mt-0 lg:w-comic xl:w-comic lg:h-comic xl:h-comic bg-cover"
                        style={{
                          backgroundImage: ` url(${detail.thumbnail.path}.${detail.thumbnail.extension})`
                        }}
                      ></div>
                    </div>
                    <div className="xs:w-full sm:w-full md:w-full flex justify-end content-start ml-0 md:ml-16 lg:ml-16 xl:ml-16 z-10">
                      <div className="w-full">
                        <p className="text-white text-4xl">{detail.title} </p>
                        <h1
                          className=" w-64 text-base animated infinite pulse slower text-red-500 cursor-pointer hover:text-red-300 transition duration-200 ease-in-out"
                          onClick={() => addBookmark(detail)}
                        >
                          {!isBookmark
                            ? "+ Add to bookmark's"
                            : "- Remove from bookmark's"}
                        </h1>
                        <p className="text-white text-1xl">
                          {detail.description}
                        </p>
                        <CarouselProvider
                          className="mt-2"
                          naturalSlideWidth={10}
                          naturalSlideHeight={35}
                          totalSlides={detail.images.length - 1}
                          visibleSlides={2}
                        >
                          <p className="text-white text-2xl">More images</p>
                          <Slider className="h-56">
                            {detail.images.map(image => {
                              return (
                                <Slide className="w-40 h-56" index={0}>
                                  <Image
                                    hasMasterSpinner="yes"
                                    className="w-40 h-56"
                                    src={`${image.path}.${image.extension}`}
                                  ></Image>
                                </Slide>
                              );
                            })}
                          </Slider>
                        </CarouselProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          );
        })}
      </div>
      <div className="w-full">
        <div className="w-full  flex justify-center content-center">
          <div className="w-full h-full flex flex-wrap justify-center md:justify-start lg:justify-start xl:justify-start">
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 md:m-20 lg:m-20 xl:m-20">
              <h1 className="text-6xl m-2">Characters:</h1>
              <small className="font-light text-gray-600 text-3xl m-2">
                View all the character from the current comic
              </small>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex w-11/12 overflow-x-auto overflow-y-hidden">
                {comicCharacters.map(character => {
                  return (
                    <div className="flex">
                      <div className="flex flex-col content-center justify-center m-4 shadow-sm hover:text-red-600 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <div
                          className="w-40 h-64 bg-cover"
                          style={{
                            backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`
                          }}
                        ></div>
                        <div className="w-40 text-xl truncate text-center text-class mt-2">
                          {character.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center w-full text-3xl">
                  {!comicCharacters.length
                    ? "This comic not have characters registered"
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full flex justify-center content-center">
          <div className="w-full h-full flex flex-wrap justify-center md:justify-start lg:justify-start xl:justify-start">
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 md:m-20 lg:m-20 xl:m-20">
              <h1 className="text-6xl m-2">Stories:</h1>
              <small className="font-light text-gray-600 text-3xl m-2">
                View all the stories from the current comic
              </small>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex w-11/12 overflow-x-auto overflow-y-hidden">
                {comicStories.map(character => {
                  return (
                    <div className="flex">
                      <div className="flex flex-col content-center justify-center m-4 shadow-sm hover:text-red-600 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <div
                          className="w-40 h-64 bg-center"
                          style={{
                            backgroundImage: `url(${unknown})`
                          }}
                        ></div>
                        <div className="w-40 text-xl truncate text-center text-class mt-2">
                          {character.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center w-full text-3xl">
                  {!comicStories.length
                    ? "This comic not have stories registered"
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
