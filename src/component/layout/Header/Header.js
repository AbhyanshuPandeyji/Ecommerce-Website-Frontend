import React, {Fragment, useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import "./Header.css";
// import LoginSignUp from '../../User/LoginSignUp';
import Home from '../../Home/Home';
// use this instead of push the keyword
import {useNavigate} from 'react-router-dom';
import "./Header.css";

import {Backdrop, SpeedDial, SpeedDialAction} from '@mui/material';
import {ClassNames} from '@emotion/react';
// import {Backdrop} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../../../actions/userAction';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';


import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Loader/Loader';





const Header = () => {

    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    // function for the search filter
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        // to remove space
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }

    };

    const {loading, error, isAuthenticated , user} = useSelector((state) => state.user);

    async function logoutUser(){
        await dispatch(logout());
        
        navigate("/login");
        toast.success("logout Successful!");
    }

    return (

        <Fragment>
        {loading ? ( <Loader/> ) : ( <Fragment>
            <nav className="navbar navbar-expand-lg  sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand mainSite" to="/"><ShoppingBagIcon className='m-2'/> E-Commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link texts" aria-current="page" to="/"><HomeIcon className='m-2'/>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link texts" to="/products"><ShoppingBagIcon className='m-2'/>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link texts" to="/contact"><PhoneIcon className='m-2'/>Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link texts" to="/about"><PersonIcon className='m-2'/>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link texts" to="/cart"><ShoppingCartIcon className='m-2' style={{color: cartItems.length > 0 ? "tomato" : "unset" }} />Cart&nbsp;<sup><b>{cartItems.length}</b></sup></Link>
                            </li>
                            {
                            isAuthenticated  ? (
                                <li className="nav-item dropdown">

                                    <Link className="nav-link dropdown-toggle texts" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <AccountBoxIcon className='m-2'/>Account
                                    </Link>
                                    <ul className="dropdown-menu">
                                        { user.role === "admin" ? (<li>
                                            <Link id='Dashboard' className="dropdown-item texts" to="/admin/dashboard"><DashboardIcon />Dashboard</Link>
                                        </li>) : ("")}
                                        <li>
                                            <Link  className="dropdown-item texts" to="/account"><AccountCircleIcon/>Profile</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item texts" to="/orders"><ListAltIcon/>Orders</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item texts" to="/login" onClick={logoutUser}><ExitToAppIcon/>Logout</Link>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">

                                    <Link className="nav-link dropdown-toggle texts mr-1" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <AccountBoxIcon className='m-2'/>Login/Register
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item texts" to="/login"><LoginIcon/>Login</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item texts" to="/login"><LockOpenIcon/>Register</Link>
                                        </li>
                                    </ul>
                                </li>
                            )
                        } </ul>
                        <form className="d-flex searchBox" role="search"
                            onSubmit={searchSubmitHandler}>
                            <input className="form-control me-2" type="text" placeholder="Search A Product..."
                                onChange={
                                    (e) => setKeyword(e.target.value)
                                }/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </Fragment>) }
        </Fragment>

    )
}

export default Header;
