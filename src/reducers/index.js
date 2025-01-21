import { combineReducers } from 'redux';
import authReducer from './authReducer';
import entityReducer from './entityReducer';
import destinationReducer from './Destination/destinationReducer';
import ticketReducer from './Ticket/ticketReducer';
import destinationCategoryReducer from './Destination/destinationCategoryReducer';
 
const rootReducer = combineReducers({
    auth: authReducer,
    entity: entityReducer,
    destination: destinationReducer,
    ticket: ticketReducer,
    destinationCategory: destinationCategoryReducer,

});

export default rootReducer;
