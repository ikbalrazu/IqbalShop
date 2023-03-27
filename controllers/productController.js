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
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})


//get all product
exports.getAllProducts = async (req,res,next) => {

    //search query and pagination
    const resultPerPage = 7;
    const productCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apifeature.query;
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
        products,
        productCount,
        resultPerPage,
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

//Create new review or update the review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

    const {ratings, comment, productId} = req.body;

    console.log(req.user._id);

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(ratings),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(

        (rev) => rev.user.toString() === req.user._id.toString()
        
        );

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
                (rev.rating = ratings), (rev.comment = comment);
            
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    //4, 5, 5,2 = 16/4 = 4

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
});
  
  // Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
});