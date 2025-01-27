import {
    DESTINATION_REQUEST,
    DESTINATION_SUCCESS,
    DESTINATION_FAILURE,
    DESTINATION__BYID_REQUEST,
    DESTINATION__BYID_SUCCESS,
    DESTINATION__BYID_FAILURE,
    DESTINATION_UPDATE_REQUEST,
    DESTINATION_UPDATE_SUCCESS,
    DESTINATION_UPDATE_FAILURE
}
from '../../actions/types'

const initialState = {
    loading : false,
    success:false,
    data: [],
    error: '',
}

const destinationReducer = (state = initialState, action) => {
    switch(action.type){
        //DESTINATION
        case DESTINATION_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case DESTINATION_SUCCESS:
            return{
                loading: false,
                success:true,
                data: action.payload,
                error: '',
            };
        case DESTINATION_FAILURE:
            return{
                loading: false,
                data: [],
                error: action.payload,
            };
        //DESTINATION BY ID
        case DESTINATION__BYID_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case DESTINATION__BYID_SUCCESS:
            return{
                loading: false,
                success:true,
                data: action.payload,
                error: '',
            };
        case DESTINATION__BYID_FAILURE:
            return{
                loading: false,
                data: [],
                error: action.payload,
            };  
        //DESTINATION UPDATE
        case DESTINATION_UPDATE_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case DESTINATION_UPDATE_SUCCESS:
            return{
                loading: false,
                success:true,
                data: action.payload,
                error: '',
            };
        case DESTINATION_UPDATE_FAILURE:
            return{
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default destinationReducer;