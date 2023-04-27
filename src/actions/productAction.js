import axios from "axios";

import {
    // to get all products
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    // to get a single product
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    // to create a product
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    // to update a product
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    // to delete a product
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    // to take a product on a single page
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    // to take in user review
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    // to show all reviews on the product
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    // to delete a review of the product
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants";

// in action usually the url of the api and the data been sending in payload is changed
// and when the data is required in the api to get the specific data from the data base or to post in it we - add the data to be selected or put and the header type

// Get All Products
export const getProduct = (keyword = "", currentPage = 1, price = [
    0, 25000
], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${
            price[0]
        }&price[lte]=${
            price[1]
        }&ratings[gte]=${ratings}`;

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${
                price[0]
            }&price[lte]=${
                price[1]
            }&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data} = await axios.get(link);

        dispatch({type: ALL_PRODUCT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ALL_PRODUCT_FAIL, payload: error.response.data.message});
    }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get("/api/v1/admin/products");

        dispatch({type: ADMIN_PRODUCT_SUCCESS, payload: data.products});
    } catch (error) {
        dispatch({type: ADMIN_PRODUCT_FAIL, payload: error.response.data.message});
    }
};

// Create Product - to create  product 
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({type: NEW_PRODUCT_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // we now just have to give the data to create a product
        const {data} = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({type: NEW_PRODUCT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: NEW_PRODUCT_FAIL, payload: error.response.data.message});
    }
};

// Update Product - needs the id and the product data of the before of the product exits only then it will work
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message});
    }
};

// Delete Product- this will take the id in reference to delete from the params
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_PRODUCT_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({type: DELETE_PRODUCT_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: DELETE_PRODUCT_FAIL, payload: error.response.data.message});
    }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data.product});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response.data.message});
    }
};

// NEW REVIEW - to create a review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({type: NEW_REVIEW_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // taking review from the user , id , comment , rating 
        const {data} = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({type: NEW_REVIEW_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: NEW_REVIEW_FAIL, payload: error.response.data.message});
    }
};

// Get All Reviews of a Product - to search a product review by its id of the product by admin
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({type: ALL_REVIEW_REQUEST});

        // the id will be the product id
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({type: ALL_REVIEW_SUCCESS, payload: data.reviews});
    } catch (error) {
        dispatch({type: ALL_REVIEW_FAIL, payload: error.response.data.message});
    }
};

// Delete Review of a Product - it will take the id of the review and teh 
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({type: DELETE_REVIEW_REQUEST});

        // only delete the review of the user on a particular product and the particular review 
        const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);

        // need to send the success instead of the reviews
        dispatch({type: DELETE_REVIEW_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: DELETE_REVIEW_FAIL, payload: error.response.data.message});
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};
