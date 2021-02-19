import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/UserActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({location, history}) => {
        const [email, set_email] = useState('');
        const [password, set_password] = useState('');
        const [confirm_password, set_confirm_password] = useState('');
        const [password_status_msg, set_password_status_msg] = useState('');
        const [name, set_name] = useState('');
        const dispatch = useDispatch();
        const redirect = location.search ? location.search.split('=')[1] : '/';

        const user_login = useSelector(state => state.user_login);
        const user_register = useSelector(state => state.user_register);

        useEffect(() => {
                if (user_login.user_info) {
                        history.push(redirect);
                }
        },[history, user_login.user_info, redirect]);


        const submit_handler = e  => {
                e.preventDefault();
                if (password !== confirm_password) {
                        set_password_status_msg("Passwords do not match");
                } else {
                        dispatch(register(email, password, name));
                }
              
        }
        return (
                <FormContainer>
                <h1>Sign In</h1>
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
                                        <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={e => set_password(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password_confirm'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required type='password' placeholder='Confirm Password' value={confirm_password} onChange={e => set_confirm_password(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary'>Register</Button>


                        <Row className="py-3">
                                        <Col>
                                                Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
                                        </Col>
                        </Row>
                        </Form>
                </FormContainer>
        )
}

export default RegisterScreen
