'use client';
import Image from 'next/image'
import Link from 'next/link'
import { usePropertyContext } from './contexts/PropertyContext'
import Properties from './properties/page';
import Head from "next/head";
export default function Home() {
  const {  filter,setFiletr,ongoingProperties } = usePropertyContext();
  
  return (
      <div>
        {/* Hero Section */}
        <section className="relative h-[80vh]">
          <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Luxury Property" fill style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Welcome to Unitech Holdings Ltd.</h1>
              <p className="text-2xl text-gray-200 mb-8">Building Dreams, Shaping Futures</p>
              <div className="flex justify-center space-x-4">
                <Link href="/properties" className="bg-blue-600 text-white text-xl px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300">View Properties</Link>
                <Link href="/contact" className="bg-white text-gray-800 text-xl px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">Ongoing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {ongoingProperties&&ongoingProperties.map((project, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                    <Image src={project.image} alt={project.name} width={400} height={300} className="w-full h-64 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{project.name}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{project.address}</p>
                      <Link href={`/properties/${project.id}`}  className="block text-center bg-blue-600 text-white text-lg px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300" onClick={()=>{setFiletr('ongoing')}}>
                        Learn More
                      </Link>
                    </div>

                  </div>
              ))}
            </div>
          </div>
            <div className='flex justify-center mt-10'>
            <Link href={"/properties"} className='text-center px-10 py-2 bg-green-500 text-white border rounded-3xl text-xl hover:scale-110 hover:translate-y-[-10%]'>Load More</Link>
            </div>
         
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Why Choose Unitech Holdings Ltd?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'Client Satisfaction', description: 'Over 10,000 happy homeowners', icon: '👨‍👩‍👧‍👦' },
                { title: '25 Years of Excellence', description: 'Trusted name in real estate since 1999', icon: '🏆' },
                { title: 'Quality Assurance', description: 'ISO 9001:2015 Certified for quality management', icon: '✅' },
                { title: 'On-Time Delivery', description: 'Over 200 units delivered on schedule', icon: '🕒' },
                { title: 'Premium Construction', description: 'Using only the finest materials', icon: '🏗️' },
                { title: 'Ethical Practices', description: 'Transparency in all our dealings', icon: '🤝' },
              ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105">
                    <div className="text-5xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-xl text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="text-2xl mb-8">Let us help you discover the perfect property for you and your family.</p>
            <Link href="/contact" className="bg-white text-blue-600 text-xl px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300">
              Contact Us Today
            </Link>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Explore Our Latest Projects</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Discover our newest developments and find the perfect home that suits your lifestyle. From urban apartments to suburban villas, we have something for everyone.
                </p>
                <Link href="/properties" className="bg-blue-600 text-white text-xl px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                  View All Projects
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Project 1" width={300} height={200} className="rounded-lg shadow-md" />
                <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Project 2" width={300} height={200} className="rounded-lg shadow-md" />
                <Image src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Project 3" width={300} height={200} className="rounded-lg shadow-md" />
                <Image src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Project 4" width={300} height={200} className="rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}