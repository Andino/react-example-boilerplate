import React from 'react';
import mlogo from './../assets/logo.png'

const navbar = () => {
    return (
    <nav className="flex items-center justify-center flex-wrap bg-black p-6">
        <div className="flex items-center justify-center flex-shrink-0 text-white mr-6">
          <img className="object-cover w-24 mr-2" src={mlogo} width="54" height="54" alt="Marvel Logo" />
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto items-center">
          <div className="text-sm lg:flex-grow">
            <a href="#responsive-header" className=" lg:inline-block lg:mt-0 text-white hover:text-red-400 mr-4">
              Characters
            </a>
            <a href="#responsive-header" className=" lg:inline-block lg:mt-0 text-white hover:text-red-400 mr-4">
              Comics
            </a>
            <a href="#responsive-header" className=" lg:inline-block lg:mt-0 text-white hover:text-red-400">
              Stories
            </a>
          </div>
          <div>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">Download</a>
          </div>
        </div>
      </nav>      
    ); 
};

export default navbar;