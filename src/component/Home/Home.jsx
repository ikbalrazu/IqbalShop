import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './Product';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../reducers/productReducer';

const product = {
  name: "Blue Tshirt",
  images: [{ url: "http://i.ibb.co/DRST11n/1.webp" }],
  price: "3000tk",
  _id: "iqbal123"
}

const Home = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state)=>state.products);
  useEffect(()=>{
    dispatch(getAllProducts());
  },[]);
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

        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
        {products.map((product,index)=>{
          return <div key={index}>
            <Product product={product}/>
          </div>
        })}
        
        {/* <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/> */}
        </div>
    </Fragment>
  )
}

export default Home;
