import {useState, useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { list_users } from '../actions/UserActions';

import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const UserListScreen = ({ history }) => {

        const dispatch = useDispatch();

        const users_list = useSelector(state => state.users_list);
        const {loading, error ,users} = users_list;

        const user_info = useSelector(state => state.user_login.user_info);

        useEffect(() => {
                if (user_info && user_info.is_admin) {
                        dispatch(list_users());
                } else {
                        history.push('/login');
                }
               
        },[dispatch]);

        const user_delete_handler = id => {

        }
        return (
                <div>
                        <h1>Users</h1>
                        {loading ? (
                                <LoadingSpinner />
                        ) : error ? (
                                <Message variant='danger'>{error}</Message>
                        ) : (
                                <Table striped bordered hover responsive className='table-sm'>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Is Admin</th>
                                                        <th>Actions</th>  
                                                </tr>
                                                
                                        </thead>

                                        <tbody>
                                                {users.map(user => (
                                                        <tr key={users._id}>
                                                                <td>{user._id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.is_admin ? (<i className='fas fa-check' style={{color:'green'}}></i>) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                                                <td>
                                                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                                                                <Button variant='light' className='btn-sm'>
                                                                                        <i className='fas fa-edit'></i>
                                                                                </Button>
                                                                        </LinkContainer>

                                                                        <Button variant='danger' className='btn-sm' onClick={() => user_delete_handler(user._id)}>
                                                                                        <i className='fas fa-trash'></i>
                                                                                </Button>
                                                                </td>
                                                        </tr>
                                                ))}
                                        </tbody>
                                </Table>
                        )}
                </div>
        );

}

export default UserListScreen;