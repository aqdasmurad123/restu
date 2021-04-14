import {FETCH_ITEMS,FETCH_CATEGORIES} from '../actions/types';


import { db } from "../../firebase";


const listings = db.collection("listings");

 const  initialState = {
	items: [],
	categories:[],
	
};

function listingReducer(state = initialState, action) {
	switch (action.type) {
		

		case FETCH_ITEMS: {
          
			
			
			return {
				...state,
				items: action.payload,
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

export default  listingReducer ;
