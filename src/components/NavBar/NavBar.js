import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png'

export default function NavBar() {
  return (
    <div>
        <Navbar  className='navbar navbar-custom'>
                <Container>
                    <Navbar.Brand className='navbar-text'>
                    <img src={logo} alt="" className='img-center'/> Note Collector
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className='navbar-text nav-link' to={"/"}>Home</Link>
                        <Link className='navbar-text nav-link' to={"/add"}>Add Notes</Link>
                       
                    </Nav>

                    
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {/* Sign In */}
                            Signed In as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </div>
  )
}
