import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

// receiving the item and the delete item cart function from the cart
const CartItemCard = ({ item , deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Cart Item Card" />
      <div>
        {/* this is the url to product if we click on it */}
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
