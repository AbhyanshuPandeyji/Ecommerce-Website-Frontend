import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { Button } from "@mui/material";
import { useNavigate , useParams} from "react-router-dom";
import { toast , ToastContainer } from "react-toastify";


const UsersList = () => {
  const dispatch = useDispatch();

  // const alert = useAlert();
  const navigate = useNavigate();

  // this is to take in the all the user
  const { error, users , loading  } = useSelector((state) => state.allUsers);

  // this is to get the singular profile of the user
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  // delete user by his id 
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // if get error in the delete of the user
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    // if user been deleted successfully
    if (isDeleted) {
      // this message is being received from the backend
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    // this is to get all the users
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, navigate,  isDeleted, message]);

  // the header column
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      // this coloring don't works for me
      cellClassName: (params) => {
        return (params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];


  // the row data underneath the column
  const rows = [];

  // to go through all the users and set get the data and set on the appropriate column
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
};

export default UsersList;
