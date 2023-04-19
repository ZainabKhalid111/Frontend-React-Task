import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, Col, Form, Modal } from 'react-bootstrap';

import './CardItems.css';
import { convertToAbsoluteURL } from '../../utils/config';
import { CartContext } from '../../contexts/cartContex';

// this is the item object and function to delete item from database and function to update item in database
const CardItems = ({ item, handleDelete, handleUpdate }) => {
    const { addToCart } = useContext(CartContext); // getting addToCart function from cartContext to add item to cart
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    // updateItems State is used to update the item in backend in handleUpdateItem function
    const [updateItems, setUpdateItems] = useState(
        {
            id: item.id,
            name: item.name,
            price: item.price,
            img: item.img,
        },
    );
    useEffect(() => {
        setUpdateItems({
            id: item.id,
            name: item.name,
            price: item.price,
            img: item.img,
        });
    }, [item]); // this useEffect is used to update the updateItems state when item state is updated
    const handleAddToCart = () => {
        addToCart(item);
        alert('Item added to cart')

    }; // this is the function to add item to cart

    const handleUpdateButtonClick = () => {
        setShowUpdateModal(true);
    };

    const handleUpdateItem = async (e) => {
        e.preventDefault();

        const updatedItem = {
            name: e.target.name.value,
            price: e.target.price.value,
            img: e.target.img.value,
            id: item.id,
        };
        const isItemUpdated =
            updatedItem.name !== item.name ||
            updatedItem.price !== item.price ||
            updatedItem.img !== item.img;

        // isItemUpdated is used to check if the item is updated or not if not then we don't need to make api call to update the item
        if (isItemUpdated) {
            handleUpdate(item.id, updatedItem);
        }

        setShowUpdateModal(false);
    };


    return (
        <Col xs={12} sm={6} md={4} lg={3} className="my-3">
            <Card className="h-100 shadow">
                <Card.Img variant="top" src={convertToAbsoluteURL(item.img)} alt='loading...'/>
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                    <div className="mt-auto button-container">
                        <Button
                            variant="primary"
                            className="mb-2 custom-button"
                            onClick={handleAddToCart}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outline-primary"
                            className="mb-2 custom-button"
                            onClick={handleUpdateButtonClick} // this is the function to update item coming from props from parent component Items
                        >
                            Update
                        </Button>
                        <Button
                            variant="danger"
                            className="mb-2 custom-button"
                            onClick={() => handleDelete(item.id)} // this is the function to delete item coming from props from parent component Items
                        >
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateItem}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateItems.name}
                                name="name"
                                required
                                onChange={(e) =>
                                    setUpdateItems({
                                        ...updateItems,
                                        name: e.target.value,
                                    })}
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                step="0.01"
                                value={updateItems.price}
                                name="price"
                                required
                                onChange={(e) =>
                                    setUpdateItems({
                                        ...updateItems,
                                        price: e.target.value,
                                    })}
                            />
                        </Form.Group>
                        <Form.Group controlId="img">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateItems.img}
                                name="img"
                                required
                                onChange={(e) =>
                                    setUpdateItems({
                                        ...updateItems,
                                        img: e.target.value,
                                    })
                                }

                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
};

export default CardItems;
