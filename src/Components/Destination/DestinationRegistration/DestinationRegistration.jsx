import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { destinationPost } from "../../../actions/Destination/destinationAction";

const DestinationRegistration = () => {
  const dispatch = useDispatch();
  const destinationState = useSelector((state) => state.destination);
  const [loading, setLoading] = useState(false);
  
  console.log("sss",destinationState);

    // Example categories and subcategories data
    const categories = [
        { id: "1", name: "Religious" },
        { id: "2", name: "Classical" },
        { id: "3", name: "Entertaining" },
        { id: "4", name: "Sea" },
        { id: "5", name: "Train" },
        { id: "6", name: "Urban" },
        { id: "7", name: "Historical" },
        { id: "8", name: "Animal" },
        { id: "9", name: "Nature" },
        { id: "10", name: "Adventure" },
        { id: "11", name: "Heritage" }
      ];
      
      const subcategories = [
        { id: "1", categoryId: "1", name: "Buddhism" },
        { id: "2", categoryId: "1", name: "Hinduism" },
        { id: "3", categoryId: "1", name: "Catholic" },
        { id: "4", categoryId: "2", name: "Arts and Sculpture" },
        { id: "5", categoryId: "2", name: "Architecture" },
        { id: "6", categoryId: "2", name: "Cultural" },
        { id: "7", categoryId: "2", name: "Educational" },
        { id: "8", categoryId: "2", name: "Museums" },
        { id: "9", categoryId: "3", name: "Carnival" },
        { id: "10", categoryId: "4", name: "Beach" },
        { id:"11" , categoryId:"4",  name:"Swimming"},
        { id: "12", categoryId: "4", name: "Surfing" },
        { id: "13", categoryId: "4", name: "Scuba Diving" },
        { id: "14", categoryId: "4", name: "Watching Turtles" },
        { id: "15", categoryId: "4", name: "Whales / Dolphins" },
        { id: "16" ,  categoryId:"4",   name:"Boat Riding"},
        { id: "17" ,  categoryId:"4",   name:"Corals Reefs"},
        { id: "18", categoryId: "5", name: "Ella Odyssey" },
        { id: "19", categoryId: "6", name: "Shopping Malls" },
        { id: "20", categoryId: "6", name: "Street Food" },
        { id: "21", categoryId: "7", name: "Ruins" },
        { id: "22", categoryId: "7", name: "Memorials" },
        { id: "23", categoryId: "7", name: "Conserved" },
        { id: "24", categoryId: "8", name: "Wild Animals" },
        { id: "25", categoryId: "8", name: "Birds" },
        { id: "26", categoryId: "8", name: "Zoo" },
        { id: "27", categoryId: "8", name: "Safari Park" },
        { id: "28", categoryId: "9", name: "Forests-wet zone" },
        { id: "29", categoryId: "9", name: "Forests-dry zone" },
        { id: "30", categoryId: "9", name: "Mountains" },
        { id: "31", categoryId: "9", name: "Waterfalls" },
        { id: "32", categoryId: "10", name: "Adventure Parks" },
        { id: "33", categoryId: "10", name: "Hiking" },
        { id: "34", categoryId: "10", name: "Entertainment" },
        { id: "35", categoryId: "11", name: "Natural" },
        { id: "36", categoryId: "11", name: "Man-Made" }
      ];
      const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owningEntityCode: "",
    owningEntityBranchCode: "EEB_67612E8497A1F",
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

  React.useEffect(() => {
    if (destinationState.loading) {
      setLoading(true);
    } else if (destinationState.success) {
      alert("Upload successful!");
      setLoading(false);
    } else if (destinationState.error) {
      alert(`Upload failed: ${destinationState.error}`);
      setLoading(false);
      
    }
  }, [destinationState]);

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
  
  const removeSessionField = (index) => {
    setFormData((prev) => {
       const images = [...prev.destinationImages];
       images.splice(index,1);
       return {...prev,destinationImages:images};
    });
  };

  const handleRemoveTagCode = (index) => {
    setFormData((prev) => {
       const tagCode = [...prev.tagCodes];
       tagCode.splice(index,1);
       return {...prev,tagCodes:tagCode};
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

    // Handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setFormData((prev) => ({
          ...prev,
          tourSubCategoryCodes: [""], // Reset subcategory codes when category changes
        }));
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
    data.append("owningEntityBranchCode", formData.owningEntityBranchCode);
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

    // Filter subcategories based on selected category
    const filteredSubcategories = subcategories.filter(
        (sub) => sub.categoryId === selectedCategory
      );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Destination Registration</h1>
          {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-opacity-50 bg-gray-100 z-50">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">

     {/* Owning Entity Code */}
<div className="space-y-4 mt-6">
  <div className="space-y-2">
    <label className="block font-medium">Owning Entity Code:</label>
    <select
      name="owningEntityCode"
      value={formData.owningEntityCode}
      onChange={handleInputChange}
      className="border rounded-lg px-4 py-2 w-full"
    >
      <option value="">Select</option>
      <option value="EE_67612E84966D6">SLT-Travel Sample Entity</option>
      <option value="EE_6776DD67C2FB4">Zoology</option>
    </select>
  </div>

  {formData.owningEntityCode === "EE_6776DD67C2FB4" && (
    <div className="space-y-2">
      <label className="block font-medium">Owning Entity Branch Code:</label>
      <select
        name="owningEntityBranchCode"
        value={formData.owningEntityBranchCode}
        onChange={handleInputChange}
        className="border rounded-lg px-4 py-2 w-full"
      >
        <option value="">Select</option>
        <option value="EEB_6776DD67C53CD">Dehiwala</option>
        <option value="EEB_6776DD67C5514">Yala-National Park</option>
      </select>
    </div>
  )}
</div>

{/* Tag Codes Section */}
<div className="mt-6">
  <div className="flex items-center gap-4">
    <h3 className="font-medium">Tag Codes</h3>
    <button
      type="button"
      onClick={handleAddTagCode}
      className="flex items-center gap-2 bg-green-500 text-white px-1 text-xl  hover:bg-green-600 transition duration-300"
    >
      <i className="ri-add-fill"></i>
      
    </button>
  </div>

  <div className="space-y-4 mt-4">
    {formData.tagCodes.map((tag, index) => (
      <div key={index} className="space-y-2 border rounded-lg p-4 bg-white shadow-sm">
        <label className="block font-medium">Tag Code {index + 1}:</label>
        <select
          value={tag}
          onChange={(e) => handleTagCodeChange(e, index)}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">Select Tag Code</option>
          <option value="WELCOME_TAG">WELCOME_TAG</option>
        </select>
        <button
          type="button"
          onClick={() => handleRemoveTagCode(index)}
          className="mt-2 bg-red-500 text-white px-1 text-xl hover:bg-red-600 transition duration-300"
        >  <i className="ri-delete-bin-5-line"></i>
        </button>
      </div>
    ))}
  </div>
</div>
        {/* Main Fields */}
        <div className="flex gap-4 ">
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
          <label className="block font-medium">QR Base:</label>
          <input
            name="qrBase"
            value={formData.qrBase}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
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
        <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Geotag Details <i className="ri-map-pin-line"></i></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.geotag.name}
                  onChange={handleGeotagChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter geotag name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  name="address"
                  value={formData.geotag.address}
                  onChange={handleGeotagChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Latitude
                </label>
                <input
                  name="latitude"
                  value={formData.geotag.latitude}
                  onChange={handleGeotagChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter latitude"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Longitude
                </label>
                <input
                  name="longitude"
                  value={formData.geotag.longitude}
                  onChange={handleGeotagChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter longitude"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Altitude
                </label>
                <input
                  name="altitude"
                  value={formData.geotag.altitude}
                  onChange={handleGeotagChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter altitude"
                />
              </div>
            </div>
          </div>

    {/* Destination Images */}
    <div className="mt-6">
      <div className="card-header">
        <div className="flex items-center">
          <h2 className="flex-1 text-xl font-semibold mb-6 text-gray-800">Destination Images</h2>
          <button
            type="button"
            onClick={handleAddImage}
            className="flex items-center gap-2 bg-green-500 text-white px-1 text-xl hover:bg-green-600 transition duration-300"
          >
            <i className="ri-add-fill"></i>
          </button>
        </div>
      </div>
  {formData.destinationImages.map((image, index) => (
    <div key={index} className="p-4 mt-6  border bg-white rounded-md shadow-sm">
      <h4 className="text-lg font-medium mb-4">Destination Image {index + 1}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Display Order */}
        <div className="space-y-2">
          <label className="block font-medium">Display Order:</label>
          <input
            type="number"
            value={image.displayOrder}
            onChange={(e) => handleImageFieldChange(e, index, "displayOrder")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Image File */}
        <div className="space-y-2">
          <label className="block font-medium">Image File:</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, index, "imageFile")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Mobile Image File */}
        <div className="space-y-2">
          <label className="block font-medium">Mobile Image File:</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, index, "mobileImageFile")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Valid From */}
          <div className="space-y-2">
          <label className="block font-medium">Valid From:</label>
          <input
            type="datetime-local"
            value={moment(image.validFrom).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => handleImageFieldChange(e, index, "validFrom")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
        
        {/* Valid Till */}
        <div className="space-y-2">
          <label className="block font-medium">Valid Till:</label>
          <input
            type="datetime-local"
            value={moment(image.validTill).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => handleImageFieldChange(e, index, "validTill")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Aspect Width */}
        <div className="space-y-2">
          <label className="block font-medium">Aspect Width:</label>
          <input
            type="number"
            value={image.aspDivWidth}
            onChange={(e) => handleImageFieldChange(e, index, "aspDivWidth")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Aspect Height */}
        <div className="space-y-2">
          <label className="block font-medium">Aspect Height:</label>
          <input
            type="number"
            value={image.aspDivHeight}
            onChange={(e) => handleImageFieldChange(e, index, "aspDivHeight")}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => removeSessionField(index)}
        className="flex items-center gap-2 mt-4 bg-red-500 text-white px-1 text-xl  hover:bg-red-600 transition duration-300"
      >
        <i className="ri-delete-bin-5-line"></i>
      </button>
    </div>
  ))}
</div>

       
        {/* Tour Subcategory Codes */}
        <h3 className="text-xl font-semibold mt-4">Destination Category</h3>
        <div className="space-y-2">
          <label className="block font-medium">Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* <button
          type="button"
          onClick={handleAddTourSubCategoryCode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Subcategory Code
        </button> */}
        {formData.tourSubCategoryCodes.map((code, index) => (
          <div key={index} className="space-y-2 mt-2">
            <label className="block font-medium">Subcategory  {index + 1}:</label>
            <select
              value={code}
              onChange={(e) => handleTourSubCategoryCodeChange(e, index)}
              className="border rounded px-4 py-2 w-full"
            >
              <option value="">Select Subcategory Code</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
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