import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_MSG,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isRegistered: false,

	isAuthenticated:
		localStorage.getItem("isAuthenticated") === "true" ? true : false,
	user:
		localStorage.getItem("user") === "null"
			? null
			: JSON.parse(localStorage.getItem("user")),
	searchResults: [],
	searchUsers: [],
};

export default function authReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isRegistered: true,
			};

		case FETCH_USERS_SUCCESS:
			return {
				...state,
				searchUsers: action.users,
				searchResults: action.payload,
			};
		case FETCH_USERS_FAIL:
			return {
				...state,
				searchUsers: action.users,
				searchResults: action.payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			localStorage.setItem("isAuthenticated", true);
			localStorage.setItem("loggedIn", true);
			console.log("login suecess");
			localStorage.setItem("user", JSON.stringify(payload.user));
			return {
				...state,
				user: payload.user || null,
				token: payload.token,
				isAuthenticated: true,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:

		case LOGOUT:
			localStorage.removeItem("token");
			localStorage.removeItem("isAuthenticated", false);
			localStorage.removeItem("user", null);
			localStorage.removeItem("loggedIn", false);

			localStorage.clear();
			return {
				...state,
				token: null,
				isRegistered: false,
				isAuthenticated: false,

				user: null,
			};
		default:
			return state;
	}
}
