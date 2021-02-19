import {
        ORDER_CREATE_FAIL,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_REQUEST,
        ORDER_CREATE_RESET,

        ORDER_DETAILS_FAIL,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_REQUEST,

        ORDER_PAYMENT_FAIL,
        ORDER_PAYMENT_SUCCESS,
        ORDER_PAYMENT_REQUEST,
        ORDER_PAYMENT_RESET,

        USER_ORDERS_FAIL,
        USER_ORDERS_SUCCESS,
        USER_ORDERS_REQUEST,
        USER_ORDERS_RESET
} from '../constants/OrderConstants';

export const order_create_reducer = ( state = {}, action) => {
        switch (action.type) {
                case ORDER_CREATE_REQUEST:
                        return {
                                loading:true
                        }

                case ORDER_CREATE_SUCCESS:
                        return {
                                loading:false,
                                success: true,
                                order: action.payload
                        }

                case ORDER_CREATE_FAIL:
                        return {
                                loading:false,
                                error: action.payload
                        }

                case ORDER_CREATE_RESET:
                        return {}

                default:
                        return state
        }
}

export const order_details_reducer = ( state = { loading: true, order_items: [], shipping_address: {}}, action) => {
        switch (action.type) {
                case ORDER_DETAILS_REQUEST:
                        return {
                                ...state,
                                loading: true
                        }

                case ORDER_DETAILS_SUCCESS:
                        return {
                                loading:false,
                                order: action.payload
                        }

                case ORDER_DETAILS_FAIL:
                        return {
                                loading:false,
                                error: action.payload
                        }

                default:
                        return state
        }
}

export const order_payment_reducer = ( state = { }, action) => {
        switch (action.type) {
                case ORDER_PAYMENT_REQUEST:
                        return {
                                loading: true
                        }

                case ORDER_PAYMENT_SUCCESS:
                        return {
                                loading:false,
                                success: true
                        }

                case ORDER_PAYMENT_FAIL:
                        return {
                                loading:false,
                                error: action.payload
                        }

                case ORDER_PAYMENT_RESET:
                        return {}

                default:
                        return state
        }
}

export const user_orders_reducer = ( state = { orders: [] }, action) => {
        switch (action.type) {
                case USER_ORDERS_REQUEST:
                        return {
                                loading: true
                        }

                case USER_ORDERS_SUCCESS:
                        return {
                                loading:false,
                                orders: action.payload
                        }

                case USER_ORDERS_FAIL:
                        return {
                                loading:false,
                                error: action.payload
                        }

                case USER_ORDERS_RESET:
                        return {
                                orders: []
                        }

                default:
                        return state
        }
}