import React from 'react';
import { MapPin, Navigation, Plus, Minus, Share2, Maximize2 } from 'lucide-react';

const LocationMap = ({src}) => {
  return (
    <iframe style={{border : "0", width : '100%',border : "2px solid gray"}} src={src} width="600" height="450"     loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
  );
};

export default LocationMap;