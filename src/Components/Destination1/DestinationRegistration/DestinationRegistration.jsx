import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { destinationPost } from "../../../actions/Destination/destinationAction";

const DestinationRegistration = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owningEntityCode: "",
    qrBase: "",
    overview: "",
    highlight: "",
    geotag: {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      altitude: "",
    },
    destinationImages: [], // Array to hold multiple images and related fields
    tagCodes: [""], // Initialize with one tag code field
    tourSubCategoryCodes: [""], // Initialize with one tour subcategory field
  });

  // Handle input changes for main fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for geotag fields
  const handleGeotagChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      geotag: {
        ...prev.geotag,
        [name]: value,
      },
    }));
  };

  // Add a new image block
  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      destinationImages: [
        ...prev.destinationImages,
        {
          displayOrder: "",
          imageFile: null,
          mobileImageFile: null,
          validFrom: "",
          validTill: "",
          aspDivWidth: "16",
          aspDivHeight: "9",
        },
      ],
    }));
  };

  // Handle changes for image fields
  const handleImageChange = (e, index, field) => {
    const file = e.target.files[0];
    setFormData((prev) => {
      const images = [...prev.destinationImages];
      images[index][field] = file;
      return { ...prev, destinationImages: images };
    });
  };

  // Handle text input for image metadata fields
  const handleImageFieldChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const images = [...prev.destinationImages];
      images[index][field] = value;
      return { ...prev, destinationImages: images };
    });
  };
  

  // Add a new tag code field
  const handleAddTagCode = () => {
    setFormData((prev) => ({
      ...prev,
      tagCodes: [...prev.tagCodes, ""],
    }));
  };

  // Handle tag code changes
  const handleTagCodeChange = (e, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      const tags = [...prev.tagCodes];
      tags[index] = value;
      return { ...prev, tagCodes: tags };
    });
  };

  // Add a new tour subcategory code field
  const handleAddTourSubCategoryCode = () => {
    setFormData((prev) => ({
      ...prev,
      tourSubCategoryCodes: [...prev.tourSubCategoryCodes, ""],
    }));
  };

  // Handle tour subcategory code changes
  const handleTourSubCategoryCodeChange = (e, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      const codes = [...prev.tourSubCategoryCodes];
      codes[index] = value;
      return { ...prev, tourSubCategoryCodes: codes };
    });
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("owningEntityCode", formData.owningEntityCode);
    data.append("qrBase", formData.qrBase);
    data.append("overview", formData.overview);
    data.append("highlight", formData.highlight);
  
    // Append geotag fields
    Object.entries(formData.geotag).forEach(([key, value]) => {
      data.append(`geotag[${key}]`, value || "");
    });
  
    // Append destinationImages fields
    formData.destinationImages.forEach((image, index) => {
      if (image.imageFile) {
        data.append(`destinationImages[${index}][imageFile]`, image.imageFile);
      }
      if (image.mobileImageFile) {
        data.append(`destinationImages[${index}][mobileImageFile]`, image.mobileImageFile);
      }
      data.append(`destinationImages[${index}][displayOrder]`, image.displayOrder || "");
      data.append(`destinationImages[${index}][validFrom]`, moment(image.validFrom).format("YYYY-MM-DD HH:mm:ss"));
      data.append(`destinationImages[${index}][validTill]`, moment(image.validTill).format("YYYY-MM-DD HH:mm:ss"));
      data.append(`destinationImages[${index}][aspDivWidth]`, image.aspDivWidth || "16");
      data.append(`destinationImages[${index}][aspDivHeight]`, image.aspDivHeight || "9");
    });
  
    // Append tagCodes
    formData.tagCodes.forEach((tag, index) => {
      data.append(`tagCodes[${index}]`, tag || "");
    });
  
    // Append tourSubCategoryCodes
    formData.tourSubCategoryCodes.forEach((code, index) => {
      data.append(`tourSubCategoryCodes[${index}]`, code || "");
    });
  
    // Debug FormData content for troubleshooting
    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    // Dispatch action
    dispatch(destinationPost(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Destination Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Fields */}
        <div className="space-y-2">
          <label className="block font-medium">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          ></textarea>
        </div>
               <div className="space-y-2">
          <label className="block font-medium">Owning Entity Code:</label>
          <select
            name="owningEntityCode"
            value={formData.owningEntityCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="EE_67612E84966D6">EE_67612E84966D6</option>
            {/* Add more options here if needed */}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">QR Base:</label>
          <input
            name="qrBase"
            value={formData.qrBase}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Overview:</label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Highlight:</label>
          <textarea
            name="highlight"
            value={formData.highlight}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          ></textarea>
        </div>

        {/* Geotag Fields */}
        <h3 className="text-xl font-semibold mt-4">Geotag</h3>
        <div className="space-y-2">
          <label className="block font-medium">Name:</label>
          <input
            name="name"
            value={formData.geotag.name}
            onChange={handleGeotagChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Address:</label>
          <input
            name="address"
            value={formData.geotag.address}
            onChange={handleGeotagChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Latitude:</label>
          <input
            name="latitude"
            value={formData.geotag.latitude}
            onChange={handleGeotagChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Longitude:</label>
          <input
            name="longitude"
            value={formData.geotag.longitude}
            onChange={handleGeotagChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Altitude:</label>
          <input
            name="altitude"
            value={formData.geotag.altitude}
            onChange={handleGeotagChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        {/* Destination Images */}
        <h3 className="text-xl font-semibold mt-4">Destination Images</h3>
        <button
          type="button"
          onClick={handleAddImage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Image
        </button>
        
  {formData.destinationImages.map((image, index) => (
    <div key={index} className="space-y-2 mt-4">
      <h4 className="text-lg font-medium">Image {index + 1}</h4>
      <div className="space-y-2">
        <label className="block font-medium">Display Order:</label>
        <input
          type="number"
          value={image.displayOrder}
          onChange={(e) => handleImageFieldChange(e, index, "displayOrder")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Image File:</label>
        <input
          type="file"
          onChange={(e) => handleImageChange(e, index, "imageFile")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Mobile Image File:</label>
        <input
          type="file"
          onChange={(e) => handleImageChange(e, index, "mobileImageFile")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Valid From:</label>
        <input
          type="datetime-local"
          value={image.validFrom}
          onChange={(e) => handleImageFieldChange(e, index, "validFrom")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Valid Till:</label>
        <input
          type="datetime-local"
          value={image.validTill}
          onChange={(e) => handleImageFieldChange(e, index, "validTill")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Aspect Width:</label>
        <input
          type="number"
          value={image.aspDivWidth}
          onChange={(e) => handleImageFieldChange(e, index, "aspDivWidth")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Aspect Height:</label>
        <input
          type="number"
          value={image.aspDivHeight}
          onChange={(e) => handleImageFieldChange(e, index, "aspDivHeight")}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
    </div>
  ))}
 

               {/* Tag Codes */}
        <h3 className="text-xl font-semibold mt-4">Tag Codes</h3>
        <button
          type="button"
          onClick={handleAddTagCode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Tag Code
        </button>
        {formData.tagCodes.map((tag, index) => (
          <div key={index} className="space-y-2 mt-2">
            <label className="block font-medium">Tag Code {index + 1}:</label>
            <select
              value={tag}
              onChange={(e) => handleTagCodeChange(e, index)}
              className="border rounded px-4 py-2 w-full"
            >
              <option value="">Select Tag Code</option>
              <option value="WELCOME_TAG">WELCOME_TAG</option>
              {/* Add more options here if needed */}
            </select>
          </div>
        ))}
        
        {/* Tour Subcategory Codes */}
        <h3 className="text-xl font-semibold mt-4">Tour Subcategory Codes</h3>
        <button
          type="button"
          onClick={handleAddTourSubCategoryCode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Subcategory Code
        </button>
        {formData.tourSubCategoryCodes.map((code, index) => (
          <div key={index} className="space-y-2 mt-2">
            <label className="block font-medium">Subcategory Code {index + 1}:</label>
            <select
              value={code}
              onChange={(e) => handleTourSubCategoryCodeChange(e, index)}
              className="border rounded px-4 py-2 w-full"
            >
              <option value="">Select Subcategory Code</option>
              <option value="1">Religious</option>
              <option value="2">Catholic</option>
              {/* Add more options here if needed */}
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DestinationRegistration;