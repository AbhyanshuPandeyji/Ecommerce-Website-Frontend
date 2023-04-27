import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {

  const dispatch = useDispatch();

  // cart items from the state
  const { cartItems } = useSelector((state) => state.cart);

  const { isAuthenticated }  = useSelector((state)=> state.user);
  
  const navigate = useNavigate();

  // increase the quantity according to stock - 
  // we can use item.product to get the product id because cartItems has the product id through product reference
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    // if stock is equal to no of stock then return
    if (stock <= quantity) {
      return;
    }
    // to update the cart quantity
    dispatch(addItemsToCart(id, newQty));
  };

  // to decrease the quantity of the product in cart
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    // decrease and send the new quantity
    dispatch(addItemsToCart(id, newQty));
  };

  // to send the delete item request from cart - handled by the remove button in the cart
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };


  // to go to the shipping page to move to next steps of order
  const checkoutHandler = () => {
    // it will redirect to the login if we are not logged in so we have to login to make a purchase 
    if(isAuthenticated !== true){
      navigate("/account")
    }
    else{
    navigate("/shipping");
    }
    
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        // if no items exits in the cart
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          {/* go to see the products to add to your cart */}
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {/* we will pass the items to the cart to  work with for now we will use the temporary variable */}
            {/* to map on the cart card */}
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          // stock has small "s" in redux storage
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {/* to show the total amount of the product with the quantity */}
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                {/* takes all the amount and reduce it to a single number of total */}
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
