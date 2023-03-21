import React, { Fragment, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { getAllProducts } from '../../reducers/productReducer';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css';
import {useParams} from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {pending,products} = useSelector((state)=>state.products)

    const keyword = params.keyword;

    useEffect(()=>{
        dispatch(getAllProducts(keyword));
    },[dispatch, keyword]);

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