import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

const ImageSlider = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious(e);
    if (e.key === 'ArrowRight') handleNext(e);
    if (e.key === 'Escape') handleClose();
  };

  return (
    <div className="w-full">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            background-color: rgba(0, 0, 0, 0);
          }
          to {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.9);
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .slide-right {
          animation: slideRight 0.3s ease-out forwards;
        }

        .slide-left {
          animation: slideLeft 0.3s ease-out forwards;
        }
      `}</style>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <Image
              height={192}
              width={500}
              src={image?.src}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover cursor-pointer rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transform hover:scale-110 transition-all duration-200 z-50"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 text-white hover:text-gray-300 transform hover:scale-110 transition-all duration-200 z-50"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300 transform hover:scale-110 transition-all duration-200 z-50"
          >
            <ChevronRight size={36} />
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              height={800}
              width={1200}
              src={images[currentIndex]?.src}
              alt={`Image ${currentIndex + 1}`}
              className={`w-full h-full object-contain ${
                slideDirection === 'right' ? 'slide-right' : 'slide-left'
              }`}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
