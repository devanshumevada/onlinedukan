import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, Row, Col, Table, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

import { get_user_details, update_user_details } from '../actions/UserActions';
import { USER_DETAIL_UPDATE_RESET } from '../constants/UserConstants';
import { get_user_orders } from '../actions/OrderActions';

const ProfileScreen = ({history}) => {
        const [email, set_email] = useState('');
        const [password, set_password] = useState('');
        const [confirm_password, set_confirm_password] = useState('');
        const [password_status_msg, set_password_status_msg] = useState('');
        const [name, set_name] = useState('');
        const orders_per_page = useState(5);
        const [page_number, set_page_number] = useState(1);

        const dispatch = useDispatch();

       

        const user_login = useSelector(state => state.user_login);
        const user_details = useSelector(state => state.user_details);
        const user_details_update = useSelector(state => state.user_details_update);
        const user_orders = useSelector(state => state.user_orders);

        //pagination calculations
        const last_order_index = parseInt(orders_per_page) * parseInt(page_number);
        const first_order_index = parseInt(last_order_index) - parseInt(orders_per_page);
        const pagination_nav_numbers = [];
        if (user_orders.orders) {
                for (let i=1; i<=Math.ceil(parseInt(user_orders.orders.length) / parseInt(orders_per_page)); i++) {
                        pagination_nav_numbers.push(i);
                }
        }

        // end of pagination calculations

        useEffect(() => {
                if (!user_login.user_info) {
                        history.push('/login');
                } else {
                        if (!user_details.user || !user_details.user.name || user_details_update.success) {
                                dispatch({type:USER_DETAIL_UPDATE_RESET});
                                dispatch(get_user_details('profile'));
                                dispatch(get_user_orders());
                        } else {
                                set_email(user_details.user.email);
                                set_name(user_details.user.name);
                        }
                }
        },[history, user_login.user_info, user_details.user, user_details_update.success]);


        const submit_handler = e  => {
                e.preventDefault();
                if (password !== confirm_password) {
                        set_password_status_msg("Passwords do not match");
                } else {
                        dispatch(update_user_details({
                                '_id': user_details.user._id,
                                'name': name,
                                'email': email,
                                'password': password
                        }));
                        set_confirm_password("");
                        set_password("");
                        
                }
              
        }
        return (
                <Row>
                        <Col md={3}>
                                <h2>User Profile</h2>
                                {password_status_msg && <Message variant='danger'>{password_status_msg}</Message>}
                                {user_login.loading && <LoadingSpinner />}
                       
                                        <Form onSubmit={submit_handler}>
                                                <Form.Group controlId='name'>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control required type='text' placeholder='Enter Name' value={name} onChange={e => set_name(e.target.value)}></Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='email'>
                                                        <Form.Label>Email Address</Form.Label>
                                                        <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={e => set_email(e.target.value)}></Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='password'>
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => set_password(e.target.value)}></Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='password_confirm'>
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control type='password' placeholder='Confirm Password' value={confirm_password} onChange={e => set_confirm_password(e.target.value)}></Form.Control>
                                                </Form.Group>

                                                <Button type='submit' variant='primary'>Update</Button>

                                        </Form>
                                        </Col>

                        <Col md={9}>
                                <h2>My Orders</h2>
                                
                               
                                {user_orders.loading ? (
                                        <LoadingSpinner />
                                ) : user_orders.error ? (
                                        <Message variant='danger'>{user_orders.error}</Message>
                                ) : (
                                        <>
                                        <Table striped responsive className='table-sm'> 
                                                <thead>
                                                        <tr>
                                                                <th>ID</th>
                                                                <th>Date</th>
                                                                <th>Price</th>
                                                                <th>Paid</th>
                                                                <th>Delivered</th>
                                                        </tr>
                                                </thead>

                                                <tbody>
                                                        {user_orders.orders.slice(0).reverse().slice(first_order_index, last_order_index).map(order => (
                                                                <tr key={order._id}>
                                                                        <td>{order._id}</td>
                                                                        <td>{order.createdAt.substring(0,10)}</td>
                                                                        <td>&#8377;{order.total_price}</td>
                                                                        <td>{order.is_paid ? order.paid_at.substring(0,10) : (
                                                                                <i className='fas fa-times' style={{color:'red'}}></i>
                                                                        )}</td>

                                                                        <td>
                                                                                <LinkContainer to={`/order/${order._id}/`}>
                                                                                        <Button className='btn btn-sm'>Details</Button>
                                                                                </LinkContainer>
                                                                        </td>

                                                                </tr>
                                                        ))}
                                                </tbody>
                                                
                                        </Table>

                                        <Pagination size='lg' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                                                <Pagination.First onClick={() => set_page_number(1)} />
                                                <Pagination.Prev onClick={() => {
                                                        const page_number_to_set = page_number - 1;
                                                        if (page_number_to_set < 1) {
                                                                set_page_number(pagination_nav_numbers[pagination_nav_numbers.length - 1]);
                                                        } else {
                                                                set_page_number(page_number_to_set);
                                                        }
                                                }} />
                                                {pagination_nav_numbers.map(number => (
                                                         
                                                         <Pagination.Item active={number === page_number} key={number}  onClick={() => set_page_number(number)}>
                                                                {number}
                                                        </Pagination.Item>
                                                ))}
                                                <Pagination.Next onClick={() => {
                                                        const page_number_to_set = page_number + 1;
                                                        if (page_number_to_set > pagination_nav_numbers.length) {
                                                                set_page_number(1);
                                                        } else {
                                                                set_page_number(page_number_to_set);
                                                        }
                                                }} />
                                                <Pagination.Last onClick={() => set_page_number(pagination_nav_numbers[pagination_nav_numbers.length - 1])} />
                                                        
                                                

                                                
                                        </Pagination>

                                        
                                      
                                       
                                        </>
                                       
                                      
                                       
                                )}
                        </Col>
                </Row>
        );
}

export default  ProfileScreen;