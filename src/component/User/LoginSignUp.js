import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";

import { useNavigate } from "react-router-dom";

import { ToastContainer , toast } from 'react-toastify';


const LoginSignUp = () => {

  const dispatch = useDispatch();

  // initializing the navigation
  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = useSearchParams();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );


  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // this is to take the input data from the user in order to send it
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // fetching data from the user which we will store in our user reducer to the storage
  const { name, email, password } = user;


  // to get the image files from the user 
  const [avatar, setAvatar] = useState("/Profile.png");
  // this is a small view of how the pic will look like
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // to login user
  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log("submit Login");
    // to login in - this will be given by the user input - then it will be passed to action to the reducer after confirmation
    dispatch(login(loginEmail, loginPassword));
  };

  // to register user
  const registerSubmit = (e) => {
    // console.log("Register Submit");
  
    e.preventDefault(); 

    // this is create the whole form data
    const myForm = new FormData();


    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);
    // console.log("sign Up form submitted");
    dispatch(register(myForm));
  };

  // this is to get and set the dta of the input given by the user
  const registerDataChange = (e) => {
    // console.log("register email")
  
    // we have to do it differently if there is image or not
    if (e.target.name === "avatar") {
      // first read the file
      const reader = new FileReader();

      reader.onload = () => {
        // the ready have 3 stages 0 initial ,1  for loading and 2 for the done state
        if (reader.readyState === 2) {
          // for preview 
          setAvatarPreview(reader.result);
          // to upload the image set
          setAvatar(reader.result);
        }
      };

      // calling the function to call to start the upload 
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // this will run the loop through the state management predefined values we given in the useState in use state
      setUser({ ...user, [e.target.name]: e.target.value });
    } 
  };


  // this part will be a problem
  // to redirect to page of shipping if logged in rather than to the account
  // it will check the location the = sign - then break it in to two 0 index and 1 index so if we are logged in we need to 
  // go to the 1 index in short the page link  we provide in the url 
  // const redirect = location.search ? location.search.split("=")[1] : "/account";



  useEffect(() => {
    if (error) {
      // this is the error for please login to access this resource
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated === true) {
      navigate("/account");

      // problem when checkout the user the success message comes first and then the check of the user
      if(user!=="null")
      toast.success("login successful");
    }
  }, [dispatch, error , isAuthenticated , navigate , toast
    // redirect
  ]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
