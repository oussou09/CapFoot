import React from 'react';
import CountUp from './ExternFun/CountFun.jsx';


export default function About() {
    return(
        <div className="bg-white cursor-default ">


  <section className="text-center py-12 px-4">
    <h2 className="text-2xl font-bold pt-10">Mission And Values</h2>
    <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
      Our mission is to provide exceptional stadium booking services with a focus on availability, reliability, and support.
    </p>
    <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
      <div className="transition transform hover:scale-110">
        <CountUp end={2000} duration={500} />
        <p className="text-gray-700">Stadiums</p>
      </div>
      <div className="transition transform hover:scale-110">
        <CountUp end={10000} duration={500} />
        <p className="text-gray-700">Happy Customers</p>
      </div>
    </div>
  </section>

  <section className="bg-black bg-opacity-70 text-white py-12 px-4">
    <h2 className="text-2xl font-bold text-center">Our Vision</h2>
    <p className="mt-4 text-center max-w-2xl mx-auto">
      We aim to revolutionize the stadium booking industry by making quality facilities accessible to everyone, anytime, anywhere.
    </p>
  </section>

  <section className="text-center py-12 px-4">
    <h2 className="text-2xl font-bold">Our Services</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Easy Booking</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Affordable Prices</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Customer Support</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Flexible Hours</h3>
      </div>
    </div>
  </section>

  <section className="bg-gray-100 py-12 px-4">
    <h2 className="text-2xl font-bold text-center">Modern Facilities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
      <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold">High-Quality Fields</h3>
        <p className="text-gray-700 mt-2">Our stadiums are equipped with top-notch fields to ensure the best playing experience.</p>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold">Advanced Booking System</h3>
        <p className="text-gray-700 mt-2">Easily book your preferred time slots with our advanced online system.</p>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold">Comprehensive Amenities</h3>
        <p className="text-gray-700 mt-2">Enjoy a range of amenities to make your experience comfortable and enjoyable.</p>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold">Secure and Safe</h3>
        <p className="text-gray-700 mt-2">Our facilities are secure and well-maintained for your safety and peace of mind.</p>
      </div>
    </div>
  </section>

  <section className="text-center py-12 px-4">
    <h2 className="text-2xl font-bold">Committed To Your Enjoyment</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
      <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Book Now</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">24/7 Support</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Special Offers</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
        <h3 className="text-xl font-bold">Get Started</h3>
      </div>
    </div>
  </section>

  <section className="bg-black bg-opacity-70 text-white text-center py-12 px-4">
    <h2 className="text-2xl font-bold">Customer Testimonials</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-500 transition-colors">
        <p>"Fantastic service and excellent facilities. Highly recommend!"</p>
        <h3 className="mt-4 font-bold">- Customer A</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-500 transition-colors">
        <p>"Easy booking process and great customer support."</p>
        <h3 className="mt-4 font-bold">- Customer B</h3>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-500 transition-colors">
        <p>"Enjoyed every moment. Will book again!"</p>
        <h3 className="mt-4 font-bold">- Customer C</h3>
      </div>
    </div>
  </section>

  <section className="text-center py-12 px-4 w-full">
    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
    <div className="mt-8">
      <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
        <h3 className="text-xl font-bold">How do I book a stadium?</h3>
        <p className="mt-2 text-gray-700">You can book a stadium online through our website or mobile app.</p>
      </div>
      <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
        <h3 className="text-xl font-bold">What facilities are available?</h3>
        <p className="mt-2 text-gray-700">We offer a variety of facilities including locker rooms, showers, and more.</p>
      </div>
      <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
        <h3 className="text-xl font-bold">Is there customer support?</h3>
        <p className="mt-2 text-gray-700">Yes, we offer 24/7 customer support to assist you with any queries.</p>
      </div>
    </div>
  </section>
  <footer className="bg-gray-700 text-white text-center py-4 md:py-6 lg:py-8">
  <p className="text-sm md:text-base lg:text-lg">
    &copy; Copyright CapFoot 2024. All rights reserved. Made By Oussama.
  </p>
</footer>
</div>

    )

}
