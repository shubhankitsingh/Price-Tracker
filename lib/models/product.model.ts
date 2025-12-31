import mongoose from "mongoose";

//Schema
const productSchema = new mongoose.Schema({
    url:{type:String, required: true, unique:true},
    currency :{type:String, required:true},
    image :{type:String, required:true},
    title :{type:String, required:true},
    currPrice :{type:Number, required:true},
    originalPrice :{type:Number, required:true},
    priceHistory :[
        {
            price:{type:Number, required: true},
            date :{type:Date, default: Date.now}
    },
        
    ],
    lowestPrice :{type:Number},
    highestPrice :{type:Number},
    averagePrice :{type:Number},
    discountRate :{type:Number},
    description: {type:String},
    category:{type:String},
    reviewsCount:{type:Number},
    isOutOfStock:{type:Boolean, default:false},
    users:[
        {
            email:{type:String, required:true}
        }
    ], default :[],
}, {timestamps:true}); // to keep track of createdAt and updatedAt time


const Product =mongoose.models.Product || mongoose.model('Product',productSchema); 
// const products = Product
//   .find()
//   .sort({ _id: -1 }); 

export default Product;
