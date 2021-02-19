import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/UserActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({location, history}) => {
        const [email, set_email] = useState('');
        const [password, set_password] = useState('');
        const dispatch = useDispatch();
        const redirect = location.search ? location.search.split('=')[1] : '/';

        const user_login = useSelector(state => state.user_login);

        useEffect(() => {
                if (user_login.user_info) {
                        history.push(redirect);
                }
        },[history, user_login.user_info, redirect]);


        const submit_handler = e  => {
                e.preventDefault();
                dispatch(login(email, password));
        }
        return (
               <FormContainer>
                       <h1>Sign In</h1>
                       {user_login.error && <Message variant='danger'>{user_login.error}</Message>}
                       {user_login.loading && <LoadingSpinner />}
                              
                                <Form onSubmit={submit_handler}>
                                        <Form.Group controlId='email'>
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e => set_email(e.target.value)}></Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId='password'>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => set_password(e.target.value)}></Form.Control>
                                        </Form.Group>

                                        <Button type='submit' variant='primary'>Sign In</Button>
                                        
                        </Form>

                        <Row className="py-3">
                                        <Col>
                                                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                                        </Col>
                        </Row> 
               </FormContainer>
        );

}

export default LoginScreen;