import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { BsFillCartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/cartContex';

const NavbarComponent = () => {
    const { cartItems } = useContext(CartContext); // getting cartItems from cartContext to show number of cart items
    return (
        <>
            <Navbar bg="primary" expand="lg" variant="dark" >
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className='fw-bolder'>RandomStore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className=" ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px', margin: '0px 100px', }}
                        >
                            <Nav.Link as={Link} to="/add-item" className='nav-link '>Add Item</Nav.Link>
                            <Nav.Link as={Link} to="/items" className='nav-link '>Items</Nav.Link>
                            <Nav.Link as={Link} to="/checkout" className='nav-link'>Check Out</Nav.Link>
                        </Nav>
                        <Nav className='ms-auto'>
                            <Nav.Link as={Link} to="/checkout">
                                <BsFillCartFill />
                                <Badge bg="secondary" pill className="ms-1">
                                    {/* get cartitem form cartContext and show number of cart item using lenth funciton */}
                                    {cartItems.length}
                                </Badge>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent
