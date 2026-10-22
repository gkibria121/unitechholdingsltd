import React from 'react';
import { MapPin, Navigation, Plus, Minus, Share2, Maximize2 } from 'lucide-react';

const LocationMap = ({src}) => {
  if (!src) return null;
  const match = typeof src === 'string' && src.match(/src=["']([^"']+)["']/);
  const actualSrc = match ? match[1] : src;

  return (
    <iframe
      style={{border : "0", width : '100%',border : "2px solid gray"}}
      src={actualSrc}
      width="600"
      height="450"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default LocationMap;