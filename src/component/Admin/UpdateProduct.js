import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { Button } from "@mui/material";
import { useNavigate , useParams} from "react-router-dom";
import { toast , ToastContainer } from "react-toastify";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  // this will take the product single from the product details state
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Television",
    "Dresses",
    "Smartphone",
    "Computer",
    "Digital",
    "Wardrobe",
    "Camera",
  ];

  const productId = id;
  
  useEffect(() => {
    // if product is exist - this will be dispatch only if the product id and id in url doesn't match
    // otherwise as use effect it will resend it again and again
    if (product && product._id !== productId) {
      // to get product  details
      dispatch(getProductDetails(productId));
    } else {
      // this will take all the data of the old product that been taken to updated
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      // it will all the images of the product that exits
      setOldImages(product.images);
    }

    // if error occur
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    // if product got updated
    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      // this is to stop invoking function
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);
  
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    // form to take in the new values for the updated product
    const myForm = new FormData();
    
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    // to add the new images to the product
    images.forEach((image) => {
      myForm.append("images", image);
    });

    // to take the id of the product and form to send in to action  to take in the data of the
    // product and change it
    dispatch(updateProduct(productId, myForm));
  };

  // this is to change the images in the product 
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // it will be empty initally 
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    // this will read all the files of the images
    files.forEach((file) => {
      const reader = new FileReader();

      // this will take the files we choose as the images
      reader.onload = () => {
        // this will run the function when the 2 state the success will happen
        if (reader.readyState === 2) {
          // this is to add the new images add one onto another 
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };


      reader.readAsDataURL(file);
    });
  };
  
  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            {/* taking the product name */}
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* taking in the price */}
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            {/* taking in the description */}
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            {/* The is to choose the category of the product */}
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>


            {/* this is to choose the images */}
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
};

export default UpdateProduct;
