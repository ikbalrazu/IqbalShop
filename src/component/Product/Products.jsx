import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../reducers/productReducer';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css';
import { useParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { Slider, Typography } from '@mui/material';


const PER_PAGE = 3;

const Products = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { pending, products, resultPerPage, productsCount } = useSelector((state) => state.products)

    const keyword = params;

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,25000]);
    const [data, setData] = useState([]);

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        dispatch(getAllProducts(currentPage,price));
    }, [dispatch, keyword,currentPage,price]);

    // function handlePageClick({ selected: selectedPage }) {
    //     console.log(selectedPage);
    //     const countpage = selectedPage+1;
    //     setCurrentPage(countpage);
    // }

    const handlePageClick = async (data) => {
        let currentPageCount = data.selected + 1;
        setCurrentPage(currentPageCount);
    }

    const total = productsCount;
    const PageCount = Math.ceil(total / resultPerPage);

    return (
        <Fragment>
            {pending ? <Loader /> :
                <Fragment>
                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className='filterBox'>
                     <Typography>Price</Typography>
                     <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay='auto'
                      aria-labelledby='range-slider'
                      min={0}
                      max={2000}
                     />
                    </div>
                    
                    {resultPerPage < productsCount && (
                        <div className='paginationBox'>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={".."}
                            pageCount={PageCount}
                            // marginPagesDisplayed={3}
                            // pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                    </div>
                    )}
                    
                </Fragment>
            }
        </Fragment>
    )
}

export default Products