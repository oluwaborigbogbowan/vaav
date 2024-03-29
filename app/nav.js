'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";


function Nav({ basket }) {



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <div className='nav flex justify-between  items-center h-[64px] w-full px-5 md:px-7 fixed bg-white z-10'>
        <Link href="/#home" className='w-[118px] justify-self-start'>
            <img src='/illustrations/logo-vaav.png' alt="logo" className='w-full' />
        </Link>
        <div className='flex justify-self-end'>
        <Link href="/checkout" className='md:hidden text-base font-normal flex mr-3'>
        <TiShoppingCart className=' text-2xl'/>
        {/* <div className='bg-primary absolute top-[16px] right-[50px] w-4 h-4  rounded-[100%] flex justify-center items-center'>
        <span className=' text-white '>{basket}</span>
        </div> */}
        </Link>
        <div className='menu__icon text-primary md:hidden cursor-pointer' onClick={handleClickOpen}>< MenuIcon fontSize='medium' /></div>
        </div>
      <nav className='hidden md:flex justify-center items-center justify-self-center'>
        <Link href='/#home' className=' no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Home</Link>
        <Link href='/#features' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Features</Link>
        <Link href='/#team' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Our Team</Link>
        <Link href='/#testimonial' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Testimonial</Link>
        <Link href="/products" className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Products</Link>
        <Link href="/audit" className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Energy Audit</Link>
      </nav>
      <div className='md:flex gap-3 hidden '>
        <Link href="/#home" className='flex text-base font-normal ' >
        <IoIosHelpCircleOutline className=' text-2xl'/>
        Help
        </Link>
        <Link href="/checkout" className='flex text-base font-normal '>
        <TiShoppingCart className=' text-2xl mr-[2px]'/>
        {/* <div className='bg-primary absolute top-[16px] right-[60px] w-4 h-4 rounded-[100%] flex justify-center items-center'>
        <span className=' text-white '>{basket ? basket.length : 0}</span>
        </div> */}
        Cart
        </Link>
      </div>
    </div>
    <div className={`mobile__container w-full h-full  z-20 fixed overflow-hidden bg-opacity-50 bg-black ${open? '' : 'hidden'}`}>
      <div className="mobile__nav  bg-white fixed  w-[85%] h-full px-8 pt-5">
        <div onClick={handleClose}>
        <CloseIcon className='relative right-[-233px] '/>
        </div>
        <nav className='flex flex-col mt-[65px] ' onClick={handleClose}>
          <Link href='/#home' className=' no-underline  text-base font-normal px-6 cursor-pointer leading-tight active:text-[#FFA740] mb-[15px] pl-0 text-primary'>Home</Link>
          <hr className='w-full bg-grey'/>
          <Link href='/#features' className='no-underline text-primary text-base font-normal px-6 cursor-pointer leading-tight active:text-[#FFA740] mb-[15px] mt-[15px] pl-0'>Features</Link>
          <hr className='w-full bg-grey'/>
          <Link href='/#team' className='no-underline text-primary text-base font-normal px-6 cursor-pointer leading-tight active:text-[#FFA740] mb-[15px] mt-[15px] pl-0'>Our Team</Link>
          <hr className='w-full bg-grey'/>
          <Link href='/#testimonial' className='no-underline text-primary text-base font-normal px-6 cursor-pointer leading-tight active:text-[#FFA740] mb-[15px] mt-[15px] pl-0'>Testimonial</Link>
          <hr className='w-full bg-grey'/>
          <Link href="/products" className='no-underline text-primary text-base font-normal px-6 cursor-pointer leading-tight active:text-[#FFA740] mb-[15px] mt-[15px] pl-0'>Products</Link>
          <hr className='w-full bg-grey'/>
          <Link href="/audit" className='no-underline text-primary text-base font-normal px-6 cursor-pointer leading-tight active:text-[#FFA740] mb-[15px] mt-[15px] pl-0'>Energy Audit</Link>
          <hr className='w-full bg-grey'/>
        </nav>
      </div>
    </div>  
    </>
  )
}

export default Nav
