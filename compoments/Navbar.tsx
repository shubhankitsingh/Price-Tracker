import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const nacIcons=[
    {src: "assets/icons/search.svg", alt: "Search"},
    {src: "assets/icons/black-heart.svg", alt: "heart"},
    {src: "assets/icons/user.svg", alt: "User"}

]
const Navbar = () => {
  return (
    <header className='w-full'>
                <nav className="nav">
                    <div className="flex items-center gap-1">
                        <Link href="/" className="flex items-center gap-1">
                            <Image src="/assets/icons/android-bg.png" width={27} height={27} alt="Pricely Logo" />

                            <p className="nav-logo">
                                Price<span className="text-primary">ly</span>
                            </p>
                        </Link>
                    </div>

                    <div className="flex items-center gap-5">
                        {nacIcons.map((icon, index) => (
                            <Image key={index} src={icon.src} width={28} height={28} alt={icon.alt} className="object-contain" />
                        ))}
                    </div>
                </nav>
    </header>
  )
}

export default Navbar