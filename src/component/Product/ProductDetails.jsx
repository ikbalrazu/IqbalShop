import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { getProductDetails } from '../../reducers/productReducer';
import ReactStars from 'react-rating-stars-component';
import Loader from '../layout/Loader/Loader';
import ReviewCard from './ReviewCard';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px',
  width: '200px'
}

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 3'
  },
];


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
      <div 
      style={{
        border:"1px solid green"
      }}>
      
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