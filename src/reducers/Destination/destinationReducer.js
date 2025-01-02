import {
    DESTINATION_REQUEST,
    DESTINATION_SUCCESS,
    DESTINATION_FAILURE,
}
from '../../actions/types';

const initialState = {
    loading : false,
    data: [],
    error: '',
}

const destinationReducer = (state = initialState, action) => {
    switch(action.type){
        case DESTINATION_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case DESTINATION_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: '',
            };
        case DESTINATION_FAILURE:
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