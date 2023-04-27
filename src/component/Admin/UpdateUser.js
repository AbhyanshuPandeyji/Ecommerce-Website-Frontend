import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate , useParams} from "react-router-dom";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { toast , ToastContainer } from "react-toastify";

const UpdateUser = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  // this is to get the user
  const { loading, error, user } = useSelector((state) => state.userDetails);

  // this is from the state of the user on the redux to check if the user been updated
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // get the user id from the url
  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      // if userId seen is not equal to the userId in params
      //  then find the userDetails matched to the we get from teh url
      dispatch(getUserDetails(userId));
    } else {
      // if found then the setting of the things in the row will be these things
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }


    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // if error comes in updating the user
    if(updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    // if user is been updated successfully
    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      // to stop the update process after first successful attempt
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate,  isUpdated, updateError, user, userId]);

  // this is to handle the submission update user 
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    // take the user data and set into a form to send to the api
    const myForm = new FormData();

    // these two will be taken for user selection 
    myForm.set("name", name);
    myForm.set("email", email);
    // this will be taken for the update
    myForm.set("role", role);

    // to update user and change the value in the form of the user or the row things of the user
    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        {/* this is the sidebar to navigate */}
        <SideBar />
        <div className="newProductContainer">
          {/* this will be main div where the data of the current chosen area to be check in admin panel */}
          {loading ? (
            <Loader />
          ) : (
            // form to update user role
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* the area where the user role will be selected - if user then to admin and admin to user */}
              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

            {/* button to perform the update - if role is empty the button wont work */}
              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
};

export default UpdateUser;
