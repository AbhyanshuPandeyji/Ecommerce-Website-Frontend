import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut , Line } from "react-chartjs-2";
// import the chart from the chart.js
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  // this is to get the state of the products to work on its values - in our case to show the dynamic values
  const { products } = useSelector((state) => state.products);

  // this is to get the state of the orders to work on its values - in our case to show the dynamic values
  const { orders } = useSelector((state) => state.allOrders);

  // this is to get the state of the users to work on its values - in our case to show the dynamic values
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    // this functions is to call and get the data related to the functions - usually all the data
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  // this is to set the total amount of the earning
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    // this is to show our earnings in line graph
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        // this is to show amount earned from zero to total
        data: [0,totalAmount],
      },
    ],
  };

  // this is to  show our no of products that are in stock or out of it
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        // this is to show the data of the products - the products that are out of stock
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        {/* this is to show our total earnings */}
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          {/* this is to show our no of products , orders , and users on our website respectively */}
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              {/* for products */}
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* for orders numbers */}
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* for users present */}
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        {/* the charts are giving error right now */}
        {/* this is our line graph of income */}
        <div className="lineChart">
          <Line data={lineState} />
        </div>

        {/* this is our donut graph for the no of products that been out of stock to the total no of products */}
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
