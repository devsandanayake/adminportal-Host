import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { viewDestionationById , updateDestination } from "../../../actions/Destination/destinationAction";
import { HOST } from '../../../constants';

export default function UpdatePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const destinationDetails = useSelector(state => state.destination);
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(viewDestionationById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (destinationDetails.data?.result?.destination) {
      setFormData({
        ...destinationDetails.data.result.destination,
        destinationImages: destinationDetails.data.result.destination.destinationImages || []
      });
    }
  }, [destinationDetails]);

  const handleDoubleClick = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setIsEditing(true);
  };

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...formData.destinationImages];
    if (!updatedImages[index]) {
      updatedImages[index] = {
        displayOrder: index + 1,
        validFrom: '2024-12-30 12:23:12',
        validTill: '2026-12-30 12:23:12',
        aspDivWidth: '16',
        aspDivHeight: '9'
      };
    }
    
    updatedImages[index] = {
      ...updatedImages[index],
      imageFile: file,
      webImgPath: URL.createObjectURL(file), // Update the preview
      displayOrder: updatedImages[index].displayOrder || index + 1,
      mobileImageFile: file,
      validFrom: updatedImages[index].validFrom || '',
      validTill: updatedImages[index].validTill || '',
      aspDivWidth: updatedImages[index].aspDivWidth || '',
      aspDivHeight: updatedImages[index].aspDivHeight || ''
    };
    setFormData({ ...formData, destinationImages: updatedImages });
  };

  const handleConfirm = () => {
    const updatedData = new FormData();
    updatedData.append('id', formData.id);
    updatedData.append('name', formData.name);
    updatedData.append('description', formData.description);
    updatedData.append('overview', formData.details.overview);
    updatedData.append('highlight', formData.details.highlight);

    if (formData.destinationImages) {
      formData.destinationImages.forEach((image, index) => {
        updatedData.append(`destinationImages[${index}][displayOrder]`, image.displayOrder);
        updatedData.append(`destinationImages[${index}][imageFile]`, image.imageFile);
        updatedData.append(`destinationImages[${index}][mobileImageFile]`, image.mobileImageFile);
        updatedData.append(`destinationImages[${index}][validFrom]`, image.validFrom);
        updatedData.append(`destinationImages[${index}][validTill]`, image.validTill);
        updatedData.append(`destinationImages[${index}][aspDivWidth]`, image.aspDivWidth);
        updatedData.append(`destinationImages[${index}][aspDivHeight]`, image.aspDivHeight);
      });
    }

    console.log("Updated Data:", updatedData);
    dispatch(updateDestination(updatedData));
  };

  const handleExitEditMode = () => {
    setEditMode({});
    setIsEditing(false);
  };

  if (destinationDetails.loading) {
    return (
      <div className="flex justify-center items-center fixed inset-0 bg-opacity-50 bg-gray-100 z-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (destinationDetails.error) {
    return <div>Error: {destinationDetails.error}</div>;
  }

  const destination = formData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Destination Details</h1>
      {isEditing && (
        <div className="flex justify-between mb-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
          <button
            onClick={handleExitEditMode}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      )}
      {destination && (
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-2xl font-semibold mb-2" onDoubleClick={() => handleDoubleClick('name')}>
            {editMode.name ? (
              <input
                type="text"
                value={destination.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.name
            )}
          </h2>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('Category')}>
            <strong>Category:</strong>{' '}
            {editMode.Category ? (
              <input
                type="text"
                value={destination.Category ? destination.Category.join(', ') : ''}
                onChange={(e) => handleChange('Category', e.target.value.split(', '))}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.Category ? destination.Category.join(', ') : ''
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('subCategories')}>
            <strong>Subcategories:</strong>{' '}
            {editMode.subCategories ? (
              <input
                type="text"
                value={destination.subCategories ? destination.subCategories.join(', ') : ''}
                onChange={(e) => handleChange('subCategories', e.target.value.split(', '))}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.subCategories ? destination.subCategories.join(', ') : ''
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('description')}>
            <strong>Description:</strong>{' '}
            {editMode.description ? (
              <textarea
                value={destination.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.description
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.highlight')}>
            <strong>Highlight:</strong>{' '}
            {editMode['details.highlight'] ? (
              <textarea
                value={destination.details?.highlight || ''}
                onChange={(e) => handleChange('details.highlight', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.highlight
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.overview')}>
            <strong>Overview:</strong>{' '}
            {editMode['details.overview']? (
              <textarea
                value={destination.details?.overview || ''}
                onChange={(e) => handleChange('details.overview', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.overview
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.geoName')}>
            <strong>Geo Name:</strong>{' '}
            {editMode['details.geoName'] ? (
              <input
                type="text"
                value={destination.details?.geoName || ''}
                onChange={(e) => handleChange('details.geoName', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.geoName
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.geoAddress')}>
            <strong>Geo Address:</strong>{' '}
            {editMode['details.geoAddress'] ? (
              <input
                type="text"
                value={destination.details?.geoAddress || ''}
                onChange={(e) => handleChange('details.geoAddress', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.geoAddress
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.latitude')}>
            <strong>Latitude:</strong>{' '}
            {editMode['details.latitude'] ? (
              <input
                type="text"
                value={destination.details?.latitude || ''}
                onChange={(e) => handleChange('details.latitude', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.latitude
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.longitude')}>
            <strong>Longitude:</strong>{' '}
            {editMode['details.longitude'] ? (
              <input
                type="text"
                value={destination.details?.longitude || ''}
                onChange={(e) => handleChange('details.longitude', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.longitude
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('details.altitude')}>
            <strong>Altitude:</strong>{' '}
            {editMode['details.altitude'] ? (
              <input
                type="text"
                value={destination.details?.altitude || ''}
                onChange={(e) => handleChange('details.altitude', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.details?.altitude
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('owningEntity')}>
            <strong>Owning Entity:</strong>{' '}
            {editMode.owningEntity ? (
              <input
                type="text"
                value={destination.owningEntity || ''}
                onChange={(e) => handleChange('owningEntity', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.owningEntity
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('owningBranchName')}>
            <strong>Owning Branch:</strong>{' '}
            {editMode.owningBranchName ? (
              <input
                type="text"
                value={destination.owningBranchName || ''}
                onChange={(e) => handleChange('owningBranchName', e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.owningBranchName
            )}
          </p>
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('tags')}>
            <strong>Tags:</strong>{' '}
            {editMode.tags ? (
              <input
                type="text"
                value={destination.tags ? destination.tags.map(tag => tag.name).join(', ') : ''}
                onChange={(e) => handleChange('tags', e.target.value.split(', '))}
                className="border p-1 rounded w-full"
              />
            ) : (
              destination.tags ? destination.tags.map(tag => tag.name).join(', ') : ''
            )}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {destination.images && destination.images.map((image, index) => (
                <div key={index}>
                  {editMode[`image_${index}`] ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        className="border p-1 rounded w-full mb-2"
                      />
                     <input
                        type="file"
                        onChange={(e) => handleImageChange(index, e.target.files[0], true)}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Display Order"
                        value={image.displayOrder || index + 1}
                        onChange={(e) => handleChange(`destinationImages[${index}].displayOrder`, e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Valid From"
                        value={'2024-12-30 12:23:12'}
                        onChange={(e) => handleChange(`destinationImages[${index}].validFrom`, e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Valid Till"
                        value={'2025-12-30 12:23:12'}
                        onChange={(e) => handleChange(`destinationImages[${index}].validTill`, e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Aspect Ratio Width"
                        value={'16'}
                        onChange={(e) => handleChange(`destinationImages[${index}].aspDivWidth`, e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Aspect Ratio Height"
                        value={'9'}
                        onChange={(e) => handleChange(`destinationImages[${index}].aspDivHeight`, e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                      />
                    </>
                  ) : (
                    <>
                      <img src={`${HOST}/${image.webImgPath}`} alt={image.webImgName} className="w-full h-auto rounded" />
                      <button onClick={() => handleDoubleClick(`image_${index}`)} className="text-blue-500">Edit</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}