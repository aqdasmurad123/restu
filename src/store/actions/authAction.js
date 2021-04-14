import firebase from "../../firebase";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_USERS_SUCCESS,
  LOGOUT,
  FETCH_USERS_FAIL,
} from "./types";
import { setAlert } from "./alertActions";
import { db } from "../../firebase";

export const register = (file, user) => async (dispatch) => {
  let customkey = firebase.firestore().collection("users").doc();
  var filename = file.name;
  console.log(filename);
  // GET EXTENSION OF THE IMAGE
  let ext2 = filename.slice(filename.lastIndexOf("."));

  var image_name = customkey.id + ext2.toLowerCase();
  console.log(image_name);
  // UPLOAD IT ON FIREBASE STORAGE
  var lets = await firebase
    .storage()
    .ref("business_images/" + customkey.id + ext2.toLowerCase())
    .put(file);
  // GET URL
  var url = await lets.ref.getDownloadURL();
  // VIEW THAT URL
  console.log(url);
  // NOW STORE THAT URL WITH IMAGE TITLE IN FIRESTORE GALLERY COLLECTION
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function (data) {
        console.log("Document written with ID: ", data.user.uid);

        var obj = {
          business_name: user.businessName,
          address: user.address,
          state: user.state,
          email: user.email,
          region: user.region,
          service_industry: user.serviceIndustry,
          image_name: image_name,
          business_image: url,
          abn_acn:user.abn_acn
        };

        firebase
          .firestore()
          .collection("users")
          .doc(data.user.uid)
          .set(obj)
          .then(function () {
            firebase
              .firestore()
              .collection("users")
              .doc(data.user.uid)
              .get()
              .then(function (doc) {
                dispatch({
                  type: REGISTER_SUCCESS,
                });
                dispatch(setAlert("Account Created Successfully", "info"));
              })
              .catch(function (error) {
                dispatch({
                  type: REGISTER_FAIL,
                });
                dispatch(setAlert(error.message, "danger"));
              });
          })
          .catch(function (error) {
            dispatch({
              type: REGISTER_FAIL,
            });
            dispatch(setAlert(error.message, "danger"));
          });
      })
      .catch(function (error) {
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch(setAlert(error.message, "danger"));
      })
      // })
      // .catch(function (error) {
      //     dispatch({
      //         type: REGISTER_FAIL
      //     });
      //     dispatch(setAlert(error.message, 'danger'))
      // })

      .catch(function (error) {
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch(setAlert(error.message, "danger"));
      })

      .catch(function (error) {
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch(setAlert(error.message, "danger"));
      });
  } catch {
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch(setAlert("Registration Failed", "danger"));
  }
};

