import {combineReducers} from 'redux'


import authReducer from './authReducer';
import alertReducer from './alertReducer';
import itemsReducer from './itemsReducer';
import orderReducer from './ordersReducer';
import loginReducer from './loginReducer';




export default combineReducers({
  
    item:itemsReducer,
    auth:authReducer,
    order:orderReducer,
    alert:alertReducer,
    auth:loginReducer
   
})