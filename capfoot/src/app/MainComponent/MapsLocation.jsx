// src/app/Main Component/CarouselDefault.jsx
import React from 'react';



function MapsLocation() {

  return (

    <div className="flex flex-col justify-center items-center w-auto border-t-[5px] border-b-[5px]  border-gray-900">
      <div className="relative w-full h-96">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13291.790975824406!2d-7.4915642!3d33.6066603!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cb058fffffff%3A0x29a93c8db96cf338!2sCAPLAM!5e0!3m2!1sen!2sma!4v1722009764881!5m2!1sen!2sma"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>

  );
}

export default MapsLocation;
