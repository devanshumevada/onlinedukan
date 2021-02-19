import axios from 'axios';
import { CART_ADD_ITEM, 
	CART_REMOVE_ITEM, 
	CART_SAVE_PAYMENT_METHOD, 
	CART_SAVE_SHIPPING_ADDRESS } from '../constants/CartConstants';


export const add_to_cart = (id, qty) => async (dispatch, getState) => {
	axios.get(`/api/products/${id}/`).then(resp => {
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: resp.data._id,
				name: resp.data.name,
				image: resp.data.image,
				price: resp.data.price,
				countInStock: resp.data.countInStock,
				qty
			}
		});

		localStorage.setItem('cart_items',JSON.stringify(getState().cart.cart_items));
	});
}

export const remove_from_cart = id => (dispatch, getState) => {
	dispatch({
		type:CART_REMOVE_ITEM,
		payload: id
	});

	localStorage.setItem('cart_items',JSON.stringify(getState().cart.cart_items));
}

export const save_shipping_address = shipping_data => (dispatch) => {
	dispatch({
		type:CART_SAVE_SHIPPING_ADDRESS,
		payload: shipping_data
	});

	localStorage.setItem('shipping_address',JSON.stringify(shipping_data));
}

export const save_payment_method = payment_method => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: payment_method
	});

	localStorage.setItem('payment_method',JSON.stringify(payment_method));
}