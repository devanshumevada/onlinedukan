import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

import { ORDER_PAYMENT_RESET } from '../constants/OrderConstants';

import { get_order, order_payment } from '../actions/OrderActions';

import axios from 'axios';



const OrderScreen = ({ match , history}) => {
        const order_id = match.params.id;
        const dispatch = useDispatch();

        const [razorpay_sdk_ready, set_razorpay_sdk_ready] = useState(false);

        const order_details = useSelector(state => state.order_details);
        const {order, error, loading} = order_details;

        const order_payment_state = useSelector(state => state.order_payment);
        const user_info = useSelector(state => state.user_login.user_info);
        const { loading: loading_payment, success: success_payment} = order_payment_state;
       
        if (!loading && !error) {
                order.items_price = order.order_items.reduce((acc,item) => acc + item.qty * item.price,0);
        }

        const user_login = useSelector(state => state.user_login);


        const add_razorpay_script = () => {
               
                const ele = document.createElement('script');
                ele.src = 'https://checkout.razorpay.com/v1/checkout.js';
                ele.id = 'razorpay_src';
                ele.async = true;
                ele.onload = () => {
                        set_razorpay_sdk_ready(true);
                }
        
                document.body.appendChild(ele);
              
        }

        


        useEffect(() => {
                if (!order || success_payment || order._id !== parseInt(order_id)) {
                        dispatch({ type: ORDER_PAYMENT_RESET });
                        dispatch(get_order(order_id));
                } else if (!order.is_paid) {
                                
                                if (order.payment_method === 'Online Payment') {
                                        if ( !window.Razorpay) {
                                                add_razorpay_script();
                                               
                                        } else {
                                                set_razorpay_sdk_ready(true);
                                                
                                        }
                                }
                       
                               
                        
                        
                }
        },[order ,order_id, dispatch, success_payment]);


      

        const make_payment_from_razorpay = async () => {
                const config = {
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${user_info.token}`
                        }
                       
                };

                const data = {amount: order.total_price, order_id: order._id};


                const razorpay_order_data = await axios.post('http://127.0.0.1:8000/api/orders/razorpay_order/', data, config).
                        then(resp => resp.data);
                console.log(razorpay_order_data);
               
                const options = {
                        key: process.env.REACT_APP_RAZORPAY_KEY,
                        name: "Test",
                        description: "Test Transaction",
                        order_id: razorpay_order_data.details.id,
                        currency:razorpay_order_data.details.currency,
                        handler: function (response){
                                dispatch(order_payment(order_id, response.razorpay_payment_id));
                                alert(response.razorpay_payment_id);
                                alert(response.razorpay_order_id);
                                alert(response.razorpay_signature)
                        },
                        theme: {
                                color: "#3399cc"
                        },
                        
                }

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();

                paymentObject.on('payment.failed', function (response){
                        alert(response.error.code);
                        alert(response.error.description);
                        alert(response.error.source);
                        alert(response.error.step);
                        alert(response.error.reason);
                        alert(response.error.metadata.order_id);
                        alert(response.error.metadata.payment_id);
                });
        }
        
       
        return (
                loading ? (
                        <LoadingSpinner />
                ) : error ? (
                        <Message variant='danger'>{error}</Message>
                ) : (
                        <div>
                        { user_login.user_info ? (
                                <>
                                <h1> Order: {order_id}</h1>
                                <Row>
                                        <Col md={8}>
                                                <ListGroup variant='flush'>
                                                        <ListGroup.Item>
                                                                <h2>Shipping</h2>
                                                                <p>
                                                                        <p><strong>Name: </strong> {order.user.name}</p>
                                                                        <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                                                        <strong>Shipping Address:</strong>
                                                                        {order.shipping_address.address}, {order.shipping_address.city} 
                                                                        {' '}
                                                                        {order.shipping_address.pin_code}, {order.shipping_address.state}
                                                                </p>
                                                                {order.is_delivered? (
                                                                        <Message variant='success'>Paid on: {order.delivered_at}</Message>
                                                                ) : (
                                                                        <Message variant='warning'>Not Delivered</Message>
                                                                )}
                                                </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <h2>Payment Method</h2>
                                                                <p>
                                                                        <strong>Method:</strong>
                                                                        {order.payment_method}
                                                                        
                                                                </p>
                                                                {order.is_paid ? (
                                                                        <Message variant='success'>Paid on: {order.paid_at}</Message>
                                                                ) : (
                                                                        <Message variant='warning'>Not Paid</Message>
                                                                )}
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                {
                                                                        order.order_items.length === 0 ? (
                                                                                <Message variant='info'>Your Order is empty</Message>
                                                                        ) : (
                                                                                <ListGroup variant='flush'>
                                                                                        <h2>Order Items</h2>
                                                                                        {order.order_items.map((item, index) => {
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
                                                                                                                                {item.qty} * &#8377;{item.price} = &#8377;{(item.qty*item.price).toFixed(2
                                                                                                                                )}
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
                                                                        <Col>&#8377;{order.items_price.toFixed(2)}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Shipping:</Col>
                                                                        <Col>&#8377;{order.shipping_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Tax:</Col>
                                                                        <Col>&#8377;{order.tax_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                                <Row>
                                                                        <Col>Total:</Col>
                                                                        <Col>&#8377;{order.total_price}</Col>
                                                                </Row>
                                                        </ListGroup.Item>

                                                        {!order.is_paid && (
                                                                <ListGroup.Item>
                                                                        {loading_payment && <LoadingSpinner />}
                                                                        {!razorpay_sdk_ready ? (
                                                                                <LoadingSpinner />
                                                                        ) : (
                                                                               
                                                                                
                                                                                <Button variant='primary' className='btn-block' onClick={make_payment_from_razorpay}>Pay With Razorpay</Button>
                                                                        
                                                                                
                                                                              
                                                                        )}
                                                                        <br />

                                                                       
                                                                </ListGroup.Item>
                                                        )}



                                                        
                                                </ListGroup>
                                        </Col>
                                </Row>  
                                </>
                        ) : (
                                <div style={{display: 'flex', justifyContent:'center'}}><Message variant="danger">Please Log In to view this section</Message></div>
                        )}
                                   
                </div>
                )
               
        )
}

export default OrderScreen;
