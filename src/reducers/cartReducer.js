import {
  // adding to cart
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

// in admin only the success and the reset condition will change all will usually remain same
// state intake and the loading or the user or the any other functionality like order or , product or the cart will be changed depending upon the state

export const cartReducer = (
  // cart items will  be an array
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      // to get and set the item to what ever data comes to us from action.payload
      const item = action.payload;

      // if item exist in the cart already - to not duplicate the product and just add quantity to the cart of that product
      // product is used here as the reference to the id of the product
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          // if exits then replace the product with new quantity
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          // if not exits in cart then add the product 
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        // take all the products that does not match the id and filter out the product when remove button is hit
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

      // go to the shipping page with the given data from the cart
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
