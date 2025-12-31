
import { EmailContent, EmailProductInfo, NotificationType } from '@/types';
import nodemailer from 'nodemailer';
 
//Notification types
export const THRESHOLD_PERCENTAGE=50;
export const Notification={
    WELCOME:"WELCOME",
    CHANGE_OF_STOCK:"CHANGE_OF_STOCK",
    LOWEST_PRICE:"LOWEST_PRICE",
    THRESHOLD_MET:"THRESHOLD_MET", //price dropped at specific level
}

export const generateEmailBody =(product: EmailProductInfo, type: NotificationType): any =>{
    const shortenedTitle= product.title.length > 25 ? product.title.slice(0,25)+'...' : product.title;

    let subject="";
    let body="";

    switch(type){
        case Notification.WELCOME:
            subject=`Welcome to Pricely! Start tracking ${shortenedTitle}`;
            body=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="https://your-logo-url.com/logo.png" alt="Pricely Logo" style="max-width: 150px;">
                    </div>
                    <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome to Pricely! 🎉</h1>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for choosing Pricely to track your product prices. You're now set to receive real-time price alerts and updates.
                    </p>
  
                    <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">You're tracking:</h2>
                    <p style="color: #007bff; font-size: 16px; font-weight: bold; margin-bottom: 20px;">
                        <a href="${product.url}" style="color: #007bff; text-decoration: none;">${shortenedTitle}</a>
                    </p>
                    <div style="text-align: center;">
                        <a href="${product.url}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Product</a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
                        Happy Shopping!<br>
                        The Pricely Team
                    </p>
                </div>
            </div>`;
            break;

        case Notification.CHANGE_OF_STOCK:
            subject=`Stock Update: ${shortenedTitle} is back in stock!`;
            body=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="https://your-logo-url.com/logo.png" alt="Pricely Logo" style="max-width: 150px;">
                    </div>
                    <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Great News! 📦</h1>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        The product you've been tracking is now back in stock! Don't miss out on this opportunity.
                    </p>
                    
                    <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">${shortenedTitle}</h2>
                    <p style="color: #007bff; font-size: 16px; margin-bottom: 20px;">
                        <a href="${product.url}" style="color: #007bff; text-decoration: none;">View Product Details</a>
                    </p>
                    
                    <div style="text-align: center;">
                        <a href="${product.url}" style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Buy Now</a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
                        Stay tuned for more updates!<br>
                        The Pricely Team
                    </p>
                </div>
            </div>`;
            break;

        case Notification.LOWEST_PRICE:
            subject=`Lowest Price Alert: ${shortenedTitle}!`;
            body=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="https://your-logo-url.com/logo.png" alt="Pricely Logo" style="max-width: 150px;">
                    </div>
                    <h1 style="color: #28a745; text-align: center; margin-bottom: 20px;">Lowest Price Alert! 💰</h1>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Great news! The product you're tracking has reached its lowest price ever. This is the best time to buy!
                    </p>
                    
                    <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">${shortenedTitle}</h2>
                    <p style="color: #007bff; font-size: 16px; margin-bottom: 20px;">
                        <a href="${product.url}" style="color: #007bff; text-decoration: none;">Check it out now</a>
                    </p>
                  
                    <div style="text-align: center;">
                        <a href="${product.url}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Grab the Deal!</a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
                        Prices can change quickly - act fast!<br>
                        The Pricely Team
                    </p>
                </div>
            </div>`;
            break;

        case Notification.THRESHOLD_MET:
            subject=`Price Alert: ${shortenedTitle} dropped below your threshold!`;
            body=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="https://your-logo-url.com/logo.png" alt="Pricely Logo" style="max-width: 150px;">
                    </div>
                    <h1 style="color: #ff6b35; text-align: center; margin-bottom: 20px;">Price Threshold Alert! 🚨</h1>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        The price of the product you're tracking has dropped below your set threshold. It's time to make your move!
                    </p>
                   
                    <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">${shortenedTitle}</h2>
                    <p style="color: #007bff; font-size: 16px; margin-bottom: 20px;">
                        <a href="${product.url}" style="color: #007bff; text-decoration: none;">View Product Now</a>
                    </p>
                    
                    <div style="text-align: center;">
                        <a href="${product.url}" style="background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Buy Now</a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
                        Don't miss this opportunity!<br>
                        The Pricely Team
                    </p>
                </div>
            </div>`;
            break;
    }

    return { subject, body };
}
// Create a transporter using Gmail SMTP
// Microsoft has disabled basic auth for personal Outlook accounts, so use Gmail instead.
// Steps to set up Gmail:
// 1. Go to https://myaccount.google.com/security
// 2. Enable 2-Step Verification
// 3. Go to https://myaccount.google.com/apppasswords
// 4. Create an App Password for "Mail"
// 5. Add to .env: EMAIL_USER=your-gmail@gmail.com
// 6. Add to .env: EMAIL_PASSWORD=your-16-char-app-password (no spaces)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export async function sendEmail(EmailContent: EmailContent, sendTo: string[]){
    const mailOptions={
        from: process.env.EMAIL_USER,
        to: sendTo,
        html: EmailContent.body,
        subject: EmailContent.subject,
    }
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}