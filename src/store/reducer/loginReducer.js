import {
	AUTH_USER,
	LOAD_STATUS,
	SHOW_NOTIFICATION,
	IS_LOGOUT,
	CLEAR_MSG,
} from "../actions/types";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")),
	loggedIn: JSON.parse(localStorage.getItem("loggedIn")) == null ? false : true,
	isLoading: false,
};
function authreducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_STATUS:
			return {
				...state,
				isLoading: action.payload,
			};
		case AUTH_USER:
			localStorage.setItem("user", JSON.stringify(action.user));
			localStorage.setItem("loggedIn", JSON.stringify(action.payload));

			return {
				...state,
				user: action.user,
				loggedIn: true,
				isLoading: false,
			};

		case SHOW_NOTIFICATION:
			console.log(action.payload);
			return {
				...state,
				notification: action.payload,
			};

		case CLEAR_MSG:
			return {
				...state,
				notification: "",
			};

		case IS_LOGOUT:
			localStorage.clear();
			return {
				...state,
				loggedIn: false,
				user: null,
			};

		default:
			return {
				...state,
			};
	}
}

export default authreducer;
