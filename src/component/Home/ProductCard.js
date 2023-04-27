import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';




const ProductCard = ({product}) => {

    // temporary - edit false will help to not change the starts rating - uneditable content
const options = {
    size: "large",
    // this will color the starts
    value: product.ratings,
    readOnly : true,
    precision: 0.5

}


    return (
    
        <Link className='productCard' to={`/product/${product._id}`} >
            {/* image will be the first image of the product that been uploaded */}
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                {/* This will hold our ratings in stars */}
                <Rating {...options} />{" "}
                {/* This will hold our no of reviews - it will be dynamic */}
                <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
            </div>
            {/* This will hold the price of our product */}
            <span>{`₹${product.price}`}</span>
        </Link>
    
        );
}

export default ProductCard;
