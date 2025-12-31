import mongoose from 'mongoose';

let isConnected =false; // variable to track the connection status

export const connectToDB =async() => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not connected');

    if(isConnected) return console.log('Using existing database connection');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected =true;
        console.log('New database connection established');
    } catch (error) {
        console.log(error);
    }
}