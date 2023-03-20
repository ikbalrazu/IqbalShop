import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './ProductCard';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../reducers/productReducer';
import Loader from '../layout/Loader/Loader';

const product = {
  name: "Blue Tshirt",
  images: [{ url: "http://i.ibb.co/DRST11n/1.webp" }],
  price: "3000tk",
  _id: "iqbal123"
}

const Home = () => {
  const dispatch = useDispatch();
  const {products, pending, error, errordetails} = useSelector((state)=>state.products);
  useEffect(()=>{
    if(error){
      console.log(error.message);
    }
    dispatch(getAllProducts());
  },[dispatch, error]);
  return (
    <Fragment>
      
        
          <MetaData title="ECOMMERCE"/>
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>

        {pending ? (
        <Loader/>
        ) : (
          <Fragment>
        <div className="product">
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
        {products.map((product,index)=>{
          return <div key={index}>
            <Product product={product}/>
          </div>
        })}
        
        </div>
        </div>
        </Fragment>
      )} 

      {error === true && (
        <div>
          {errordetails.message}
        </div>
      )}
        
      
    </Fragment>
  )
}

export default Home;
