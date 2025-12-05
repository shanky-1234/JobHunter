import React from 'react'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import Badge from '../shared/Badge'
import { Button } from '../ui/button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const category = [
    "Fullstack Developer",
    "UI/UX Designer",
    "AI Engineer",
    "Data Science",
    "DevOps Engineer",
    "Project Manager"
]

function CategoryCarousel() {

  const swiperRef = useRef(null); 
    
  return (
    <section className=' p-6 relative'>
    <div className='mx-[80px] text-center space-y-2'>
        <h2 className='text-3xl font-bold'>Trending Jobs</h2>
        <p>Start Searching for your trending jobs</p>
    </div>
    <div className='mt-6 flex justify-center gap-4 items-center w-full'>
         <Button className={'hidden rounded-full bg-blue-400 md:block flex-shrink-0'} onClick={() => swiperRef.current?.slidePrev()}><FaChevronLeft/></Button>
         <div className='w-1/2'>
       <Swiper
       onSwiper={(swiper) => (swiperRef.current = swiper)}
      slidesPerView={1} // default (mobile first)
  spaceBetween={10}
  breakpoints={{
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}
    ref={swiperRef}
  modules={[Pagination]}
  className="mySwiper">
            {
                category.map((item,index)=>{
                    return <SwiperSlide key={index}><Badge key={index} content={item}/></SwiperSlide>
                })
            }
       </Swiper>
       </div>
       <Button className={'hidden md:block rounded-full bg-blue-400 flex-shrink-0'}  onClick={() => swiperRef.current?.slideNext()}><FaChevronRight/></Button>
    </div>
    </section>
  )
}

export default CategoryCarousel