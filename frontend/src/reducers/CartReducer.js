import { CART_ADD_ITEM, 
        CART_REMOVE_ITEM, 
        CART_SAVE_PAYMENT_METHOD, 
        CART_SAVE_SHIPPING_ADDRESS,
        CART_CLEAR_ITEMS } from '../constants/CartConstants';

const initial_state = { cart_items:[], shipping_address: {} }
export const cart_reducer = (state = initial_state, action) => {
        switch(action.type) {

                case CART_ADD_ITEM:
                        const item = action.payload
                        const item_exists = state.cart_items.find(i => i.product === item.product)

                        if (item_exists) {
                                return {
                                        ...state,
                                        cart_items: state.cart_items.map(i => {
                                                return i.product === item_exists.product ? item : i
                                        })
                                }
                        } else {
                                return {
                                        ...state,
                                        cart_items: [...state.cart_items, item]
                                }
                        }

                case CART_REMOVE_ITEM:
                        return {
                                ...state,
                                cart_items: state.cart_items.filter(i => {
                                        return i.product !== action.payload
                                })
                        }

                case CART_SAVE_SHIPPING_ADDRESS:
                        return {
                                ...state,
                                shipping_address: action.payload
                        }

                case CART_SAVE_PAYMENT_METHOD:
                        return {
                                ...state,
                                payment_method: action.payload
                        }

                case CART_CLEAR_ITEMS:
                        return {
                                ...state,
                                cart_items: []
                        }

                default:
                        return state
        }
}

