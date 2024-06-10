import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/googleapi/photos`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="gallery" className="relative bg-gradient-to-r from-purple to-off-white text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Gallery</h2>
        <div className="relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
          <div className="absolute top-0 bottom-0 left-0 flex flex-nowrap transition-transform duration-700" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {photos.map((photo, index) => (
              <div key={index} className="hs-carousel-slide flex justify-center items-center h-full w-full bg-gray-100 p-6">
                <img src={`${photo.baseUrl}=w600-h400`} alt={photo.filename} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
          <button type="button" onClick={prevSlide} className="absolute inset-y-0 left-0 flex justify-center items-center w-12 h-full text-gray-800 hover:bg-gray-800/10 rounded-s-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
          <button type="button" onClick={nextSlide} className="absolute inset-y-0 right-0 flex justify-center items-center w-12 h-full text-gray-800 hover:bg-gray-800/10 rounded-e-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l7-7-7-7" />
            </svg>
            <span className="sr-only">Next</span>
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {photos.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-700 border-blue-700' : 'bg-gray-400'}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
