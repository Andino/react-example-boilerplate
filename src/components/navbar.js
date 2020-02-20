import React from 'react';
import mlogo from './../assets/logo.png'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'


const navbar = () => {
    return (
        <Navbar className="flex items-center justify-center flex-wrap bg-black p-6 fixed top-0 w-full z-20"  expand="lg">
          <Navbar.Brand href="#home">
            <div className="flex items-center justify-center flex-shrink-0 text-white mr-6">
              <img className="object-cover w-24 mr-2" src={mlogo} width="54" height="54" alt="Marvel Logo" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home" className="text-white">Comics</Nav.Link>
              <Nav.Link href="#link" className="text-white">Characters</Nav.Link>
              <Nav.Link href="#link" className="text-white">Stories</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button className="text-red-600 bg-transparent  border-red-600 border-2 hover:border-red-700">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    ); 
};

export default navbar;