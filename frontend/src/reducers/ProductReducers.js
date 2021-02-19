import { PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_FAIL,
         PRODUCT_DETAIL_FAIL,
         PRODUCT_DETAIL_SUCCESS,
         PRODUCT_DETAIL_REQUEST } from '../constants/ProductConstants';

export const product_list_reducer = (state = {products:[]}, action) => {
        switch(action.type) {
                case PRODUCT_LIST_REQUEST:
                        return {...state, loading:true}
                
                case PRODUCT_LIST_SUCCESS:
                        return {loading:false, products:action.payload}
                
                case PRODUCT_LIST_FAIL:
                        return {loading:false, error: action.payload}

                default:
                        return state
        }

}


export const product_detail_reducer = (state = { product: {reviews:[]}}, action) => {
        switch(action.type) {
                case PRODUCT_DETAIL_REQUEST:
                        return {...state, loading:true}
                
                case PRODUCT_DETAIL_SUCCESS:
                        return {loading:false, product:action.payload}
                
                case PRODUCT_DETAIL_FAIL:
                        return {loading:false, error: action.payload}

                default:
                        return state
        }

}

