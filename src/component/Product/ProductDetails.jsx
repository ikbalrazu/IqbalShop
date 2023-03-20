import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { getProductDetails } from '../../reducers/productReducer';
import ReactStars from 'react-rating-stars-component';
import Loader from '../layout/Loader/Loader';
import ReviewCard from './ReviewCard';

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {productDetails, pending, error} = useSelector((state)=>state.products);

  const [quantity, setQuantity] = useState(1);

  useEffect(()=>{
    //console.log(productDetails);
    dispatch(getProductDetails(params.id));
  },[dispatch, params.id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: productDetails.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {pending ? 
      <Loader/> :
      <div className='ProductDetails'>
      <div>
        
        {productDetails.images &&
        productDetails?.images?.map((item, i)=>(
          <img 
          className='CarouselImage'
          key={item.url}
          src={item.url}
          alt={`${i} Slide`}
          />
        ))}
        
      </div>

      <div>
        <div className='detailsBlock-1'>
          <h2>{productDetails.name}</h2>
          <p>Product # {productDetails._id}</p>
        </div>
        <div className='detailsBlock-2'>
          <ReactStars {...options}/>
          <span>({productDetails.numOfReviews} Reviews)</span>
        </div>
        <div className='detailsBlock-3'>
          <h1>{`tk${productDetails.price}`}</h1>
          <div className='detailsBlock-3-1'>
          <div className='detailsBlock-3-1-1'>
            <button>-</button>
            <input readOnly value={quantity}/>
            <button>+</button>
          </div>{" "}
          <button>Add to Cart</button>
          </div>

          <p>
            Status:{" "}
            <b className={productDetails.Stock < 1 ? "redColor" : "greenColor"}>
              {productDetails.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className='detailsBlock-4'>
          Description : <p>{productDetails.description}</p>
        </div>

        <button className='submitReview'>Submit Review</button>
      </div>
    </div>
    
    

    }

    <h3 className='reviewsHeading'>REVIEWS</h3>
    { productDetails.reviews && productDetails.reviews[0] ?
      <div className='reviews'>
        {productDetails?.reviews?.map((data)=> <ReviewCard review={data}/>)}
        {/* <p>review got {data.name}</p> */}
      </div>
      
    :<p className='noReviews'>No Reviews Yet</p>}
    {/* {
      ProductDetails.reviews && productDetails.reviews[0] ? (
        <div className='reviews'>
          {productDetails.reviews &&
          productDetails.reviews.map((review) => <ReviewCard review={review}/>)}
        </div>
      ) : (
        <p className='noReviews'>No Reviews Yet</p>
      )
    } */}
    </Fragment>
  )
}

export default ProductDetails