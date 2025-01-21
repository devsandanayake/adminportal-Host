import {
    DESTINATION_CAT_REQUEST,
    DESTINATION_CAT_SUCCESS,
    DESTINATION_CAT_FAILURE
}
from '../../actions/types'

const initialState = {
    loading : false,
    success:false,
    data: [],
    error: '',
}

const destinationCategoryReducer = (state = initialState, action) => {
    switch(action.type){
        case DESTINATION_CAT_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case DESTINATION_CAT_SUCCESS:
            return{
                loading: false,
                success:true,
                data: action.payload,
                error: '',
            };
        case DESTINATION_CAT_FAILURE:
            return{
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default destinationCategoryReducer;