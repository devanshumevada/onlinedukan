import { USER_LOGIN_FAIL, 
        USER_LOGIN_SUCCESS, 
        USER_LOGIN_REQUEST, 
        USER_LOGOUT,

        USER_REGISTER_FAIL,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_REQUEST,

        USER_DETAIL_FAIL,
        USER_DETAIL_SUCCESS,
        USER_DETAIL_REQUEST,

        USER_DETAIL_UPDATE_FAIL,
        USER_DETAIL_UPDATE_SUCCESS,
        USER_DETAIL_UPDATE_REQUEST,
        USER_DETAIL_UPDATE_RESET,
        USER_DETAILS_RESET,

        USER_LIST_FAIL,
        USER_LIST_SUCCESS,
        USER_LIST_REQUEST,
        USER_LIST_RESET} from '../constants/UserConstants';



export const user_login_reducer = (state={ }, action) => {
        switch(action.type) {
                case USER_LOGIN_REQUEST:
                        return { loading: true }

                case USER_LOGIN_SUCCESS:
                        return { loading: false, user_info: action.payload }

                case USER_LOGIN_FAIL:
                        return { loading:false, error:action.payload }

                case USER_LOGOUT:
                        return {}

                default:
                        return state
        }
}

export const user_register_reducer = (state={ }, action) => {
        switch(action.type) {
                case USER_REGISTER_REQUEST:
                        return { loading: true }

                case USER_REGISTER_SUCCESS:
                        return { loading: false, user_info: action.payload }

                case USER_REGISTER_FAIL:
                        return { loading:false, error:action.payload }

                default:
                        return state
        }
}

export const user_details_reducer = (state={ user: {} }, action) => {
        switch(action.type) {
                case USER_DETAIL_REQUEST:
                        return { ...state ,loading: true }

                case USER_DETAIL_SUCCESS:
                        return { loading: false, user: action.payload }

                case USER_DETAIL_FAIL:
                        return { loading:false, error:action.payload }
                
                case USER_DETAILS_RESET:
                        return { user: {} }

                default:
                        return state
        }
}

export const user_details_update_reducer = (state={ }, action) => {
        switch(action.type) {
                case USER_DETAIL_UPDATE_REQUEST:
                        return { loading: true }

                case USER_DETAIL_UPDATE_SUCCESS:
                        return { loading: false, success:true, user_info: action.payload }

                case USER_DETAIL_UPDATE_FAIL:
                        return { loading:false, error:action.payload }

                case USER_DETAIL_UPDATE_RESET:
                        return {}

                default:
                        return state
        }
}

export const users_list_reducer = (state={ users: [] }, action) => {
        switch(action.type) {
                case USER_LIST_REQUEST:
                        return { loading: true }

                case USER_LIST_SUCCESS:
                        return { loading: false, users: action.payload }

                case USER_LIST_FAIL:
                        return { loading:false, error:action.payload }

                case USER_LIST_RESET:
                        return { users: [] }

                default:
                        return state
        }
}