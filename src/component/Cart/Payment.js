import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material"; 
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
// import { config } from "dotenv";

const Payment = () => {
  
  // accessing the order details we stored in the instant storage of our app/browser the user is using
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // this is giving the error - that long error because newOrder doesn't exists
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    // this will out payment data - math round to round off
    // stripe takes in paise so we multiplied it by the 100
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  // this we will send in create order - same as backend post request we used
  const order = {
    shippingInfo,
    // cart items
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) =>{
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      // posting the data and saving it in data object
      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      // client data
      const client_secret = data.client_secret;

      // if stripe or element not equal return - to give error in further process if not exists
      if(!stripe || !elements) return;

      // this is to take the info added from the user for the payment details
      const result = await stripe.confirmCardPayment(client_secret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: user.name,
                  email: user.email,
                  address: {
                    line1: shippingInfo.address,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    postal_code: shippingInfo.pinCode,
                    country: shippingInfo.country,
                  },
                },
              },
            });
      if(result.error){
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      }
      else{
        if(result.paymentIntent.status === "succeeded")
        {
          // we will place order 
          // this is to add payment info into the order object
          order.paymentInfo={
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }

          // now we can create order -  sending the whole object to create the order
          dispatch(createOrder(order));
          navigate('/success');
        }else{
          toast.error("there some issue while processing payment ")
        }
      }
      
    } catch (error) {
      payBtn.current.disabled =false;
      toast.error(error.response.data.message);
    }

  };


  useEffect(()=>{
    if(error)
    {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch ,error ])



  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   payBtn.current.disabled = true;

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "/api/v1/payment/process",
  //       paymentData,
  //       config
  //     );

  //     const client_secret = data.client_secret;

  //     if (!stripe || !elements) return;

  //     const result = await stripe.confirmCardPayment(client_secret, {
  //       payment_method: {
  //         card: elements.getElement(CardNumberElement),
  //         billing_details: {
  //           name: user.name,
  //           email: user.email,
  //           address: {
  //             line1: shippingInfo.address,
  //             city: shippingInfo.city,
  //             state: shippingInfo.state,
  //             postal_code: shippingInfo.pinCode,
  //             country: shippingInfo.country,
  //           },
  //         },
  //       },
  //     });

  //     if (result.error) {
  //       payBtn.current.disabled = false;

  //       toast.error(result.error.message);
  //     } else {
  //       if (result.paymentIntent.status === "succeeded") {
  //         order.paymentInfo = {
  //           id: result.paymentIntent.id,
  //           status: result.paymentIntent.status,
  //         };

  //         dispatch(createOrder(order));

  //         navigate("/success");
  //       } else {
  //         toast.error("There's some issue while processing payment ");
  //       }
  //     }
  //   } catch (error) {
  //     payBtn.current.disabled = false;
  //     toast.error(error.response.data.message);
  //   }
  // };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, error ]);

  // const submitHandler = async (e) =>{
  //   toast.success("submitted");
  //   navigate("/success")
  // }

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
            {/* <input type="number" maxLength="16" required /> */}
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
            {/* <input type="number" maxLength="16" required /> */}
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
            {/* <input type="number" maxLength="16" required /> */}
          </div>

          {/* to check the order is been made or not - if yes then the order price will be total price */}
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
