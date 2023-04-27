// this is to get all orders details and work on it for admin only
import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import "./OrderList.css"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import { toast , ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

// same as Products details just we are here only updating and deleting and viewing the orders

const OrderList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();


  // redux state of all orders 
  const { error, orders , orderStatus} = useSelector((state) => state.allOrders);

  // redux state of the orders
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  // this is to delete the order from our side
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // if order delete gets an error
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    // if order deleted
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      // once order is deleted then go to the orders
      navigate("/admin/orders");
      // this is to stop its process after one time
      dispatch({ type: DELETE_ORDER_RESET });
    }

    // to get all orders
    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate , isDeleted]);


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      // the color change don't work
      cellClassName: () => {
        return  orderStatus === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            {/* to go to the order single */}
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  // to add all orders of in the rows
  // this take the order an take its details
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          {/* to show the orders list */}
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

export default OrderList;
