import React from "react";
import { Link } from "react-router-dom";
import mlogo from "./../assets/logo.svg";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const navbar = () => {
  return (
    <Navbar
      className="flex items-center justify-center flex-wrap bg-black p-6 fixed top-0 w-full z-20"
      expand="lg"
    >
      <Navbar.Brand href="#home">
        <Link to={`/`}>
          <div className="flex items-center justify-center flex-shrink-0 text-white mr-6">
            <img
              className="object-cover w-24 mr-2"
              src={mlogo}
              width="54"
              height="54"
              alt="Marvel Logo"
            />
          </div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle className="bg-gray-100" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="text-white">
            <Link to={`/`}>Comics</Link>
          </Nav.Link>
          <Nav.Link className="text-white">
            <Link to={`/`}>Characters</Link>
          </Nav.Link>
          <Nav.Link className="text-white">
            <Link to={`/`}>Stories</Link>
          </Nav.Link>
          <Nav.Link className="text-white">
            <Link to={`/bookmarks`}>Bookmarks</Link>
          </Nav.Link>
        </Nav>
        {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button className="text-red-600 bg-transparent  border-red-600 border-2 hover:border-red-700">Search</Button>
            </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navbar;
