'use client'

import { usePropertyContext } from '../contexts/PropertyContext'
import Image from 'next/image'
import Link from 'next/link' 

export default function Properties() {
    const { filteredProperties, filter, setFilter } = usePropertyContext()
    
    // Ensure filteredProperties is an array, even if it's undefined
    const properties = Array.isArray(filteredProperties) ? filteredProperties : []
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Our Properties</h1>

            {/* Filter Section */} 
            <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"> 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     
                     <div className= {`p-1 border rounded-md text-center cursor-pointer ${filter==='ongoing'?"bg-gray-500 text-white": ""}`  }  onClick={()=>{setFilter('ongoing')}} >
                        Ongoing
                     </div>
                     <div className= {`p-1 border rounded-md text-center cursor-pointer ${filter==='upcoming'?"bg-gray-500 text-white": ""}`  }   onClick={()=>{setFilter('upcoming')}} >
                     Upcoming
                     </div>
                     <div className= {`p-1 border rounded-md text-center cursor-pointer ${filter==='successfully-delivered'?"bg-gray-500 text-white": ""}`  }   onClick={()=>{setFilter('successfully-delivered')}} >
                      Previous Projects
                     </div>
                      
                     
                </div>
            </div>

            {/* Property Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map(property => (
                    <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <Image
                            src={property.image}
                            alt={property.name}
                            width={400}
                            height={300}
                            className="w-full h-48 object-contain"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{property.name}</h3> 
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{property.address}</p>
                            {/* <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">${property.price.toLocaleString()}</p> */}
                            <Link href={`/properties/${property.id}`} className="block text-center bg-blue-600 text-white text-lg px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {properties.length === 0 && (
                <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
                    <p className="text-2xl">No properties found matching your criteria.</p>
                    <p className="mt-2">Try adjusting your filters to see more results.</p>
                </div>
            )}
        </div>
    )
}