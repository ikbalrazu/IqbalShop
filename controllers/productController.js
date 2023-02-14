const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 
const ApiFeatures = require('../utils/apifeatures');

//create product -- Admin
// exports.createProduct = async (req,res,next)=>{
//     console.log(req.body);
//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success:true,
//         product
//     })
// }

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    console.log(req.body);
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})


//get all product
exports.getAllProducts = async (req,res,next) => {

    //search query and pagination
    const apifeature = new ApiFeatures(Product.find(),req.query).search();
    const product = await apifeature.query;
    //const product = await Product.find();

    // if(!product){
    //     return next(new ErrorHandler("Product not found",404));
    //     // return res.status(500).json({
    //     //     success:true,
    //     //     message:"Product not found"
    //     // })
    // }

    res.status(200).json({
        success:true,
        product
    })
}

//get product details
exports.getProductDetails = async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

     

    if(!product){
        return next(new ErrorHandler("Product not found",404));
        // return res.status(500).json({
        //     success:true,
        //     message:"Product not found"
        // })
    }

    res.status(200).json({
        success:true,
        product
    })
}

//update product -- Admin
exports.updateProduct = async (req,res,next) =>{
    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}

//Delete Product
exports.deleteProduct = async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
}