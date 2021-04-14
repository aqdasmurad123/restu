import {
	AUTH_USER,
	SHOW_NOTIFICATION,
	LOAD_STATUS,
	CLEAR_MSG,
	IS_LOGOUT,
} from "../actions/types";

import firebase from "../../firebase";

export const user = (email, password) => async dispatch => {
	console.log("user action");
	dispatch({
		type: LOAD_STATUS,
		payload: true,
	});

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(user => {
			var user = firebase.auth().currentUser;
			firebase
				.firestore()
				.collection("users")
				.get()
				.then(async snapshot => {
					let authorized = false;
					for (let doc of snapshot.docs) {
						if (doc.data().id == user.uid && doc.data().role == "admin") {
							authorized = true;
							break;
						}
					}
					if (authorized) {
						dispatch({
							type: AUTH_USER,
							payload: true,
							user: user,
						});
					} else {
						dispatch({
							type: SHOW_NOTIFICATION,
							payload: "You are not authorized to access this panel",
						});
					}

					dispatch({
						type: LOAD_STATUS,
						payload: false,
					});
				});
		})
		.catch(error => {
			dispatch({
				type: SHOW_NOTIFICATION,
				payload: error.message,
			});
			dispatch({
				type: LOAD_STATUS,
				payload: false,
			});
		});
};

export function clearMsg() {
	return {
		type: CLEAR_MSG,
	};
}

export const Logout = () => dispatch => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			dispatch({
				type: IS_LOGOUT,
			});
		});
};
