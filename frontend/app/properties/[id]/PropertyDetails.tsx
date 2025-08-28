"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ImageSlider from './ImageSlider'
import LocationMap from './LocationMap';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalculatorIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { usePropertyContext } from "@/app/contexts/PropertyContext";
import AnimatedImageLightbox from './ImageWithLightBox'
import HorizontalImageSlider from './HorizontalImageSlider'
import PropertyInfo from './PropertyInfo'

export default function PropertyDetails({ property }) {
  const { recentlyViewed, addToRecentlyViewed, properties } = usePropertyContext();

  useEffect(() => {
    addToRecentlyViewed(property.id);
  }, [property.id, addToRecentlyViewed]);

  function convertToTitleCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <AnimatedImageLightbox property={property}/>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <motion.div
                className="lg:col-span-2 mt-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">{property.name}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 flex items-center">
                  <MapPinIcon className="h-6 w-6 mr-2 text-blue-500" />
                  {property.address}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{property.description}</p>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Status</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {convertToTitleCase(property.status)}
                </span>
                </div>
                {property.features && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Features</h3>
                      <ul className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                        {property.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                        ))}
                      </ul>
                    </div>
                )}
              </div>
            </motion.div>
            <PropertyInfo className="lg:mt-4" propertyDetails={property.details} />
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Location</h3>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <LocationMap src={property.iframe} />
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Feature Images</h3>
            <ImageSlider images={property.images} />
          </motion.div>

          {property.plans && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-12"
              >
                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Floor Plans</h3>
                <HorizontalImageSlider images={property.plans}/>
              </motion.div>
          )}

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex justify-center space-x-4 mt-12 mb-8"
          >
            <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              <ShareIcon className="h-5 w-5 mr-2" /> Share
            </button>
            <button className="flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 transform hover:scale-105">
              <CalculatorIcon className="h-5 w-5 mr-2" /> Download Info
            </button>
            <button className="flex items-center bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition duration-300 transform hover:scale-105">
              <BookmarkIcon className="h-5 w-5 mr-2" /> Save
            </button>
          </motion.div>

          {recentlyViewed.length > 0 && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="mt-16"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Recently Viewed</h2>
                <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
                  {recentlyViewed.map((id) => {
                    const recentProperty = properties.find((p) => p?.id === id);
                    if (!recentProperty) return null;
                    return (
                        <motion.div
                            key={id}
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                        >
                          <Image
                              src={recentProperty.image}
                              alt={recentProperty.name}
                              width={288}
                              height={192}
                              className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{recentProperty.name}</h3>
                            <Link href={`/properties/${id}`} className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition duration-300">
                              View Details
                            </Link>
                          </div>
                        </motion.div>
                    );
                  })}
                </div>
              </motion.div>
          )}
        </div>
      </div>
  );
}

