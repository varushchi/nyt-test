import Image from 'next/image'
import React from 'react'

export default function Header({hanleClick}: {hanleClick: () => void}) {
  return (
    <nav className="w-full flex items-center relative border-b-[1px] border-b-[#EDEDED] h-[72px]">
      <div className="absolute left-0">
        <button className='cursor-pointer border-0' onClick={hanleClick}>
          <Image
            src="/hamburgerbar.svg"
            alt="menu"
            width={20}
            height={16}
          />
        </button>
      </div>
      <h1 className="text-[24px] font-[700] tracking-[0.1em] mx-auto">OUTSIDER</h1>
    </nav>
  )
}
