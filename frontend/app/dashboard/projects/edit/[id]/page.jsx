"use client"
import { usePropertyContext } from '@/app/contexts/PropertyContext';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import CreateUpdateProject from '../../create/CreateUpdateProject';

function Page() {

  const {id} = useParams();
  const {INITIAL_PROJECT_STATE,INITIAL_PROPERTY_DETAILS} = usePropertyContext();
  const [project , setProject] = useState(INITIAL_PROJECT_STATE)
  const [propertyDetails, setPropertyDetails] = useState(INITIAL_PROPERTY_DETAILS);
  const getProperty = async (id)=>{
    try{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`)
      
      setProject(data)
        
      setPropertyDetails(getPropertyDetails(data.details))
  
    }
    catch(e){
      console.error(e)
    }
    
  }
  useState(()=>{
    getProperty(id)
  },[])
   
  const getPropertyDetails =(propertyDetails)=>{
    const details ={};
    propertyDetails.map(detail=> details[detail.name] = detail.value)
    return details;
    
  }

  return (
    
    <CreateUpdateProject  props={{project, setProject,propertyDetails, setPropertyDetails } } mode='update' />
  )
}

export default Page