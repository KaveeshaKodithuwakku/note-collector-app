import React, { useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png'
import { FaHome, FaPlus, FaRegUser, FaRegUserCircle, FaUser } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import NavDropdown from 'react-bootstrap/NavDropdown';




export default function NavBar() {

    // const Menu = ['Logout'];
    // const [open,setOpen] = useState(false);

    // const menuRef = useRef();
    // const imgRef = useRef();

    const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }


    return (
        <div className='sticky-top'>
            <Navbar  className='navbar navbar-custom'>
                {/* <Container> */}
                    <Navbar.Brand className='navbar-title'>
                        <img src={logo} alt="" className='img-center' /> MyNotes
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className='navbar-text nav-link' to={"/home"}>
                            <FaHome className='navbar-icon'/> Home </Link>
                        <Link className='navbar-text nav-link' to={"/add"}>
                            <FaPlus />
                            Add Notes</Link>
                        <Link className='navbar-text nav-link' to={"/view"}>
                            <BsGrid />
                            View</Link>

                            {/* <Link className='navbar-text nav-link' to={"/calendar"}>
                            <BsGrid />
                            Calendar</Link> */}

                    </Nav>
                  

                    <Navbar.Collapse className="justify-content-end">
                        <FaRegUserCircle color='white' />
                        {[false].map((expand) => (
                    <NavDropdown className='navbar-text '
                    title="Signed in "
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {/* <NavDropdown.Item href="#action3">Profile</NavDropdown.Item> */}
                    <NavDropdown.Item href="#action4" onClick={handleClick}>
                     Logout
                    </NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item> */}
                  </NavDropdown>
                    ))}
                        {/* <Navbar.Text> */}
                            {/* Sign In */}
                            {/* Signed In as: <a href="#login">Mark Otto</a> */}
                        {/* </Navbar.Text> */}
                    </Navbar.Collapse>

                {/* </Container> */}
            </Navbar>

         
        </div>
    )
}
