import React, {Fragment, useEffect, useState} from 'react';
import "./Products.css";
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, getProduct} from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import MetaData from "../layout/MetaData.js";
// its harder than material ui
import Pagination from "react-js-pagination";
import {Slider} from '@mui/material';
import Typography from '@mui/material/Typography';
import {ToastContainer, toast} from 'react-toastify';

import {useParams} from 'react-router-dom';


// for showing the categories
const categories = [
    "Laptop",
    "Television",
    "Smartphone",
    "Computer",
    "Digital",
    "Wardrobe",
    "Camera",
    "Book",
];

const Products = () => { // for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // price range setter
    const [price, setPrice] = useState([0, 100000]);

    // for setting up the category search
    const [category, setCategory] = useState("");


    // for setting up ratings
    const [ratings, setRatings] = useState(0);


    const dispatch = useDispatch();

    // use params instead of match
    const {keyword, id, page} = useParams();

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
    } = useSelector((state) => state.products)


    // pagination function
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    // price filter function
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    

    // effect function for every thing filter ,pagination, search to products
    useEffect(() => {
        if(error){
            // error message works just need to fix the infinite messages
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))

    }, [
        dispatch,
        keyword,
        currentPage,
        price,
        category,
        ratings,
        error,
    ])

    // let count = filteredProductsCount;
    return (

        <Fragment> {
            loading ? (
                <Loader/>) : (
                <Fragment>
                    <MetaData title="Products -- E-commerce"/>
                    <h2 className='productsHeading'>Products</h2>


                    <div className='products'>
                        {
                        products && products.map((product) => (
                            <ProductCard key={
                                    product._id
                                }
                                product={product}/>
                        ))
                    } </div>

                    {/* The Filter section */}
                    <div className='filterBox'>
                        {/* material ui slider and typography */}
                        <Typography>
                            Price
                        </Typography>
                        <Slider value={price}
                            size="small"
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={100000}/>
                        <Typography>
                            Categories
                        </Typography>
                        <ul className='categoryBox'>
                            {
                            categories.map((category) => (
                                <li className="category-link"
                                    key={category}
                                    onClick={
                                        () => setCategory(category)
                                }>
                                    {category} </li>
                            ))
                        } </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider value={ratings}
                                onChange={
                                    (e, newRating) => {
                                        setRatings(newRating);
                                    }
                                }
                                valueLabelDisplay="auto"
                                marks={true}
                                min={0}
                                max={5}/>
                        </fieldset>
                </div>


                {/* the Pagination Section */}
                {
                resultPerPage < productsCount && (
                    <div className='paginationBox'>
                        <Pagination activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"/>
                    </div>
                )
            } </Fragment>
            )
        }
        <ToastContainer/> 
        </Fragment>
    )
}

export default Products;
