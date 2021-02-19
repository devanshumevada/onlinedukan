import {
        ORDER_CREATE_FAIL,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_REQUEST,

        ORDER_DETAILS_FAIL,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_REQUEST,

        ORDER_PAYMENT_FAIL,
        ORDER_PAYMENT_SUCCESS,

        USER_ORDERS_FAIL,
        USER_ORDERS_REQUEST,
        USER_ORDERS_SUCCESS,
        USER_ORDERS_RESET
        
} from '../constants/OrderConstants';

import { CART_CLEAR_ITEMS } from '../constants/CartConstants';
import axios from 'axios';


export const create_order  = order => async (dispatch, getState) => {
        dispatch({
                type: ORDER_CREATE_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.post(`/api/orders/add/`, order, config)
        .then(resp=>{
                dispatch({
                        type: ORDER_CREATE_SUCCESS,
                        payload: resp.data
                });

                dispatch({
                        type: CART_CLEAR_ITEMS,
                        payload: resp.data
                });

                localStorage.removeItem('cart_items');

        }).catch(err=>{
                dispatch({
                        type: ORDER_CREATE_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}


export const get_order  = id => async (dispatch, getState) => {
        dispatch({
                type: ORDER_DETAILS_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.get(`/api/orders/${id}/`, config)
        .then(resp=>{
                dispatch({
                        type: ORDER_DETAILS_SUCCESS,
                        payload: resp.data
                });

              

        }).catch(err=>{
                dispatch({
                        type: ORDER_DETAILS_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}

export const order_payment  = (id, razorpay_payment_id) => async (dispatch, getState) => {
        dispatch({
                type: ORDER_DETAILS_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.put(`/api/orders/${id}/pay/`, razorpay_payment_id, config)
        .then(resp=>{
                dispatch({
                        type: ORDER_PAYMENT_SUCCESS,
                        payload: resp.data
                });

              

        }).catch(err=>{
                dispatch({
                        type: ORDER_PAYMENT_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}

export const get_user_orders  = () => async (dispatch, getState) => {
        dispatch({
                type: USER_ORDERS_REQUEST
        });

        const state = getState();

        const config = {
                headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${state.user_login.user_info.token}`
                }
        }

        axios.get(`/api/orders/my_orders/`, config)
        .then(resp=>{
                dispatch({
                        type: USER_ORDERS_SUCCESS,
                        payload: resp.data
                });

              

        }).catch(err=>{
                dispatch({
                        type: USER_ORDERS_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });
}