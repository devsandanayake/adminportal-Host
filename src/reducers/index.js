import { combineReducers } from 'redux';
import authReducer from './authReducer';
import entityReducer from './entityReducer';
import destinationReducer from './Destination/destinationReducer';
 
const rootReducer = combineReducers({
    auth: authReducer,
    entity: entityReducer,
    destination: destinationReducer,

});

export default rootReducer;
