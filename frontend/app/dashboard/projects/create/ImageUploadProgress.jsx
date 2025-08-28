import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { X, Check, Upload } from "lucide-react";
import axios from "axios";

const ImageUploadProgress = ({ onUploadComplete, type }) => {
  const [uploads, setUploads] = useState([]);

  const handleFileUpload = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    
    // Create initial upload states
    const initialUploads = files.map(file => ({
      file,
      fileName: file.name,
      progress: 0,
      status: 'pending'
    }));

    setUploads(initialUploads);

    // Parallel uploads with individual tracking
    const uploadPromises = initialUploads.map(async (upload) => {
      const formData = new FormData();
      formData.append('image', upload.file);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.post(`${apiUrl}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setUploads(prevUploads => 
              prevUploads.map(u => 
                u.fileName === upload.fileName 
                  ? { ...u, progress, status: progress === 100 ? 'completed' : 'uploading' }
                  : u
              )
            );
          }
        });

        // Call the upload complete callback with the uploaded image data
        if (response.data && response.data.src) {
          onUploadComplete(response.data, type);
        }

        return response.data;
      } catch (error) {
 
        setUploads(prevUploads => 
          prevUploads.map(u => 
            u.fileName === upload.fileName 
              ? { ...u, status: 'failed', progress: 0  }
              : u
          )
        );

        return null;
      }
    });

    await Promise.all(uploadPromises);
  }, [onUploadComplete, type]);

  const removeUpload = useCallback((fileName) => {
    setUploads(prevUploads => 
      prevUploads.filter(upload => upload.fileName !== fileName)
    );
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <Check className="text-green-500 w-5 h-5" />;
      // case 'failed':
      //   return <X className="text-red-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="file" 
          multiple={type!=='main'}
          accept="image/*" 
          onChange={handleFileUpload} 
          className="hidden" 
          id={`fileInput-${type}`}
        />
        <Button 
          type="button" 
          onClick={() => document.getElementById(`fileInput-${type}`).click()}
        >
          <Upload className="mr-2 w-4 h-4" /> Upload {type === 'main' ? 'Main Image' : type.charAt(0).toUpperCase() + type.slice(1)} Images
        </Button>
      </div>

      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload) => (
            <div key={upload.fileName} className={`flex items-center space-x-2 ${upload.status === 'completed'? "hidden" : ''} `}    >
              <div className="flex-grow">
                <div className="flex justify-between text-sm mb-1">
                  <span>{upload.fileName}</span>
                  <span>{upload.progress}%</span>
                </div>
                <div 
                  className={`
                    w-full h-2 rounded-full 
                    ${upload.status === 'failed' ? 'bg-red-200' : 'bg-gray-200'}
                    ${upload.status === 'completed' ? 'bg-green-200 opacity-0  ' : ''}
                  `}
                >
                  <div 
                    className={`
                      h-full rounded-full 
                      ${upload.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'}
                      ${upload.status === 'completed' ? 'bg-green-500' : ''}
                    `} 
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
                 {upload.status =='failed' &&  <p className='my-1 text-red-500'>Please ensure that you are uploading correct image format</p>}
              </div>
              {getStatusIcon(upload.status)}
              {(upload.status === 'failed') && (
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => removeUpload(upload.fileName)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadProgress;