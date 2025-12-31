'use client'

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent } from 'react'
import { useState } from 'react'
 // Function to validate Amazon product URL
const isValidAmazonProductURL = (url : string) => {
    try {
        const parsedURL = new URL(url);
        const hostname= parsedURL.hostname.toLowerCase();

        if(hostname.includes('amazon.') || hostname.endsWith('amazon')){
            return true;
        }


    } catch(error){
        return false;
    }
}

const Searchbar = () => {

    const [searchPrompt, setSearchPrompt] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit= async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload on form submission

        const isValidURL = isValidAmazonProductURL(searchPrompt);

        if(!isValidURL) return alert('Please enter a valid Amazon product link.');

        try {
            setIsLoading(true);
            //Scrape the product using the provided URL
            const product = await scrapeAndStoreProduct(searchPrompt);
            
        } catch (error) {
            
        } finally{
            setIsLoading(false);
        } // either way try or catch but aat last loading should stop


    }
  return (
    <form 
    className='flex flex-wrap gap-4 mt-12'
    onSubmit={handleSubmit}
    >
        <input 
            type='text'
            value={searchPrompt}
            onChange={(e)=> setSearchPrompt(e.target.value)}
            placeholder='Enter product link'
            className='searchbar-input'
        />
        
        
        <button type='submit' className='searchbar-btn' disabled={searchPrompt === '' }> {/* disable button if input(search) is empty */}
            {isLoading?'Searching...' : 'Search'}
        </button>

    </form>
  )
}

export default Searchbar