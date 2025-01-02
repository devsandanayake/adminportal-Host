import{
    ENTITY_REQUEST,
    ENTITY_SUCCESS,
    ENTITY_FAILURE
}
from '../actions/types';

const initialState = {
    loading: false,
    data: [],
    error: '',
};

const entityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENTITY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ENTITY_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case ENTITY_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}


export default entityReducer;