import React, { Fragment, useState } from 'react';
import './Search.css';
import {useNavigate} from 'react-router-dom';

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(keyword.trim());
        if (keyword.trim()) {
          //history?.push(`/products/${keyword}`);
          navigate(`/products/${keyword}`);
        } else {
          navigate("/products");
        }
    };

  return (
    <Fragment>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
            type="text"
            placeholder='Search a Product ...'
            onChange={(e)=> setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search