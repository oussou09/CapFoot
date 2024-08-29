import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { StadContext } from './StadContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing icons

function formatStadiumCapacity(stadium_many) {
  if (stadium_many === "5/5") {
    return "5 Person";
  } else if (stadium_many === "7/7") {
    return "7 Person";
  } else {
    return stadium_many;
  }
}

function CarouselDefault() {
  const { stadiums } = useContext(StadContext);

  const handleScroll = () => {
    const element = document.getElementById('CardsStadiums');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="dark:bg-gray-800 bg-white relative overflow-hidden h-auto">
      <div className="bg-white dark:bg-gray-800 flex flex-col sm:flex-row relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-start items-center relative pt-10">
          <div id="Details" className="w-full sm:w-2/3 lg:w-2/5 flex flex-col items-start relative z-20 mr-0 sm:mr-10 mb-8 sm:mb-0">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-6"></span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col items-start leading-none dark:text-white text-gray-800">
              Be on
              <span className="text-5xl sm:text-7xl">Time</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-4">
                A platform designed to streamline stadium management, empowering users to seamlessly explore and reserve resources, delivering an intuitive and engaging experience with unparalleled convenience.
            </p>
            <div className="flex mt-8">
              <Link to="/about" className="uppercase py-2 px-4 rounded-lg bg-gray-500 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-600">
                <span className="font-broken tracking-wider">Read More</span>
              </Link>
              <Link onClick={handleScroll} className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-gray-500 text-gray-500 dark:text-white hover:bg-gray-500 hover:text-white text-md">
                <span className="font-broken tracking-wider">Take Hour</span>
              </Link>
            </div>
          </div>
          <div className=" hidden lg:flex w-full sm:w-1/3 lg:w-3/5 relative">
            <div className="max-w-2xl mx-auto py-12 w-full">
              <div id="default-carousel" className="relative rounded-lg overflow-hidden shadow-lg">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                  pagination={{ clickable: true }}
                >
                  {stadiums.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex items-center justify-center w-full h-80 md:h-96">
                        <img
                          src={`http://127.0.0.1:8000/storage/${slide.path}`}
                          className="object-cover w-full h-full"
                          alt={`Slide ${index + 1}`}
                        />
                        <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl font-bold text-[#F3F5F6] md:text-3xl dark:text-gray-800">
                          {slide.stadium_name}
                        </span>
                        <span className="absolute bottom-11 left-1/2 transform -translate-x-1/2 text-xl font-bold text-[#F3F5F6] md:text-3xl dark:text-gray-800">
                          {formatStadiumCapacity(slide.stadium_many)}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Navigation buttons */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <div className="custom-prev cursor-pointer text-white p-3 rounded-full z-50">
                    <FaChevronLeft size={40} />
                  </div>
                  <div className="custom-next cursor-pointer text-white p-3 rounded-full z-50">
                    <FaChevronRight size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarouselDefault;
