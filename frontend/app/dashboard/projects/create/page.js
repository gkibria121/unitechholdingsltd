"use client"
import React, { useState } from 'react'
import CreateUpdateProject from './CreateUpdateProject'
import { usePropertyContext } from '@/app/contexts/PropertyContext'
function Page() {

  const {INITIAL_PROJECT_STATE,INITIAL_PROPERTY_DETAILS} = usePropertyContext();
  const [project, setProject] = useState(INITIAL_PROJECT_STATE);
  const [propertyDetails, setPropertyDetails] = useState(INITIAL_PROPERTY_DETAILS);
  return (
    <CreateUpdateProject  props={{project, setProject,propertyDetails, setPropertyDetails } } />
  )
}

export default Page