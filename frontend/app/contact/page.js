'use client'

import { useState } from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        // Reset form after submission
        setFormData({ name: '', email: '', phone: '', message: '' })
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">Get in Touch</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                        We&#39;re here to help and answer any question you might have. We look forward to hearing from you.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <PhoneIcon className="h-8 w-8 text-blue-600 mr-2" />
                            <span className="text-xl text-gray-600 dark:text-gray-300">+8801757921199</span>
                        </div>
                        <div className="flex items-center">
                            <EnvelopeIcon className="h-8 w-8 text-blue-600 mr-2" />
                            <span className="text-xl text-gray-600 dark:text-gray-300">unitechholdingsltd99@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="h-8 w-8 text-blue-600 mr-2" />
                            <span className="text-xl text-gray-600 dark:text-gray-300">House #57, Road #5, Bonani DOHS, Bonani, Dhaka</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            ></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}