import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

import { create_order } from '../actions/OrderActions';

import { ORDER_CREATE_RESET } from '../constants/OrderConstants';

const PlaceOrderScreen = ({ history }) => {
        const order_create = useSelector(state => state.order_create);
        const {order, error, success} = order_create;
        const dispatch = useDispatch();
        const cart = useSelector(state => state.cart);

        cart.items_price = cart.cart_items.reduce((acc,item) => acc + item.qty * item.price,0);
        cart.shipping_price = (cart.items_price > 500 ? 0 : 50).toFixed(2);
        cart.tax_price = (0.12  * cart.items_price).toFixed(2);
        cart.total_price = (Number(cart.items_price) + Number(cart.shipping_price) + Number(cart.tax_price)).toFixed(2);

        const user_login = useSelector(state => state.user_login);

        if (!cart.payment_method) {
                history.push('/payment')
        }

        useEffect(() => {
                if (success) {
                        history.push(`/order/${order._id}`);
                        dispatch({
                                type: ORDER_CREATE_RESET
                        });
                }
        },[success, history]);
        
        const place_order = e => {
                dispatch(create_order(
                        {
                                order_items: cart.cart_items,
                                shipping_address: cart.shipping_address,
                                payment_method: cart.payment_method,
                                items_price: cart.items_price,
                                shipping_price: cart.shipping_price,
                                tax_price: cart.tax_price,
                                total_price: cart.total_price
                        }
                ));
        }
        return (
                <div>
                        { user_login.user_info ? (
                                <>
                                <CheckoutSteps step1 step2 step3 step4 /> 
                                <Row>
                                        <Col md={8}>
                                                <ListGroup variant='flush'>
                                                        <ListGroup.Item>
                                                                <h2>Shipping</h2>
                                                                <p>
                                                                        <strong>Shipping:</strong>
                                                                        {cart.shipping_address.address}, {cart.shipping_address.city} 
                                                                        {' '}
                                                                        {cart.shipping_address.pin_code}, {cart.shipping_address.state}
                                                                </p>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <h2>Payment Method</h2>
                                                                <p>
                                                                        <strong>Method:</strong>
                                                                        {cart.payment_method}
                                                                        
                                                                </p>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                {
                                                                        cart.cart_items.length === 0 ? (
                                                                                <Message variant='info'>Your cart is empty</Message>
                                                                        ) : (
                                                                                <ListGroup variant='flush'>
                                                                                        <h2>Order Items</h2>
                                                                                        {cart.cart_items.map((item, index) => {
                                                                                                return (
                                                                                                        <ListGroup.Item key={index}>
                                                                                                                <Row>
                                                                                                                        <Col md={1}>
                                                                                                                                <Image src={item.image} alt={item.name} fluid  rounded />
                                                                                                                        </Col>
                                                                                                                        <Col>
                                                                                                                                <Link to={`/product/${item.product}`}>
                                                                                                                                        {item.name}
                                                                                                                                </Link>
                                                                                                                        </Col>
                                                                                                                        <Col md={4}>
                                                                                                                                {item.qty} * &#8377;{item.price} = &#8377;{item.qty*item.price}
                                                                                                                        </Col>
                                                                                                                </Row>
                                                                                                        </ListGroup.Item>
                                                                                                )
                                                                                        })}
                                                                                </ListGroup>
                                                                        )
                                                                
                                                                }
                                                        </ListGroup.Item>
                                                </ListGroup>
                                        </Col>
                                        <Col md={4}>
                                                <ListGroup variant='flush'>
                                                        <ListGroup.Item>
                                                                <h2>Order Summary</h2>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Item:</Col>
                                                                        <Col>&#8377;{cart.items_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Shipping:</Col>
                                                                        <Col>&#8377;{cart.shipping_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Tax:</Col>
                                                                        <Col>&#8377;{cart.tax_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Total:</Col>
                                                                        <Col>&#8377;{cart.total_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                {error && <Message variant='danger'>{error}</Message>}
                                                        </ListGroup.Item>


                                                        <ListGroup.Item>
                                                                <Button type='button' className='btn-block' disabled={cart.cart_items.length === 0} onClick={place_order}>
                                                                        Place Order
                                                                </Button>
                                                        </ListGroup.Item>
                                                </ListGroup>
                                        </Col>
                                </Row>  
                                </>
                        ) : (
                                <div style={{display: 'flex', justifyContent:'center'}}><Message variant="danger">Please Log In to view this section</Message></div>
                        )}
                                   
                </div>
        )
}

export default PlaceOrderScreen
