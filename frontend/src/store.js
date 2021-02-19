import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { product_list_reducer } from './reducers/ProductReducers';
import { product_detail_reducer } from './reducers/ProductReducers';
import { cart_reducer } from './reducers/CartReducer';
import { user_login_reducer, 
	user_register_reducer, 
	user_details_reducer, 
	user_details_update_reducer,
	users_list_reducer,
	user_delete_reducer } from './reducers/UserReducer'; 
import { order_create_reducer,
	order_details_reducer,
	order_payment_reducer,
	user_orders_reducer } from './reducers/OrderReducers';

const reducer = combineReducers({
	product_list: product_list_reducer,
	product_detail: product_detail_reducer,
	cart: cart_reducer,
	user_login: user_login_reducer,
	user_register: user_register_reducer,
	user_details: user_details_reducer,
	user_details_update: user_details_update_reducer,
	order_create: order_create_reducer,
	order_details: order_details_reducer,
	order_payment: order_payment_reducer,
	user_orders: user_orders_reducer,
	users_list: users_list_reducer,
	user_delete: user_delete_reducer
});

const cart_items_from_storage = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : [];
const user_info_from_storage = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : null;
const get_shipping_info_from_storage = localStorage.getItem('shipping_address') ? JSON.stringify(localStorage.getItem('shipping_address')) : {};

const initial_state = {
	cart: {cart_items: cart_items_from_storage, shipping_address: get_shipping_info_from_storage},
	user_login: {user_info: user_info_from_storage}
};
const middleware = [thunk];
const store = createStore(reducer,initial_state, composeWithDevTools(applyMiddleware(...middleware)));

export default store;