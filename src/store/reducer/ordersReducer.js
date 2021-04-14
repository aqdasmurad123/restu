import {FETCH_ITEMS,FETCH_ORDERS,FETCH_CATEGORIES} from '../actions/types';


import { db } from "../../firebase";


const listings = db.collection("listings");

 const  initialState = {
	orders: [],
	categories:[],
	
};

function orderReducer(state = initialState, action) {
	switch (action.type) {
		

		case FETCH_ORDERS: {
          
			
			
			return {
				...state,
				orders: action.payload,
			};
		}
		case FETCH_CATEGORIES: {
			console.log("cate",action.payload)
			return {
				...state,
				categories: action.payload,
			};
		}
		default:
			return {
				...state,
			};
	}
}

export default  orderReducer ;
