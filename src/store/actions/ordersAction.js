import firebase from "../../firebase";
import { db } from "../../firebase";
import { setAlert } from "./alertActions";
import { FETCH_ITEMS, UPDATE_LISTINGS ,FETCH_ORDERS,FETCH_CATEGORIES} from "./types";
const orders = db.collection("orders");


export const fetchOrders = () => async (dispatch) => {
  try {
   orders.onSnapshot(snapshot => {
    let data = [];

     console.log(snapshot);
       snapshot.forEach((doc) => {
         data.push({ ...doc.data(), id: doc.id });
       });
       dispatch({
         type: FETCH_ORDERS,
         payload: data
       });
     });
  } catch (error) {
      console.log(error.message);
  }
  };

  export const updateOrderStatus = (id,obj) => async (dispatch) => {

    console.log("obj",obj)
    orders
    .doc(id)
    .update(obj)
    .then(() => {
      console.log("inside then");
      dispatch(fetchOrders());
      dispatch(setAlert("status updated successfully!", "success"));
    })
    .catch((error) => {
      console.log("inside catch");
      dispatch(setAlert(error.message, "danger"));
    });
  
  };

