'use server'
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { connect } from "http2";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl:string){
    // Function to scrape product data from the given URL and store it in the database
    if(!productUrl) return;

    try {
        await connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        
        if(!scrapedProduct) return;

        // else store them in database periodically
        let product: any = scrapedProduct;// define product: any to avoid ts error

        const existingProduct = await Product.findOne({url: scrapedProduct.url});

        if(existingProduct){
            const updatedPriceHistory: any=[...existingProduct.priceHistory,{price: scrapedProduct.currPrice}];

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
                // ERROR average price even after its type is already defined causing error
                // because product type was not defined and ts was not able to infer the type
                // so we defined product as any above

            }
        }
        const newProduct =await Product.findOneAndUpdate(
            {url: scrapedProduct.url},
            product,
            { upsert:true, new:true}
        );

        revalidatePath(`/products/${newProduct._id}`); // revalidate the product page

    } catch (error: any) {
    // 1. Log the full error object to see the stack trace in your console
    console.error("Scraping Error Details:", error);

    // 2. If using Axios, check the response data for specific error messages from the server
    if (error.response) {
        console.error("Server Response Data:", error.response.data);
        console.error("Server Status:", error.response.status);
    }

    throw new Error(`Failed to create/update product: ${error.message}`);
}
}
 // Fetch all the details of the product by ID and display in on the product page
export async function getProductByID(productID:string){
    try {
        await connectToDB();

        const product = await Product.findOne({_id:productID});
        if(!product) return null;

        return product;

    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts(){
    try {
        await connectToDB();

        const products=await Product.find();
        return products;
    } catch (error) {
        console.log(error);
    }
}

export async function getSimilarProducts(productID:string){
    try {
        await connectToDB();

        const currProduct=await Product.findById(productID);
        if(!currProduct) return null;
        const similarProducts= await Product.find({_id: {$ne: productID}, }).limit(3);
        return similarProducts;
    } catch (error) {
        console.log(error);
    }
}

export async function addUserEmailToProduct(productID:string, userEmail:string){
    try {
        const product=await Product.findById(productID);

        if(!product) return;

        const userExists=product.users.some((user:User)=>user.email===userEmail);

        if(!userExists){
            product.users.push({email:userEmail});

            await product.save();
            // Send welcome email to the user
            const emailContent=generateEmailBody(product,"WELCOME");

            await sendEmail(emailContent,[userEmail])
        }
    } catch (error) {
        console.log(error);
    }
}

