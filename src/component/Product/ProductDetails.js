import React, {useEffect, useState} from 'react'
// import Carousel from 'react-material-ui-carousel';
import {Fragment} from 'react';
import './ProductDetails.css'
import Loader from '../layout/Loader/Loader.js'
import MetaData from '../layout/MetaData.js'
import Carousel from 'react-material-ui-carousel'
import { addItemsToCart } from '../../actions/cartAction';

// this is to work with the image url in the function instead of params - match.params.id instead - import useParams and create an id
import {useParams} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction';

import { Rating } from '@mui/material';

import ReviewCard from './ReviewCard.js'

import { ToastContainer , toast } from 'react-toastify';
// for review 
import { Dialog, DialogActions , DialogContent , DialogContextText , DialogTitle , Button  } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';








// match is like the req.params it is for the frontend
// it only being received not taken from the page

const ProductDetails = () => {

    const dispatch = useDispatch();

    const {id} = useParams();

    
    // to pull data from the redux
    const {product, loading ,error } = useSelector((state) => state.productDetails);
    
    const { success , error: reviewError } = useSelector((state) => state.newReview)

    const [quantity , setQuantity] = useState(1);

    // const options = {
    //     size: "large",
    //     value: product.ratings,
    //     readOnly: true,
    //     precision: 0.5,
    // };
    
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () =>{
        // if the  quantity should be less than equal to stock
        if(product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () =>{
        // if quantity is less than or equal to 1 
        if(1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }


    const addToCartHandler = () =>{
        dispatch(addItemsToCart(id , quantity));
        toast.success("Items Added To Cart ");

    }

    const submitReviewToggle = () =>{
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () =>{
        const myForm = new FormData();

        myForm.set("rating", rating)
        // did typo here the value should matched the input field want in the form - state value notation
        myForm.set("comment", comment)
        myForm.set("productId", id)

        dispatch(newReview(myForm));
        
        setOpen(false);
    };

    const options = {
        // this will color the starts
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
    // for error component
    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors());
        }

        if(reviewError){
            toast.error(reviewError)
            dispatch(clearErrors());
        }

        if(success){
            toast.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }

        dispatch(getProductDetails(id));
    }, [dispatch, id , error , reviewError ,success ])
    // }, [dispatch, match.params.id]);


   

    return (
        <Fragment> {
            loading ? (
                <Loader/>) : (
                <Fragment>
                    <MetaData title={`${product.name} -- E-commerce`}/>

                    <div className='ProductDetails'>
                        {/* we will use material ui carousel */}

                        <div> {/* just remove if sliding does not works */}
                            <Carousel className='carouselItem'>
                            {/* <Slide> */}
                            {
                            product.images && product.images.map((item, i) => (
                                <img className='CarouselImage'
                                    key={i}
                                    src={
                                        item.url
                                    }
                                    alt={
                                        `${i} Slide`
                                    }/>
                            ))
                        }
                        {/* </Slide> */}
                            </Carousel> 
                        
                            </div>
                        <div>
                            <div className='detailsBlock-1'>
                                <h2>{
                                    product.name
                                }</h2>
                                <p>Product # {
                                    product._id
                                }</p>
                            </div>
                            <div className='detailsBlock-2'>
                                <Rating {...options}/>
                                <span className='detailsBlock-2-span'>
                                    {" "}
                                    ({
                                    product.numOfReviews
                                }
                                    Reviews)
                                </span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{
                                    `₹${
                                        product.price
                                    }`
                                }</h1>
                                {/* add to cart section */}
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    
                                    <button  disabled={product.Stock < 1 ? true : false } onClick={addToCartHandler}>Add To Cart</button>
                                </div>
                                <div>
                                    Status:
                                    <b className={
                                        product.Stock < 1 ? "redColor" : "greenColor"
                                    }>
                                        {"   "}
                                        {
                                        product.Stock < 1 ? "Out Of Stock" : "In Stock"
                                    } </b>

                                </div>
                            </div>

                            {/* details and description about the product */}
                            <div className='detailsBlock-4'>
                                Description :
                                <p>{
                                    product.description
                                }</p>
                            </div>

                            {/* button to submit review */}
                            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                        </div>
                    </div>
                    

                    {/* Reviews Card */}
                    <h3 className='reviewsHeading'>
                        Reviews
                    </h3>

                    {/* This is for the dialog popup for the sumbit button */}
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        // this is handle by use state
                        open={open}
                        className='DialogMain'
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                        {/* this rating component is from the react */}
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>



                    {/* if product reviews is present then show the review */}
                    {
                    product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {
                            product.reviews && product.reviews.map((review) => (
                                <ReviewCard review={review} key={review._id}/>
                            ))
                        } </div>

                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )
                }

                </Fragment>
            )
        }
        </Fragment>

    )
}

export default ProductDetails;
