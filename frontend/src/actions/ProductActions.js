import { PRODUCT_LIST_FAIL, 
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_REQUEST, 
        PRODUCT_DETAIL_FAIL, 
        PRODUCT_DETAIL_SUCCESS, 
        PRODUCT_DETAIL_REQUEST } from '../constants/ProductConstants';
import axios from 'axios';

export const list_products_action = () => async (dispatch) => {
        dispatch({
                type: PRODUCT_LIST_REQUEST
        });

        axios.get('/api/products/').then(resp=>{
		dispatch({
                        type: PRODUCT_LIST_SUCCESS,
                        payload: resp.data
                });
	}).catch(err=>{
                dispatch({
                        type: PRODUCT_LIST_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });

        /* 
                const resp = await axios.get('/api/products/');
                const data = await resp.data;
        */
       
}

export const list_product_detail = id  => async (dispatch) => {
        dispatch({
                type: PRODUCT_DETAIL_REQUEST
        });

        axios.get(`/api/products/${id}/`).then(resp=>{
		dispatch({
                        type: PRODUCT_DETAIL_SUCCESS,
                        payload: resp.data
                });
	}).catch(err=>{
                dispatch({
                        type: PRODUCT_DETAIL_FAIL,
                        payload: err.response && err.response.data.detail ? err.response.data.detail : err.message 
                });
        });

   
       
}