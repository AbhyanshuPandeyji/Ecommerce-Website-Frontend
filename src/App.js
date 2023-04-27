// packages and pre-build components
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import React , {useEffect, useState} from 'react';

import WebFont from 'webfontloader';
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
// import Dashboard from './Dashboard.js'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// components 
import Products from './component/Product/Products.js'
import LoginSignUp from './component/User/LoginSignUp.js'
import Home from './component/Home/Home.js'
import Header from './component/layout/Header/Header.js'
import Footer from './component/layout/Footer/Footer.js'
import ProductDetails from './component/Product/ProductDetails.js'
import ProtectedRoutes from './component/Route/ProtectedRoutes';
import Profile from './component/User/Profile.js'
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart.js'
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from './component/Cart/Payment.js'
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrders.js'
import OrderDetails from './component/Order/OrderDetails.js' ;
import Dashboard from './component/Admin/Dashboard.js'
import ProductList from './component/Admin/ProductList.js'
import NewProduct from './component/Admin/NewProduct.js'
import UpdateProduct from './component/Admin/UpdateProduct.js'
import OrderList from './component/Admin/OrderList.js'
import ProcessOrder from './component/Admin/ProcessOrder.js'
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js'
import ProductReviews from  './component/Admin/ProductReviews.js'
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import DeleteProfile from './component/User/DeleteProfile.js'
// import AdminProtectedRoute from './component/Route/AdminProtectedRoute';

// import ProductReviews from "./component/Admin/ProductReviews";

function App() {


  const {loading , error  ,isAuthenticated , user} = useSelector((state)=>state.user)

  // to make the payment method state
  const [stripeApiKey , setStripeApiKey] = useState("");

  // function to get the api key from the backend
  async function getStripeApiKey() {
      const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  // To Download Google Font
  useEffect(()=>{

    // TO use any font from the google library
    WebFont.load({
      google:{
        families:['Roboto', "Droid Sans", "Chilanka"]
      },
    });
  
    // can also use dispatch like this
    store.dispatch(loadUser());

    getStripeApiKey();

  },[]);


  // this statement is to have our website not to be inspected
  window.addEventListener("contextmenu", (e) => e.preventDefault());


  

  return (
  <Router>
    <Header/>

    <Routes>
    
        <Route exact path="/" Component={Home} /> 
        <Route exact path="/product/:id" Component={ProductDetails} /> 
        {/* to show all the products */}
        <Route exact path="/products" Component={Products} /> 
        <Route path="/products/:keyword" Component={Products} />
        {/* User Paths */}
        <Route exact path="/login" Component={LoginSignUp}/>

        {/* { isAuthenticated === false ? <Redirect <Route exact path="/account" Component={Profile}/> } */}

        {/* in react router 6 component is now the element here */}
        {/* this works the protected route will be element for the parent route and the children routes will be the protected one -
        their element( of children route as shown ) will be the reference to the outlet for the nesting 
        the outlet is works as route in the protected route folder - and navigate as redirect to page we want */}
        {/* this works fine y */}
        {loading === false && <Route  element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>}>
          {/* Route within a route - nesting route*/}
            <Route element={<Profile/>} path='/account' exact/>
            <Route element={<UpdateProfile/>} path='/me/update' exact/>
            <Route element={<DeleteProfile/>} path='/me/delete/:id' exact/>
            <Route element={<UpdatePassword/>} path='/password/update' exact/>
            <Route element={<Shipping/>} path='/shipping' exact/>
            <Route element={<ConfirmOrder/>} path='/order/confirm' exact/>
            {/* <Route element={<Payment/>} path='/process/payment' exact/> */}
            {stripeApiKey && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}>
              <Payment/>
              </Elements>
              }>
                    {/* // <Route element={<Payments/>} path='/process/payment' exact/> */}
            </Route>}
            <Route element={<OrderSuccess/>} path='/success' exact/>
            <Route element={<MyOrders/>} path='/orders' exact/>
            <Route element={<OrderDetails/>} path='/order/:id' exact/>
            
        </Route>
        }
            {/* <Route element={<Dashboard/>} path='/dashboard' exact/> */}
        {/* it will be only route because you can't be logged in to access to forgot password - you have update password     */}
        <Route element={<ForgotPassword/>} path='/password/forgot' exact/>
        <Route element={<ResetPassword/>} path='/password/reset/:token' exact/>
        <Route element={<Cart/>} path='/cart' exact/>
        <Route element={<Contact/>} path='/contact' exact/>
        <Route element={<About/>} path='/about' exact/>
        {/* Admin Routes */}

        {/* Cannot read properties of null (reading 'role') - the component is rendering before rendering the user  */}
        {/* it works now the user role should be passed in the protected route because this will load the component first then the user so it will give error on render */}
        {loading === false && <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} adminRoute={true} />}>
            {/* these admin routes will be separated later */}
            <Route element={<Dashboard/>} path='/admin/dashboard' exact/>
            <Route element={<ProductList/>} path='/admin/products' exact/>
            <Route element={<NewProduct/>} path='/admin/product' exact/>
            <Route element={<UpdateProduct/>} path='/admin/product/:id' exact/>
            {/* the stock will only be changed if the product is been delivered because user can cancel the product before delivery */}
            <Route element={<OrderList/>} path='/admin/orders' exact/>
            <Route element={<ProcessOrder/>} path='/admin/order/:id' exact/>
            <Route element={<UsersList/>} path='/admin/users' exact/>
            <Route element={<UpdateUser/>} path='/admin/user/:id' exact/>
            <Route element={<ProductReviews/>} path='/admin/reviews' exact/>
        </Route>
        } 
        
        {/* <Route  element={<ProtectedRoutes isAdmin={true}/>}>
        </Route> */}

        {/* This wont work it works with switch statement */}
        <Route Component={
            window.location.pathname === "/process/payment" ? null : <NotFound/>
          }/>
      </Routes> 
    <Footer/>
    </Router>
  );
}

export default App;
