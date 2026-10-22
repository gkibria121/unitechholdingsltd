"use client"
import { usePropertyContext } from '@/app/contexts/PropertyContext';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import CreateUpdateProject from '../../create/CreateUpdateProject';

function Page() {
  const { id } = useParams();
  const { INITIAL_PROJECT_STATE, INITIAL_PROPERTY_DETAILS } = usePropertyContext();
  const [project, setProject] = useState(INITIAL_PROJECT_STATE);
  const [propertyDetails, setPropertyDetails] = useState(INITIAL_PROPERTY_DETAILS);
  const [loading, setLoading] = useState(true);

  const getPropertyDetails = (detailsArray) => {
    const details = { ...INITIAL_PROPERTY_DETAILS };
    if (Array.isArray(detailsArray)) {
      detailsArray.forEach(detail => {
        if (detail && detail.name) {
          details[detail.name] = detail.value || "";
        }
      });
    }
    return details;
  };

  const getProperty = async (projectId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`);
      const projectData = data.data || data;

      // Ensure iframe is formatted as full <iframe> if only raw URL was saved previously
      let iframeVal = projectData.iframe || projectData.iframeSrc || "";
      if (iframeVal && !iframeVal.includes("<iframe") && iframeVal.includes("http")) {
        iframeVal = `<iframe src="${iframeVal}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      }

      const formattedDetails = getPropertyDetails(projectData.details);

      setProject({
        ...INITIAL_PROJECT_STATE,
        ...projectData,
        iframe: iframeVal,
        features: Array.isArray(projectData.features) ? projectData.features : [],
        images: Array.isArray(projectData.images) ? projectData.images : [],
        plans: Array.isArray(projectData.plans) ? projectData.plans : [],
        details: Array.isArray(projectData.details) ? projectData.details : [],
      });

      setPropertyDetails(formattedDetails);
    } catch (e) {
      console.error("Failed to fetch project for editing:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProperty(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl font-medium text-gray-600 dark:text-gray-300">Loading project...</div>
      </div>
    );
  }

  return (
    <CreateUpdateProject
      props={{ project, setProject, propertyDetails, setPropertyDetails }}
      mode="update"
    />
  );
}

export default Page;