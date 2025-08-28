"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const PropertyContext = createContext();
// Property details structure

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const initialProperties = [
    {
      id: 4,
      name: "Luxurious Waterfront Villa",
      type: "Villa",
      status: "ongoing",
      price: 1250000,
      image: "/img/project1.jpg",
      address: "123 Oceanview Drive, Coastal City, State 12345",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 3500,
      description:
        "Experience luxury living in this stunning waterfront villa. Featuring breathtaking ocean views, a private pool, and high-end finishes throughout, this property is perfect for those seeking the ultimate in comfort and style.",
      features: ["Ocean View", "Private Pool", "Gourmet Kitchen", "Home Theater", "Smart Home System"],
      images: [
        "/img/project1.jpg",
        "/img/project2.jpg",
        "/img/project3.jpg",
        "/img/project4.jpg",
        "/img/project5.jpg",
        "/img/project6.jpg",
        "/img/project7.jpg",
        "/img/project8.jpg",
        "/img/project9.jpg",
      ],
      plans: ["/img/floor1.jpg", "/img/floor2.jpg"],

      details: [
        {
          icon: "📍",
          label: "Address",
          value: "Plot # 17/A, Road # 126, Gulshan",
        },
        {
          icon: "📏",
          label: "Land Area",
          value: "6.43 Katha",
        },
        {
          icon: "🏢",
          label: "No. of Floors",
          value: "G + 9",
        },
        {
          icon: "🏠",
          label: "Apartment/Floor",
          value: "1",
        },
        {
          icon: "📐",
          label: "Apartment Size",
          value: "3000+ sft",
        },
      ],
      videoTour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      view360:
        "https://momento360.com/e/u/9303cb7c912a47c4b1a32d0d3b6f72a7?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium",
      agent: {
        name: "Jane Doe",
        phone: "+1 (555) 123-4567",
        email: "jane.doe@unitechholdings.com",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      },
      iframeSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.8726079100343!2d90.49742627116395!3d23.680513306609488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b737e6878c79%3A0x6c3461f0b276ea3b!2sJannatul%20Ferdaous%20Jame%20Mosque!5e0!3m2!1sbn!2sbd!4v1731652540127!5m2!1sbn!2sbd",
    }
  ];

  const INITIAL_PROJECT_STATE = {
    name: "",
    description: "",
    address: "",
    image: "",
    images: [],
    features: [],
    plans: [],
    iframe: "",
    status: "upcoming",
    details: [],
  };
  const INITIAL_PROPERTY_DETAILS ={
    address: "",
    landArea: "",
    noOfFloors: "",
    apartment: "",
    apartmentSize: "",
  }
  

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [ongoingProperties, setOngoingProperties] = useState([]);
  const [filter, setFilter] = useState("ongoing");
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentlyViewed");
      return saved ? JSON.parse(saved) : [];
    }
  });

  useEffect(() => {
    setFilteredProperties(
      properties.filter((property) => {
        return property?.status === filter;
      })
    );
  }, [properties, filter]);

  useEffect(() => {
    setOngoingProperties(properties.filter((pr) => pr.status === "ongoing"));
  }, [properties]);

  const addToRecentlyViewed = (propertyId) => {
    setRecentlyViewed((prev) => {
      // Avoid re-render loops by checking if the item is already at the top
      if (prev[0] === propertyId) return prev;

      const updated = [propertyId, ...prev.filter((id) => id !== propertyId)].slice(0, 4);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      return updated;
    });
  };
  async function fetchProjects() {
    try {
      // Make the API request
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/api/projects`, {
        method: "GET", // Change method if needed (POST, PUT, etc.)
        headers: {
          "Content-Type": "application/json", // Set headers if required
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Include token if needed
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Parse JSON response
      const projects = await response.json();
      setOngoingProperties(
        projects.data.filter((project) => {
          return project.status === "ongoing";
        })
      );
      setProperties(projects.data);
      return projects;
    } catch (error) {
      console.error("Failed to fetch projects:", error.message);
      return null;
    }
  }

  useEffect(() => {
    const storedRecentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(storedRecentlyViewed);
  }, []);
  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        filter,
        setFilter,
        recentlyViewed,
        addToRecentlyViewed,
        ongoingProperties,
        setProperties, 
        INITIAL_PROJECT_STATE,
        INITIAL_PROPERTY_DETAILS
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
