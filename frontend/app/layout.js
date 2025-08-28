'use client';

import { useState, useEffect } from 'react'; 
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@headlessui/react';
import { PropertyProvider } from './contexts/PropertyContext'; 
import { MoonIcon, SunIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import './globals.css'; 
import Cookies from 'js-cookie'; 
import Head from 'next/head';
export default function RootLayout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [user, setUser] = useState(false);
    const router = useRouter();
    const isDashboard = pathname.startsWith('/dashboard');

    useEffect(() => {
        setUser(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : false);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleLogout = async () => {
        Cookies.remove('user');
        window.location.href = '/login';
    };
    useEffect(()=>{
        if(document.title===''){
            document.title = "Unitech Holdings Limited - building dreams, shaping futures"
        }
    },[pathname])
    const addFavicon = () => {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = "/logo/Unitech Logo.png";
        document.head.appendChild(link);
      };
    
      // Run the function when the app loads
      if (typeof window !== "undefined") {
        addFavicon();
      }
    
    return (
        <html lang="en" className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]">
            <body className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <PropertyProvider>
                    <header className="bg-white dark:bg-gray-800 shadow-md relative">
                        <div className="container mx-auto px-4 py-3">
                            <div className="flex justify-between items-center">
                                <Link href="/">
                                    <div className="flex items-center">
                                        <Image
                                            src="/logo/Unitech Logo.png"
                                            alt="Unitech Holdings Ltd Logo"
                                            className="w-24 h-auto sm:w-[80px] md:w-[90px]   "
                                            width={150}
                                            height={40}
                                        />
                                        <span className="ml-2 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                                            Unitech Holdings Ltd
                                        </span>
                                    </div>
                                </Link>

                               

                                {/* Desktop Navigation */}
                                <nav className="hidden md:flex items-center space-x-6">
                                    {user && (
                                        <Link
                                            href="/dashboard"
                                            className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        href="/"
                                        className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/properties"
                                        className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        Properties
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        Contact
                                    </Link>
                                    {user ? (
                                        <Button
                                            className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </nav>
                                 {/* Mobile menu button */}
                                 <div className="flex items-center space-x-4">
                                    
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {isOpen ? (
                                            <XMarkIcon className="h-6 w-6" />
                                        ) : (
                                            <Bars3Icon className="h-6 w-6" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                                        aria-label="Toggle dark mode"
                                    >
                                        {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.nav
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg z-50"
                                    >
                                        <div className="flex flex-col space-y-4 p-4">
                                            {user && (
                                                <Link
                                                    href="/dashboard"
                                                    className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                href="/"
                                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Home
                                            </Link>
                                            <Link
                                                href="/properties"
                                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Properties
                                            </Link>
                                            <Link
                                                href="/about"
                                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                About
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Contact
                                            </Link>
                                            {user ? (
                                                <Button
                                                    className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    Logout
                                                </Button>
                                            ) : (
                                                <Link
                                                    href="/login"
                                                    className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Login
                                                </Link>
                                            )}
                                        </div>
                                    </motion.nav>
                                )}
                            </AnimatePresence>
                        </div>
                    </header>

                    {/* Rest of the layout remains the same */}
                    <AnimatePresence mode="wait">
                    {pathname.startsWith('/dashboard') ? (
                        <main key={pathname}>
                            {children} {/* Render without animation */}
                        </main>
                    ) : (
                        <motion.main
                            key={pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children} {/* Render with animation */}
                        </motion.main>
                    )}
                </AnimatePresence>


                    {/* Footer code remains the same */}
                    {!isDashboard && (
                        <footer className="bg-gray-800 text-white py-12">
                            <div className="container mx-auto px-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    <div>
                                        <Image
                                            src="/logo/Unitech Logo.png"
                                            alt="Unitech Holdings Ltd Logo"
                                            width={120}
                                            height={30}
                                        />
                                        <p className="mt-4 text-lg text-gray-400">Redefining urban living since 1999</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                                        <ul className="space-y-2 text-lg">
                                            <li>
                                                <Link href="/about" className="text-gray-400 hover:text-white">
                                                    About Us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/properties" className="text-gray-400 hover:text-white">
                                                    Our Properties
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/contact" className="text-gray-400 hover:text-white">
                                                    Contact Us
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                                        <ul className="space-y-2 text-lg">
                                            <li className="flex items-center">
                                                <PhoneIcon className="h-5 w-5 mr-2" /> +8801757921199
                                            </li>
                                            <li className="flex items-center">
                                                <EnvelopeIcon className="h-5 w-5 mr-2" /> unitechholdingsltd99@gmail.com
                                            </li>
                                            <li>House #57, Road #5, Bonani DOHS, Bonani, Dhaka</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                                        <div className="flex space-x-4">
                                            {/* Add social media links */}
                                            <a href="#" className="text-gray-400 hover:text-white">...</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-lg text-gray-400">
                                    © 2024 Unitech Holdings Ltd. All Rights Reserved
                                </div>
                            </div>
                        </footer>
                    )}
                </PropertyProvider>
            </body>
        </html>
    );
}