import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const AnimatedImageLightbox = ({ property }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Thumbnail Image */}
      <div className="overflow-hidden rounded-lg">
        <Image
          key={1}
          src={property.image}
          alt="Thumbnail image"
          width={800}
          height={600}
          quality={100}
          priority
          className="rounded-lg object-contain mx-auto w-full sm:w-[50vw] h-[30vh] sm:h-[50vh] cursor-pointer hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 50vw"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Animated Lightbox */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/0 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setIsOpen(false)}
          style={{
            animation: 'fadeIn 0.3s ease-out forwards'
          }}
        >
          <style jsx global>{`
            @keyframes fadeIn {
              from {
                background-color: rgba(0, 0, 0, 0);
              }
              to {
                background-color: rgba(0, 0, 0, 0.9);
              }
            }
            
            @keyframes scaleIn {
              from {
                transform: scale(0.9);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }

            .scale-in {
              animation: scaleIn 0.3s ease-out forwards;
            }
          `}</style>

          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-full sm:max-w-[90vw] max-h-full sm:max-h-[90vh] relative scale-in px-4"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={property.image}
              alt="Fullscreen image"
              width={1920}
              height={1080}
              quality={100}
              className="object-contain w-auto h-auto max-w-full sm:max-w-[90vw] max-h-full sm:max-h-[90vh] rounded-lg"
              sizes="(max-width: 640px) 100vw, 90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedImageLightbox;
