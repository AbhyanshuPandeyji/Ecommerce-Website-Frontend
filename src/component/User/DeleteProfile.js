import './DeleteProfile.css'
import React, {Fragment, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
// import { useAlert } from "react-alert";
import {clearErrors, deleteProfile, logout} from "../../actions/userAction";
import {DELETE_PROFILE_RESET} from "../../constants/userConstants";
import {Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Loader from '../layout/Loader/Loader';
import MetaData from "../layout/MetaData";



const DeleteUser = () => {


    const dispatch = useDispatch();

    // const alert = useAlert();
    const navigate = useNavigate();

    const {id} = useParams();

    // this is to get the singular profile of the user
    const {error, isDeleted, message, loading} = useSelector((state) => state.profile);


    // delete user by his id
    const deleteUserHandler = () => {
        dispatch(deleteProfile(id));
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        // if get error in the delete of the user
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        // if user been deleted successfully
        if (isDeleted) { // this message is being received from the backend
            toast.success(message);
            dispatch(logout())
            navigate("/login");
            dispatch({type: DELETE_PROFILE_RESET});
        }

    }, [
        dispatch,
        error,
        navigate,
        isDeleted,
        message
    ]);

    return (
        <Fragment> {
            loading ? (
                <Loader/>) : (
                <Fragment>
                    <MetaData title="Delete Profile"/>
                    <div className="emptyCart">

                        <Typography>Do You Want to Delete Your Account</Typography>
                        {/* go to see the products to add to your cart */}
                        <button onClick={deleteUserHandler}>Yes</button>
                        <Link to="/account">No</Link>
                    </div>
                </Fragment>
            )
        } </Fragment>
    )
}

export default DeleteUser
