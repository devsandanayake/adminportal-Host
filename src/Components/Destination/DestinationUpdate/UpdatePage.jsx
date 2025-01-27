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
      setFormData(destinationDetails.data.result.destination);
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

  const handleConfirm = () => {
    const updatedData = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        overview: formData.details.overview,
        highlight: formData.details.highlight
    };
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
                <img key={index} src={`${HOST}/${image.webImgPath}`} alt={image.webImgName} className="w-full h-auto rounded" />
              ))}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}