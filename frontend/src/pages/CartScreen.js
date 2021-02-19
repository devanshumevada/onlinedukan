import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { add_to_cart, remove_from_cart } from '../actions/CartActions';

const CartScreen = ({match, location, history}) => {
        const dispatch = useDispatch();
        const cart = useSelector(state => state.cart);
        const user_login = useSelector(state => state.user_login);


        const remove_item_from_cart = id => {
                dispatch(remove_from_cart(id));
        }

        const handle_checkout = () => {
                history.push('/login?redirect=shipping');
        }

        return (
                <Row>
                        { user_login.user_info ? 
                        <>
                        <Col md={8}>
                               
                             
                                <h1>Shopping Cart</h1>
                                {cart.cart_items.length === 0 ? 
                                ( <Message variant='info'>
                                There are no products in your cart. <Link to="/">Go Back</Link>
                                </Message>) : 
                                (<ListGroup variant='flush'>
                                        {cart.cart_items.map(item => {
                                                return (
                                                        <ListGroup.Item key={item.product}>
                                                                <Row>
                                                                        <Col md={2}>
                                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                                        </Col>

                                                                        <Col md={3}>
                                                                                <Link to={`/product/${item.product}/`}>{item.name}</Link>
                                                                        </Col>
                                                                        <Col md={2}>
                                                                                {item.price}
                                                                        </Col>

                                                                        <Col md={3}>
                                                                                <Form.Control as="select" value={item.qty} onChange={e => dispatch(add_to_cart(item.product, parseInt(e.target.value)))}>
                                                                                                        {
                                                                                                                [...Array(item.countInStock).keys()].map(i=>{
                                                                                                                        return <option key={i} value={i+1}>{i+1}</option>
                                                                                                                })
                                                                                                        }
                                                                                </Form.Control>
                                                                        </Col>

                                                                        <Col md={1}>
                                                                                <Button type='button' variant='light' onClick={() => remove_item_from_cart(item.product)}>
                                                                                        <i className='fas fa-trash'></i>
                                                                                </Button>
                                                                        </Col>
                                                                </Row>
                                                        </ListGroup.Item>
                                                );
                                        })}
                                </ListGroup>)
                                }
                        </Col>

                        <Col md={4}>
                                <Card>
                                        <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                        <h2>Subtotal of ({cart.cart_items.reduce((accumulator, item) => accumulator + item.qty, 0)}) Items</h2>
                                                        &#8377;{cart.cart_items.reduce((accumulator,item) =>accumulator + item.price*item.qty ,0).toFixed(2)}
                                                </ListGroup.Item>
                                        </ListGroup>
                                </Card>

                                <ListGroup.Item>
                                        <Button type='button' className='btn-block' disabled={cart.cart_items.length === 0} onClick={handle_checkout}>Proceed To Checkout</Button>
                                </ListGroup.Item>
                        </Col>
                        </>
                        : <Col><div style={{display: 'flex', justifyContent:'center'}}><Message variant="danger">Please Log In to view the cart</Message></div></Col>
                        } 
                        
                </Row>
        )
}

export default CartScreen;
