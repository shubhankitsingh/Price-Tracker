import Hero from '@/compoments/Hero'
import Searchbar from '@/compoments/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCards from '@/compoments/ProductCards'
import Product from '@/lib/models/product.model'

const Home = async () => {  //to use getAllProducts we need to make this async (NEXTjs feature)
    const allProducts =await getAllProducts();
  return (
    <>
    <section className='px-6 md:px-20 py-24 border-2'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='small-text'>
            Smart shopping starts here. Get real-time price alerts and never miss a deal again with Pricely:
            <Image src="/assets/icons/arrow-right.svg" alt="Arrow Right" width={24} height={24} />
          </p>

          <h1 className='head-text'>
            Unleash the Power of <span className='text-primary'> Pricely 
              </span>
          </h1>
          <p className='mt-6'>
            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
          </p>

          <Searchbar/>
        </div>
        <Hero/>

      </div>
    </section>
    <section className='trending-section'>
      <h2 className='section-text'>Trending Now</h2>

      <div className='flex flex-wrap gap-x-8 gapy-y-16'>
        {allProducts?.map((items,index)=>(
          <ProductCards key={items._id} product={items}/>
        ))}
      </div>
    </section>
    </>
  )
}

export default Home