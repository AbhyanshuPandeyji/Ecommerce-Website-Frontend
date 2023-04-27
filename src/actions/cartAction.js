import {
  // to add to cart
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// in action usually the url of the api and the data been sending in payload is changed
// and when the data is required in the api to get the specific data from the data base or to post in it we - add the data to be selected or put and the header type


// Add to Cart - this will use the local storage to store your state of cart items 
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  // data will be taken by  the id of the product 
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      // this is to find the product and id - in cart reducer the product will count as id as it is defined here as product
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  // this is to store the state of our cart item - to not change on reload of the page  - and don't remove till  item is not remove from the cart
  // we need state - we take the state of our cart items from the redux and saved it to our local storage with name cartItems
  // getState() to get the state of the cart items in the local storage from the redux state
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART - take the state and the id state will be taken by the function on the go 
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO - this will  save our shipping info into  the cart
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));

};