export const login = (user) => async (dispatch) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            firebase
              .firestore()
              .collection("users")
              .doc(data.user.uid)
              .get()

              .then(function (doc) {
                // if (user.emailVerified) {
                if (data.user.uid) {
                  dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                      user: doc.data(),
                      token: data.user.uid,
                    },
                  });
                } else {
                  dispatch(setAlert("User not Registered ", "danger"));
                  dispatch({
                    type: LOGIN_FAIL,
                  });
                }
                // }
                // else {
                //     dispatch(setAlert('please verify your email', 'danger'))
                //     dispatch({
                //         type: LOGIN_FAIL,
                //     });
                // }
              })
              .catch(function (error) {
                dispatch(setAlert(error.message, "danger"));
                dispatch({
                  type: LOGIN_FAIL,
                });
              });
          }
        });
      })
      .catch(function (error) {
        dispatch(setAlert(error.message, "danger"));
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  } catch (error) {
    dispatch(setAlert("Invalid credentials", "danger"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
 

  dispatch({
    type: LOGOUT,
  });
};

export const forgotPassword = (forgotEmail) => async (dispatch) => {
  console.log("inside fun");
  firebase
    .auth()
    .sendPasswordResetEmail(forgotEmail)

    .then(function () {
      console.log("inside then");

      dispatch(setAlert("Reset password email sent", "success"));
    })
    .catch(function (error) {
      console.log("inside catch");
      dispatch(setAlert(error.message, "danger"));
    });
};

const users = db.collection("users");
export const updateUser = (_uid) => async (dispatch) => {
  users
    .doc(_uid)
    .get()
    .then((doc) => {
      console.log("login updat");
      localStorage.setItem("user", JSON.stringify(doc.data()));
    });
};
const listings = db.collection("listings");

export const fetchUsers = (obj) => async (dispatch) => {
  var data = [];
  var temp_listings = [];
  console.log(obj);
  if (!obj.state && !obj.region && !obj.service_industry) {
    users
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size < 1) {
          dispatch({
            type: FETCH_USERS_FAIL,
            users: data,
            payload: temp_listings,
          });
        } else {
          querySnapshot.forEach((doc) => {
            console.log(doc.id);
            data.push({ ...doc.data(), id: doc.id });
          });
        }
      })
      .then((res) => {
        listings
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id);
              temp_listings.push({ ...doc.data(), id: doc.id });
            });
          })
          .then((res) => {
            console.log("temp-listings", temp_listings);
            dispatch({
              type: FETCH_USERS_SUCCESS,
              users: data,
              payload: temp_listings,
            });
          })
          .catch((error) => {
            dispatch({
              type: FETCH_USERS_FAIL,
              users: data,
              payload: temp_listings,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USERS_FAIL,
          users: data,
          payload: temp_listings,
        });
      });
  } else {
    if (!obj.state && !obj.region && obj.service_industry) {
      users
        .where("service_industry", "==", obj.service_industry)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size < 1) {
            dispatch({
              type: FETCH_USERS_FAIL,
              users: data,
              payload: temp_listings,
            });
          } else {
            querySnapshot.forEach((doc) => {
              console.log(doc.id);
              data.push({ ...doc.data(), id: doc.id });
            });
          }
        })
        .then((res) => {
          data.forEach((user) => {
            listings
              .where("business_id", "==", user.id)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id);
                  console.log(user.id);
                  temp_listings.push({ ...doc.data(), id: doc.id });
                });
              })
              .then((res) => {
                console.log("temp-listings", temp_listings);
                dispatch({
                  type: FETCH_USERS_SUCCESS,
                  users: data,
                  payload: temp_listings,
                });
              })
              .catch((error) => {
                dispatch({
                  type: FETCH_USERS_FAIL,
                  users: data,
                  payload: temp_listings,
                });
              });
          });
        })
        .catch((error) => {
          dispatch({
            type: FETCH_USERS_FAIL,
            users: data,
            payload: temp_listings,
          });
        });
    } else {
      if (obj.state && !obj.region && obj.service_industry) {
        users
          .where("state", "==", obj.state)
          .where("service_industry", "==", obj.service_industry)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size < 1) {
              dispatch({
                type: FETCH_USERS_FAIL,
                users: data,
                payload: temp_listings,
              });
            } else {
              querySnapshot.forEach((doc) => {
                console.log(doc.id);
                data.push({ ...doc.data(), id: doc.id });
              });
            }
          })
          .then((res) => {
            data.forEach((user) => {
              listings
                .where("business_id", "==", user.id)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    console.log(user.id);
                    temp_listings.push({ ...doc.data(), id: doc.id });
                  });
                })
                .then((res) => {
                  console.log("temp-listings", temp_listings);
                  dispatch({
                    type: FETCH_USERS_SUCCESS,
                    users: data,
                    payload: temp_listings,
                  });
                })
                .catch((error) => {
                  dispatch({
                    type: FETCH_USERS_FAIL,
                    users: data,
                    payload: temp_listings,
                  });
                });
            });
          })
          .catch((error) => {
            dispatch({
              type: FETCH_USERS_FAIL,
              users: data,
              payload: temp_listings,
            });
          });
      } else {
        if (obj.state && !obj.region && !obj.service_industry) {
          users
            .where("state", "==", obj.state)
            .get()
            .then((querySnapshot) => {
              console.log(querySnapshot.size);
              if (querySnapshot.size < 1) {
                dispatch({
                  type: FETCH_USERS_FAIL,
                  users: data,
                  payload: temp_listings,
                });
              } else {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id);
                  data.push({ ...doc.data(), id: doc.id });
                });
              }
            })
            .then((res) => {
              data.forEach((user) => {
                listings
                  .where("business_id", "==", user.id)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      console.log(doc.id);
                      console.log(user.id);
                      temp_listings.push({ ...doc.data(), id: doc.id });
                    });
                  })
                  .then((res) => {
                    console.log("temp-listings", temp_listings);
                    dispatch({
                      type: FETCH_USERS_SUCCESS,
                      users: data,
                      payload: temp_listings,
                    });
                  })
                  .catch((error) => {
                    dispatch({
                      type: FETCH_USERS_FAIL,
                      users: data,
                      payload: temp_listings,
                    });
                  });
              });
            })
            .catch((error) => {
              dispatch({
                type: FETCH_USERS_FAIL,
                users: data,
                payload: temp_listings,
              });
            });
        } else {
          if (obj.state && obj.region && !obj.service_industry) {
            console.log("here in side if");
            users
              .where("state", "==", obj.state)
              .where("region", "==", obj.region)
              .get()
              .then((querySnapshot) => {
                console.log(querySnapshot.size);
                if (querySnapshot.size < 1) {
                  dispatch({
                    type: FETCH_USERS_FAIL,
                    users: data,
                    payload: temp_listings,
                  });
                } else {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    data.push({ ...doc.data(), id: doc.id });
                  });
                }
              })
              .then((res) => {
                data.forEach((user) => {
                  listings
                    .where("business_id", "==", user.id)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        console.log(doc.id);
                        console.log(user.id);
                        temp_listings.push({ ...doc.data(), id: doc.id });
                      });
                    })
                    .then((res) => {
                      console.log("temp-listings", temp_listings);
                      dispatch({
                        type: FETCH_USERS_SUCCESS,
                        users: data,
                        payload: temp_listings,
                      });
                    })
                    .catch((error) => {
                      dispatch({
                        type: FETCH_USERS_FAIL,
                        users: data,
                        payload: temp_listings,
                      });
                    });
                });
              })
              .catch((error) => {
                console.log(error);
                dispatch({
                  type: FETCH_USERS_FAIL,
                  users: data,
                  payload: temp_listings,
                });
              });
          } else {
            users
              .where("state", "==", obj.state)
              .where("service_industry", "==", obj.service_industry)
              .where("region", "==", obj.region)
              .get()
              .then((querySnapshot) => {
                if (querySnapshot.size < 1) {
                  dispatch({
                    type: FETCH_USERS_FAIL,
                    users: data,
                    payload: temp_listings,
                  });
                } else {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    data.push({ ...doc.data(), id: doc.id });
                  });
                }
              })
              .then((res) => {
                data.forEach((user) => {
                  listings
                    .where("business_id", "==", user.id)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        console.log(doc.id);
                        console.log(user.id);
                        temp_listings.push({ ...doc.data(), id: doc.id });
                      });
                    })
                    .then((res) => {
                      console.log("temp-listings", temp_listings);
                      dispatch({
                        type: FETCH_USERS_SUCCESS,
                        users: data,
                        payload: temp_listings,
                      });
                    })
                    .catch((error) => {
                      dispatch({
                        type: FETCH_USERS_FAIL,
                        users: data,
                        payload: temp_listings,
                      });
                    });
                });
              })
              .catch((error) => {
                dispatch({
                  type: FETCH_USERS_FAIL,
                  users: data,
                  payload: temp_listings,
                });
              });
          }
        }
      }
    }
  }
};
