import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className='flex flex-col items-center gap-[15px] mt-[30px]'>
      <div className='flex gap-[10px]'>
        <p>Log In</p>
        <p>About Us</p>
        <p>Publishers</p>
        <p>Sitemap</p>
      </div>
      <div className='flex flex-col gap-[5px]'>
        <p>Powered by</p>
        <Image
          src='/newsapi.png'
          alt='newsapi'
          width={84}
          height={25}
        />
      </div>
      <p>© 2023 Outsider. Inspired by Insider</p>
    </footer>
  )
}
