import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// export const productReducer = createReducer({initialState}, {
    
//     PRODUCTNAME: (state, action) => {
//         state.productname = action.payload
//     },

//     PRODUCTPRICE: (state)=>{
//         state.price = "5000tk"
//     }
// })

export const getAllProducts = createAsyncThunk('getAllProducts',async (keyword="")=>{
    const response = await axios.get(`http://localhost:4000/api/v1/products?keyword=${keyword}`);
    //console.log(response.data.product);
    return response.data.product;
})

export const getProductDetails = createAsyncThunk("getProductDetails",async (id) => {
    const response = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    //console.log(response);
    return response.data.product;
})


export const productReducer = createSlice({
    name:"products",
    initialState:{
        products: [],
        productDetails: "",
        pending:false,
        error: false,
        errordetails:"",
    },
    reducers:{

    },
    extraReducers:{
        [getAllProducts.pending]:(state)=>{
            state.pending = true;
        },
        [getAllProducts.fulfilled]: (state,action)=>{
            state.products = action.payload;
            state.pending = false;
        },
        [getAllProducts.rejected]: (state, action)=>{
            state.error = true;
            state.pending = false;
            state.errordetails = action.error;
        },

        [getProductDetails.pending]:(state)=>{
            state.pending = true;
        },
        [getProductDetails.fulfilled]: (state,action)=>{
            state.productDetails = action.payload;
            state.pending = false;
        },
        [getProductDetails.rejected]:(state,action)=>{
            state.error = true;
            state.pending = false;
            
        }
    }
})

export default productReducer.reducer;
