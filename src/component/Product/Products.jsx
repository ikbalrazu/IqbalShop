import React, { Fragment, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { getAllProducts } from '../../reducers/productReducer';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css'

const Products = () => {
    const dispatch = useDispatch();

    const {pending,products} = useSelector((state)=>state.products)

    useEffect(()=>{
        dispatch(getAllProducts());
    },[dispatch]);

  return (
    <Fragment>
        {pending ? <Loader/> : 
        <Fragment>
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
                {products && products.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default Products