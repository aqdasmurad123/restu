import firebase from "../../firebase";
import { db } from "../../firebase";
import { setAlert } from "./alertActions";

import {
  FETCH_ITEMS,
  UPDATE_LISTINGS,
  FETCH_ORDERS,
  FETCH_CATEGORIES,
} from "./types";

const items = db.collection("items");
const categories = db.collection("categories");
// export const sendCompanyCode = (email, employerId, id) => async dispatch => {

export const addNewItem = (obj) => async (dispatch) => {
  console.log(obj);

  let customkey = firebase.firestore().collection("items").doc();
  // GET NAME FROM THE FILE

  //
  var filename = obj.itemFile.name;
  console.log(filename);

  let ext2 = filename.slice(filename.lastIndexOf("."));

  var image_name = customkey.id + ext2.toLowerCase();
  console.log(image_name);

  var lets = await firebase
    .storage()
    .ref("item_images/" + customkey.id + ext2.toLowerCase())
    .put(obj.itemFile);

  console.log("names", image_name);

  var url = await lets.ref.getDownloadURL();

  // VIEW THAT URL
  console.log(url);
  // // NOW STORE THAT URL WITH IMAGE TITLE IN FIRESTORE GALLERY COLLECTION
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var newItem = {
    name: obj.name,
    description: obj.description,
    // Price: obj.itemsPrics,
    // Size: obj.itemsSize,
    image_name: image_name,
    image_url: url,
    category: obj.category,
    itemsPrices:obj.itemsPrices
    

  };

  console.log(obj);

  items
    .add(newItem)
    .then(() => {
      console.log("inside then");
      // dispatch(fetchListings(listing.business_id));
      dispatch(setAlert("Item added successfully!", "success"));
      dispatch(fetchItems());
    })
    .catch((error) => {
      console.log("inside catch");
      dispatch(setAlert(error.message, "danger"));
    });
};

export const updateItems = (obj) => async (dispatch) => {
  console.log(obj);

  if (obj.item_file != "") {
    var desertRef = await firebase
      .storage()
      .ref()
      .child(`item_images/${obj.image_name}`);
    // Delete the file
    desertRef
      .delete()
      .then(function () {
        console.log("deleted succcessfully");
      })
      .catch(function (error) {
        console.log("error");
      });
  }

  let customkey = firebase.firestore().collection("items").doc();
  var url = null;
  var image_name = null;
  if (obj.item_file) {
    // GET NAME FROM THE FILE
    var filename = obj.item_file.name;
    console.log(filename);
    // GET EXTENSION OF THE IMAGE
    let ext2 = filename.slice(filename.lastIndexOf("."));

    image_name = customkey.id + ext2.toLowerCase();
    console.log(image_name);
    // UPLOAD IT ON FIREBASE STORAGE
    var lets = await firebase
      .storage()
      .ref("item_images/" + customkey.id + ext2.toLowerCase())
      .put(obj.item_file);
    // GET URL
    url = await lets.ref.getDownloadURL();
    // VIEW THAT URL
    console.log(url);
  }
  console.log("url", url);
  console.log("imagenm", image_name);
  // NOW STORE THAT URL WITH IMAGE TITLE IN FIRESTORE GALLERY COLLECTION

  if (url) {
    var tempobj = {
      name: obj.name,
      description: obj.description,
      price: obj.price,
      image_name: image_name,
      image_url: url,
      category: obj.category,
    };
  } else {
    var tempobj = {
      name: obj.name,
      description: obj.description,
      price: obj.price,

      category: obj.category,
    };
  }
  console.log(tempobj);
  items
    .doc(obj.id)
    .update(tempobj)
    .then(() => {
      console.log("inside then");
      dispatch(fetchItems());
      dispatch(setAlert("item updated successfully!", "success"));
    })
    .catch((error) => {
      console.log("inside catch");
      dispatch(setAlert(error.message, "danger"));
    });
};

export const deleteItems = (id, image_name) => async (dispatch) => {
  console.log("image name", image_name, "id", id);

  if (image_name != "") {
    var desertRef = await firebase
      .storage()
      .ref()
      .child(`item_images/${image_name}`);
    // Delete the file
    desertRef
      .delete()
      .then(function () {
        console.log("deleted succcessfully");
      })
      .catch(function (error) {
        console.log("error", error.message);
      });
  }

  items
    .doc(id)
    .delete()
    .then(() => {
      console.log("inside then");
      dispatch(fetchItems());
      dispatch(setAlert("Listing Deleted successfully!", "success"));
    })
    .catch((error) => {
      console.log("inside catch");
      dispatch(setAlert(error.message, "danger"));
    });
};

export const fetchItems = () => async (dispatch) => {
  try {
    items.onSnapshot((snapshot) => {
      let data = [];
      console.log(snapshot);
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      dispatch({
        type: FETCH_ITEMS,
        payload: data,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const fetchCategories = () => async (dispatch) => {
  const data = [];

  categories.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    dispatch({
      type: FETCH_CATEGORIES,
      payload: data,
    });
  });
};
