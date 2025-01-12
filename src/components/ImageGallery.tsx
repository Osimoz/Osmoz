import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useKeyPress } from '../hooks/useKeyPress';
import type { Image } from '../types';

interface ImageGalleryProps {
  images: Image[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageGallery({ 
  images, 
  initialIndex, 
  isOpen, 
  onClose 
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useKeyPress({ key: 'Escape', callback: onClose, enabled: isOpen });
  useKeyPress({ key: 'ArrowLeft', callback: handlePrevious, enabled: isOpen });
  useKeyPress({ key: 'ArrowRight', callback: handleNext, enabled: isOpen });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close gallery"
      >
        <X className="h-8 w-8" />
      </button>
      
      <button
        onClick={handlePrevious}
        className="absolute left-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        loading="lazy"
      />
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}