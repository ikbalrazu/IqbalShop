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

export const getAllProducts = createAsyncThunk('getAllProducts',async ()=>{
    const response = await axios.get("http://localhost:4000/api/v1/products");
    console.log(response.data.product);
    return response.data.product;
})

export const getProductDetails = createAsyncThunk("getProductDetails",async (id) => {
    const response = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    console.log(response);
})


export const productReducer = createSlice({
    name:"products",
    initialState:{
        products: [],
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
        }
    }
})

export default productReducer.reducer;
