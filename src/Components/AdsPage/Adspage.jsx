import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSpecific } from '../../actions/postAction';
import { approvelPost } from '../../actions/approvelAction';

export default function Adspage() {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  const postState = useSelector(state => state.data);

  React.useEffect(() => {
    dispatch(fetchDataSpecific(adCode));
  }, [dispatch, adCode]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Advertisement Details</h1>
      
      {postState.loading && <p className="text-blue-600 text-center">Loading...</p>}
      {postState.error && <p className="text-red-600 text-center">Error: {postState.error}</p>}

      {postState.data && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">{postState.data.title}</h2>
            <span className={`text-lg font-extrabold py-2 px-4 rounded ${
              postState.data.status === 1 ? 'bg-green-500 text-white' : 
              postState.data.status === 2 ? 'bg-red-500 text-white' : 
              'bg-yellow-500 text-white'
            }`}>
              {postState.data.status === 1 ? 'Approved' : 
               postState.data.status === 2 ? 'Rejected' : 
               'Pending'}
            </span>
          </div>
          
          <p className="text-gray-700 mb-6">{postState.data.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Details</h3>
              <ul className="space-y-2">
                <li><strong>Bedrooms:</strong> {postState.data.bedroomCount}</li>
                <li><strong>Bathrooms:</strong> {postState.data.bathroomCount}</li>
                <li><strong>Floor:</strong> {postState.data.floor ? postState.data.floor : 'N/A'}</li>
                <li><strong>Area Size:</strong> {postState.data.areaSize} sq ft</li>
                <li><strong>Price:</strong> {postState.data.price} {postState.data.currency}</li>
                <li><strong>Transaction Type:</strong> {postState.data.transactionType}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-700">
                {postState.data.address?.street && (
                  <span className="block">{postState.data.address.street}</span>
                )}
                {postState.data.areas && (
                  <span className="block">{postState.data.areas}</span>
                )}
                {postState.data.districts && (
                  <span className="block">{postState.data.districts}</span>
                )}
                {postState.data.address?.postCode && (
                  <span className="block">{postState.data.address.postCode}</span>
                )}
              </p>
            </div>
          </div>

          {postState.data.images && postState.data.images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {postState.data.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={`http://124.43.179.118:8081/${image.replace('../', '')}`} 
                    alt={`Advertisement ${index + 1}`} 
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}

          {postState.data.auctionStatus && postState.data.auctionStatus.status && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Auction Details</h3>
              <ul className="space-y-2">
                <li><strong>Start Price:</strong> {postState.data.auctionStatus.startPrice} {postState.data.currency}</li>
                <li><strong>Start Date:</strong> {postState.data.auctionStatus.startDate}</li>
                <li><strong>End Date:</strong> {postState.data.auctionStatus.endDate}</li>
                <li><strong>Max Rate:</strong> {postState.data.auctionStatus.maxRate}</li>
                <li><strong>Current Rate:</strong> {postState.data.auctionStatus.currentRate}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
