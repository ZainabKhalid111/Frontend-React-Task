import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CartContext } from '../contexts/cartContex';
import { convertToAbsoluteURL } from '../utils/config';

const Checkout = ({ subtotal, tax, total }) => {
  const { cartItems, removeFromCart } = useContext(CartContext); // this is the cart context state and function to remove item from cart context state
  console.log(cartItems, 'cartItems');
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mb-3">
          {cartItems.map((item) => {
            const price = parseFloat(item.price);
            return (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col xs={4}>
                      <div className="card-img-wrapper" style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
                        <Card.Img
                          variant="top"
                          src={convertToAbsoluteURL(item.img)} // this is the image url converted to absolute url suitable for showing in browser
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="danger"
                          className="me-2"
                          onClick={() => removeFromCart(item.id)} // this is the function to remove item from cart context state
                        >
                          Remove
                        </Button>
                        <span>${price.toFixed(2)}</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Header>Order Summary</Card.Header>
            <Card.Body>
              <div>
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
              <Button variant="success" className="w-100">
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
// this is the checkout page component which is used to show the cart items and order summary
const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  const tax = subtotal * 0.1; // 10% tax rate for example
  const total = subtotal + tax;

  // this is the checkout component which is used to show the cart items and order summary
  return <Checkout subtotal={subtotal} tax={tax} total={total} />;
};

export default CheckoutPage;
