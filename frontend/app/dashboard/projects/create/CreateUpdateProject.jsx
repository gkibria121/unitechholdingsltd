"use client";
import ImageUploadProgress from './ImageUploadProgress';
import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePropertyContext } from "@/app/contexts/PropertyContext";
import { useRouter } from "next/navigation";
import PropertyDetails from "@/app/properties/[id]/PropertyDetails";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
// Initial state constant
const PROPERTY_DETAILS = [
  { icon: "📍", label: "Address", name: "address" },
  { icon: "📏", label: "Land Area", name: "landArea" },
  { icon: "🏢", label: "No. of Floors", name: "noOfFloors" },
  { icon: "🏠", label: "Apartment/Floor", name: "floors" },
  { icon: "📐", label: "Apartment Size", name: "apartmentSize" },
  { icon: "🛣️", label: "Front Road", name: "frontRoad" },
  { icon: "🛤️", label: "Side Road", name: "sideRoad" },
];
const PROJECT_STATUSES = [
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Coming Soon" },
  { value: "successfully-delivered", label: "Successfully Delivered" },
];

export default function CreateUpdateProject({props,mode='create'}) {
    const {project, setProject,propertyDetails, setPropertyDetails} = props;
  const { setProperties   } = usePropertyContext();



  const router = useRouter();
  const [errors, setErrors] = useState({});
  // Update project details when property details change
  useEffect(() => {
    setProject((prev) => ({
      ...prev,
      details: PROPERTY_DETAILS.map((detail) => ({
        ...detail,
        value: propertyDetails[detail.name] || "",
      })),
    }));
  }, [propertyDetails]);

  // Memoized handlers
  const handleProjectChange = useCallback((e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePropertyDetailChange = useCallback((name, value) => {
    setPropertyDetails((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFeatureChange = useCallback((index, value) => {
    setProject((prev) => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  }, []);

  // File handling utilities
 
 

  const removeItem = useCallback((index, type) => {
    setProject((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, idx) => idx !== index),
    }));
  }, []);

  // Save project
  const saveProject = async (e) => {
    e.preventDefault();
    if (!isValidSubmitter(e)) {
      return;
    }

    const propertyData = {
      ...project, 
      iframe: project.iframe.match(/src="([^"]+)"/) ? project.iframe.match(/src="([^"]+)"/)[1] : project.iframe,
    };
    if (!validate()) {
      return;
    }
    if(mode=='create'){
        uploadProject(propertyData)
    }
    else{
        updateProject(propertyData)
    }

    
  };
  const [property, setProperty] = useState(project);

  useEffect(() => {
    setProperty({
      ...project,
      iframe: project.iframe?.match(/src="([^"]+)"/) ? project.iframe.match(/src="([^"]+)"/)[1] : project.iframe,
    });
  }, [project]);

  // Utility function for filename shortening
  const shortenFileName = (fileName, maxLength = 20) => {
    if (!fileName || fileName.length <= maxLength) return fileName || "";
    const firstPart = fileName.slice(0, 10);
    const lastPart = fileName.slice(-10);
    return `${firstPart}...${lastPart}`;
  };
  const [uploads, setUploads] = useState([]);

  const uploadImage = async (file) => {
    const newUpload = { fileName: file.name, progress: 0, status: "Uploading" };
    setUploads((prevUploads) => [...prevUploads, newUpload]);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.post(`${apiUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          // Update the progress in the list
          setUploads((prevUploads) =>
            prevUploads.map((upload) =>
              upload.fileName === file.name
                ? { ...upload, progress }
                : upload
            )
          );
        },
      });

      // Mark upload as successful
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload.fileName === file.name
            ? { ...upload, status: "Completed" }
            : upload
        )
      );
    } catch (error) {
      // Mark upload as failed
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload.fileName === file.name
            ? { ...upload, status: "Failed" }
            : upload
        )
      );
    }
  };
  

  const validate = () => {
    let flag = true;
    if (!project.iframe.match(/(:?src="([^"]+)")|(www.google.com\/maps\/embed)/)) {
      setErrors((prev) => ({ ...prev, iframe: "Please insert a valid google embed link" }));
      flag = false;
    } else {
      setErrors((prev) => ({ ...prev, iframe: null }));
    }
    return flag;
  };
  const isValidSubmitter = (formSubmission) => {
    const submitter = formSubmission?.nativeEvent?.submitter;
    if (!submitter) {
      return false;
    }
    const isValid = submitter.getAttribute("data-submit");

    return isValid;
  };

  const uploadProject =async(propertyData)=>{
    try {
        const apiURL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiURL}/api/projects/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(propertyData),
        });
  
        if (response.ok) {
          const { data } = await response.json();
  
          setProperties((prev) => [...prev, data]);
          router.push("/dashboard");
        } else {
          throw new Error("Failed to save project");
        }
      } catch (error) {
        console.error("Error saving project:", error);
        alert("Failed to save project. Please try again.");
      }
  }
  const updateProject = async (propertyData)=>{
    try {
        const apiURL = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.put(
            `${apiURL}/api/projects/${propertyData.id}`,
            propertyData, // Send data directly as JSON
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          setProperties((prev) => prev.map(el=>el.id ===data.data.id ? data.data : el ));
          router.push("/dashboard");
         
      } catch (error) {
        console.error("Error saving project:", error);
        alert("Failed to update project. Please try again.");
      }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{mode==='create'?"Create a Project":"Update Project"}</h1>
      <form onSubmit={saveProject} className="space-y-8">
        <Tabs defaultValue="project" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="project">Project Info</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="project">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input id="name" name="name" value={project.name} onChange={handleProjectChange} required />
                  </div>
                  <div>
                    <Label htmlFor="address">Location</Label>
                    <Input
                      id="address"
                      name="address"
                      value={project.address}
                      onChange={handleProjectChange}
                      required
                    />
                  </div>

                  {/* Main Project Image */}
                  <div className="space-y-2">
                    <Label htmlFor="mainImage">Main Project Image</Label>
                    <div className="flex flex-col space-y-2">
                   
                      {project.image && (
                        <div className="relative w-full h-40">
                          <Image
                            src={project.image}
                            alt="Main project image" 
                            fill
                            sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw"
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                       <ImageUploadProgress 
                    onUploadComplete={(imageResult) => {
                      setProject(prev => ({ 
                        ...prev, 
                        image:  imageResult.src
                      }));
                    }} 
                    type="main" 
                  />
                    </div>
                  </div>

                  {/* ... (rest of the basic information section) */}
                  <div>
                    <Label htmlFor="status">Project Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={project.status}
                      onChange={handleProjectChange}
                      className="mt-1 block w-full  p-2   rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {PROJECT_STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Details Fields */}
                  {PROPERTY_DETAILS.map((detail) => (
                    <div key={detail.name}>
                      <Label htmlFor={detail.name}>{detail.label}</Label>
                      <Input
                        id={detail.name}
                        name={detail.name}
                        value={propertyDetails[detail.name]}
                        onChange={(e) => handlePropertyDetailChange(detail.name, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <Label htmlFor="features">Features</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          type="text"
                          value={feature}
                          placeholder={`Feature ${index + 1}`}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(index, "features")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      setProject((prev) => ({
                        ...prev,
                        features: [...prev.features, ""],
                      }))
                    }
                    className="mt-4"
                  >
                    Add Feature
                  </Button>
                </div>
                {/* Featured Images Section */}
                <div className="space-y-4">
                  <Label>Featured Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative w-full h-40">
                          <Image
                            src={image.src}
                            alt={`Plan image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw"
                            className="object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeItem(index, "images")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input type="text" value={shortenFileName(image.name)} readOnly className="text-sm" />
                      </div>
                    ))}
                  </div>

                  <ImageUploadProgress 
                    onUploadComplete={(imageResult) => {
                      setProject(prev => ({ 
                        ...prev, 
                        images: [...prev.images, imageResult] 
                      }));
                    }} 
                    type="Featured" 
                  /> 
                </div>

                {/* Plan Images Section */}
                <div className="space-y-4">
                  <Label>Plan Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.plans.map((plan, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative w-full h-40">
                          <Image
                            src={plan.src}
                            alt={`Plan image ${index + 1}`}
                            fill 
                            sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw"
                            className="object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeItem(index, "plans")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input type="text" value={shortenFileName(plan.name)} readOnly className="text-sm" />
                      </div>
                    ))}
                  </div>
                  <ImageUploadProgress 
                    onUploadComplete={(imageResult) => {
                      setProject(prev => ({ 
                        ...prev, 
                        plans: [...prev.plans, imageResult]
                      }));
                    }} 
                    type="Plan" 
                  />
                   
                </div>

                {/* ... (rest of the form sections remain the same) */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={project.description}
                    onChange={handleProjectChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="iframe">Google Map Iframe Embed Link</Label>
                  <Input id="iframe" name="iframe" value={project.iframe} onChange={handleProjectChange} required />
                  {errors.iframe ? <div style={{ color: "red" }}>{errors.iframe}</div> : ""}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Project Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyDetails property={property} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit" data-submit="true">
            {mode=='create'?"Save Project":'Update Project'}
          </Button>
        </div>
      </form>
    </div>
  );
}
