import { USER_LOGIN_FAIL, 
        USER_LOGIN_SUCCESS, 
        USER_LOGIN_REQUEST, 
        USER_LOGOUT, 

        USER_REGISTER_FAIL,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_REQUEST,

        USER_DETAIL_FAIL,
        USER_DETAIL_REQUEST,
        USER_DETAIL_SUCCESS,

        USER_DETAIL_UPDATE_FAIL,
        USER_DETAIL_UPDATE_SUCCESS,
        USER_DETAIL_UPDATE_REQUEST,
        USER_DETAIL_UPDATE_RESET,
        USER_DETAILS_RESET,

        USER_LIST_FAIL,
        USER_LIST_SUCCESS,
        USER_LIST_REQUEST,
        USER_LIST_RESET,

        USER_DELETE_FAIL,
        USER_DELETE_SUCCESS,
        USER_DELETE_REQUEST} from '../constants/UserConstants';

import { USER_ORDERS_RESET } from '../constants/OrderConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
        dispatch({
                type: USER_LOGIN_REQUEST
        });

        const config = {
                headers: {
                        'Content-type': 'application/json'
                }
        }

        axios.post('/api/users/login/', {'username': email, 'password': password}, config)
        .then(resp=>{
                dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: resp.data
                });

                localStorage.setItem('user_info', JSON.stringify(resp.data));
        }).catch(err=>{
                dispatch({
                        type: USER_LOGIN_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}


export const logout = () => (dispatch) => {
        localStorage.removeItem('user_info');
        dispatch({
                type: USER_LOGOUT
        });

        dispatch({
                type: USER_DETAILS_RESET
        });

        dispatch({
                type: USER_ORDERS_RESET
        });

        dispatch({
                type: USER_LIST_RESET
        });
}

export const register  = (email, password, name) => async (dispatch) => {
        dispatch({
                type: USER_REGISTER_REQUEST
        });

        const config = {
                headers: {
                        'Content-type': 'application/json'
                }
        }

        axios.post('/api/users/register/', {'name':name, 'email': email, 'password': password}, config)
        .then(resp=>{
                dispatch({
                        type: USER_REGISTER_SUCCESS,
                        payload: resp.data
                });

                dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: resp.data
                });

                localStorage.setItem('user_info', JSON.stringify(resp.data));
        }).catch(err=>{
                dispatch({
                        type: USER_REGISTER_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}

export const get_user_details  = id => async (dispatch, getState) => {
        dispatch({
                type: USER_DETAIL_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.get(`/api/users/profile/`, config)
        .then(resp=>{
                dispatch({
                        type: USER_DETAIL_SUCCESS,
                        payload: resp.data
                });

        }).catch(err=>{
                dispatch({
                        type: USER_DETAIL_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}

export const update_user_details  = user => async (dispatch, getState) => {
        dispatch({
                type: USER_DETAIL_UPDATE_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.put(`/api/users/profile/update/`, user, config)
        .then(resp=>{
                dispatch({
                        type: USER_DETAIL_UPDATE_SUCCESS,
                        payload: resp.data
                });

                dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: resp.data
                });

                localStorage.setItem('user_info', JSON.stringify(resp.data));

        }).catch(err=>{
                dispatch({
                        type: USER_DETAIL_UPDATE_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}

export const list_users  = () => async (dispatch, getState) => {
        dispatch({
                type: USER_LIST_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.get(`/api/users/`, config)
        .then(resp=>{
                dispatch({
                        type: USER_LIST_SUCCESS,
                        payload: resp.data
                });

        }).catch(err=>{
                dispatch({
                        type: USER_LIST_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}

export const delete_user  = id => async (dispatch, getState) => {
        dispatch({
                type: USER_DELETE_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.delete(`/api/users/delete/${id}/`, config)
        .then(resp=>{
                dispatch({
                        type: USER_DELETE_SUCCESS,
                        payload: resp.data
                });

        }).catch(err=>{
                dispatch({
                        type: USER_DELETE_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}
