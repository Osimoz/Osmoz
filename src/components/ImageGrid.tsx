import React, { useState, useEffect } from 'react';

interface ImageGridProps {
  onImageClick: (index: number) => void;
}

export default function ImageGrid({ onImageClick }: ImageGridProps) {
  const [randomImages, setRandomImages] = useState<number[]>([]);
  
  // Generate array of all image numbers (1-34)
  const allImageNumbers = Array.from({ length: 34 }, (_, i) => i + 1);
  
  // Function to get file name from number
  const getImagePath = (num: number) => {
    const padded = num.toString().padStart(2, '0');
    return `/src/assets/images/${padded}_DSC4${600 + num}-HDR.jpg`;
  };

  useEffect(() => {
    // Select 2 random unique numbers
    const shuffled = [...allImageNumbers].sort(() => 0.5 - Math.random());
    setRandomImages(shuffled.slice(0, 2));
  }, []);

  if (randomImages.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mb-12">
      {randomImages.map((num, index) => (
        <div
          key={num}
          className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => onImageClick(num - 1)}
        >
          <img
            src={getImagePath(num)}
            alt={`Loft Osmoz ${num}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
        </div>
      ))}
    </div>
  );
}