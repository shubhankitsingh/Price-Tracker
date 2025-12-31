import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url: string){

    if(!url) return;

    // BightData proxy configuration
    
    const username =String(process.env.BRIGHT_DATA_USERNAME);
    const password =String (process.env.BRIGHT_DATA_PASSWORD); 
    const port= 33335;
    const session_id= (1000000 * Math.random()) |0 ;
    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password : password,
        },
        host : 'brd.superproxy.io',
        port: port,
        rejectUnauthorized: false // to ignore SSL certificate errors
    }
    try {
        // Fetch the product page
        const response =await axios.get(url,options);
        const $ = cheerio.load(response.data); // initialize cheerio with the HTML response

        // // Extract the product title
        const title = $('#productTitle').text().trim();
        const currPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        );
        

        const originalPrice= extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )

        const images= $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image'); // attribute give URL of the image

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol')) || (url.includes('.com') ? '$' : '₹');
                     
        const discountRate=$('.savingsPercentage').text().replace(/[-%]/g,"");
        
        const description= extractDescription($)
        //Required scraped data
        const data={
            url,
            currency:  currency,
            image: imageUrls[0],
            title,
            currPrice: Number(currPrice.replace(/[₹,]/g, '')) || Number(originalPrice.replace(/[₹,]/g, '')),
            originalPrice: Number(originalPrice.replace(/[₹,]/g, '')) || Number(currPrice.replace(/[₹,]/g, '')),
            priceHistory:[],
            discountRate: Number(discountRate),
            category: '',
            reviewsCount: 100,
            stars:4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currPrice.replace(/[₹,]/g, '')) || Number(originalPrice.replace(/[₹,]/g, '')),
            highestPrice:Number(originalPrice.replace(/[₹,]/g, '')) || Number(currPrice.replace(/[₹,]/g, '')),
            averagePrice: Number(originalPrice.replace(/[₹,]/g, '')) || Number(currPrice.replace(/[₹,]/g, '')),
        }
        return data;

        
        
    } catch (error: any) {
        throw new Error(`Failed to scrape product : ${error.message}`)
    }

}