import{
    TICKET_REQUEST,
    TICKET_SUCCESS, 
    TICKET_FAILURE
}
from '../../actions/types'


const initialState = {
    loading : false,
    success:false,
    data: [],
    error: '',
}


const ticketReducer = (state = initialState, action) => {
    switch(action.type){
        case TICKET_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case TICKET_SUCCESS:
            return{
                loading: false,
                success:true,
                data: action.payload,
                error: '',
            };
        case TICKET_FAILURE:
            return{
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}


export default ticketReducer;