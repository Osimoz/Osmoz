import React, { useState, useEffect } from 'react';

interface BannerSlideshowProps {
  images: { url: string; alt: string }[];
  interval?: number;
  onImageClick?: () => void;
  title?: string;
}

export default function BannerSlideshow({ 
  images, 
  interval = 2000,
  onImageClick,
  title = "osmoz"
}: BannerSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div 
      className="relative h-[70vh] w-full overflow-hidden cursor-pointer" 
      onClick={onImageClick}
    >
      <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
        <h1 className="text-white text-6xl font-light tracking-wide">{title}</h1>
      </div>
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}