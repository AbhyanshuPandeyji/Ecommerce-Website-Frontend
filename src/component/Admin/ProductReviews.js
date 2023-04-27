import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
// import { useAlert } from "react-alert";
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from "../layout/MetaData";
import StarIcon from '@mui/icons-material/Star';
import SideBar from "./Sidebar";
import { Button } from "@mui/material";
import { useNavigate , useParams} from "react-router-dom";
import { toast , ToastContainer } from "react-toastify";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  // this is to get a single review data
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  // this is to get all reviews
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  // the product id will define which products review we will see
  const [productId, setProductId] = useState("");

  // this is to delete a review - it will need the product id and review it to match both 
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  // to get reviews on a product 
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    // to check the id been entered for the search of the reviews of the product is right or not
    if(productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    // if error occur the error
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // if error occur during delete
    if(deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    // if the delete is been successful 
    if(isDeleted) {
      // this is to give the success message of the delete
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      // this is to stop the process of the delete after one successful attempt
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError,isDeleted, productId]);


  // columns of the table
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.rating >= 3
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
            {/* the params.getValue is not a function error - so used params.id */}
            <Button
              onClick={() =>
                deleteReviewHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];


  // rows of the table
  const rows = [];


  //the data of the table -- the reviews on the product
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          {/* // to search the reviews on the product */}
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            {/* if no id exits then button will be blocked */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
};

export default ProductReviews;
