import {ALL_PRODUCT_REQUEST} from '../../src/constants/productConstants';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    productname:"oneplus 7t 8/256",
    price: "3000tk"
}

export const productReducer = createReducer({initialState}, {
    
    PRODUCTNAME: (state, action) => {
        state.productname = action.payload
    },

    PRODUCTPRICE: (state)=>{
        state.price = "5000tk"
    }
})
