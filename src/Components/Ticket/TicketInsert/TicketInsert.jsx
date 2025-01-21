import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { ticketPost } from '../../../actions/Ticket/ticketAction';

export default function TicketInsert() {
  const dispatch = useDispatch();
  const ticketState = useSelector((state) => state.ticket);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destinationCode: 'EDD_678E15C00861F',
    name: 'Sample Ticket',
    noOfTickets: '100',
    description: 'This is a sample description for the ticket.',
    paymentMethods: ['Credit Card', 'PayPal'],
    ticketTypeCode: 'DST_ENTRANCE_TICKET',
    validFrom: '2024-12-10 00:00:00',
    validTill: '2025-12-10 00:00:00',
    ticketGroupCode: 'ENTRANCE_TICKETS_LOCAL',
    ticketOriginCode: 'LOCAL',
    ticketPricing: {
      currencyCode: 'LKR',
      validFrom: '2024-12-10 00:00:00',
      validTill: '2025-12-10 00:00:00',
      basePrice: 100,
      taxPercentage: 10,
      discount: 5,
    //   discountMode: '',
      specialPrice: 90
    },
    ticketImages: [{
      displayOrder: '1',
      imageFile: null,
      mobileImageFile: null,
      validFrom: '2024-12-10 00:00:00',
      validTill: '2025-12-10 00:00:00'
    }],
    ticketSessions: [{
      displayName: 'Morning Session',
      validFrom: '2024-12-10 00:00:00',
      validTill: '2025-12-10 00:00:00',
      dayStartFrom: '09:00:00',
      dayEndTo: '16:00:00',
      day: 'Monday'
    }],
    registrationValidFrom: '2024-12-10 00:00:00',
    registrationValidTill: '2025-12-10 00:00:00',
    ticketAgerCode: 'ADULT',
    ticketValidity: {
      noOfDays: 30
    },
    qrReleaseFormatCode: 'PER_BOOKING'
  });


  React.useEffect(() => {
    if (ticketState.loading) {
      setLoading(true);
    } else if (ticketState.success) {
      alert("Upload successful!");
      setLoading(false);
    } else if (ticketState.error) {
      alert(`Upload failed: ${ticketState.error}`);
      setLoading(false);
      
    }
  }, [ticketState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (e, index, field, arrayName) => {
    const { value } = e.target;
    setFormData((prev) => {
      if (Array.isArray(prev[arrayName])) {
        const array = [...prev[arrayName]];
        if (arrayName === 'paymentMethods') {
          array[index] = value;
        } else {
          array[index] = { ...array[index], [field]: value };
        }
        return { ...prev, [arrayName]: array };
      } else {
        return {
          ...prev,
          [arrayName]: {
            ...prev[arrayName],
            [field]: value,
          },
        };
      }
    });
  };

  const handleFileChange = (e, index, field) => {
    const file = e.target.files[0];
    setFormData((prev) => {
      const images = [...prev.ticketImages];
      images[index] = { ...images[index], [field]: file };
      return { ...prev, ticketImages: images };
    });
  };

  const addArrayItem = (arrayName, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            Object.entries(item).forEach(([subKey, subValue]) => {
              if (subKey === 'imageFile' || subKey === 'mobileImageFile') {
                data.append(`${key}[${index}][${subKey}]`, subValue);
              } else {
                data.append(`${key}[${index}][${subKey}]`, subValue || '');
              }
            });
          } else {
            data.append(`${key}[${index}]`, item || '');
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          data.append(`${key}[${subKey}]`, subValue || '');
        });
      } else {
        data.append(key, value || '');
      }
    });
  
    dispatch(ticketPost(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Insert</h1>
      {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-opacity-50 bg-gray-100 z-50">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block font-medium">Destination Code:</label>
          <input name="destinationCode" value={formData.destinationCode} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Name:</label>
          <input name="name" value={formData.name} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">No Of Tickets:</label>
          <input name="noOfTickets" value={formData.noOfTickets} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} className="border rounded px-4 py-2 w-full"></textarea>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Payment Methods:</label>
          {formData.paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                value={method}
                onChange={(e) => handleNestedInputChange(e, index, '', 'paymentMethods')}
                className="border rounded px-4 py-2 w-full"
              />
              <button type="button" onClick={() => addArrayItem('paymentMethods', '')} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Type Code:</label>
          <input name="ticketTypeCode" value={formData.ticketTypeCode} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Valid From:</label>
          <input name="validFrom" value={formData.validFrom} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Valid Till:</label>
          <input name="validTill" value={formData.validTill} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Group Code:</label>
          <input name="ticketGroupCode" value={formData.ticketGroupCode} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Origin Code:</label>
          <input name="ticketOriginCode" value={formData.ticketOriginCode} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Pricing:</label>
          <div className="space-y-2">
            <label className="block font-medium">Currency Code:</label>
            <input
              name="currencyCode"
              value={formData.ticketPricing.currencyCode}
              onChange={(e) => handleNestedInputChange(e, 0, 'currencyCode', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Valid From:</label>
            <input
              name="validFrom"
              value={formData.ticketPricing.validFrom}
              onChange={(e) => handleNestedInputChange(e, 0, 'validFrom', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Valid Till:</label>
            <input
              name="validTill"
              value={formData.ticketPricing.validTill}
              onChange={(e) => handleNestedInputChange(e, 0, 'validTill', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Base Price:</label>
            <input
              name="basePrice"
              value={formData.ticketPricing.basePrice}
              onChange={(e) => handleNestedInputChange(e, 0, 'basePrice', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Tax Percentage:</label>
            <input
              name="taxPercentage"
              value={formData.ticketPricing.taxPercentage}
              onChange={(e) => handleNestedInputChange(e, 0, 'taxPercentage', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Discount:</label>
            <input
              name="discount"
              value={formData.ticketPricing.discount}
              onChange={(e) => handleNestedInputChange(e, 0, 'discount', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Discount Mode:</label>
            <input
              name="discountMode"
              value={formData.ticketPricing.discountMode}
              onChange={(e) => handleNestedInputChange(e, 0, 'discountMode', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Special Price:</label>
            <input
              name="specialPrice"
              value={formData.ticketPricing.specialPrice}
              onChange={(e) => handleNestedInputChange(e, 0, 'specialPrice', 'ticketPricing')}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Images:</label>
          {formData.ticketImages.map((image, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block font-medium">Display Order:</label>
                <input
                  value={image.displayOrder}
                  onChange={(e) => handleNestedInputChange(e, index, 'displayOrder', 'ticketImages')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Image File:</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index, 'imageFile')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Mobile Image File:</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index, 'mobileImageFile')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Valid From:</label>
                <input
                  value={image.validFrom}
                  onChange={(e) => handleNestedInputChange(e, index, 'validFrom', 'ticketImages')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Valid Till:</label>
                <input
                  value={image.validTill}
                  onChange={(e) => handleNestedInputChange(e, index, 'validTill', 'ticketImages')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('ticketImages', {
            displayOrder: '',
            imageFile: null,
            mobileImageFile: null,
            validFrom: '',
            validTill: ''
          })} className="bg-blue-500 text-white px-2 py-1 rounded">Add Ticket Image</button>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Sessions:</label>
          {formData.ticketSessions.map((session, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block font-medium">Display Name:</label>
                <input
                  value={session.displayName}
                  onChange={(e) => handleNestedInputChange(e, index, 'displayName', 'ticketSessions')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Valid From:</label>
                <input
                  value={session.validFrom}
                  onChange={(e) => handleNestedInputChange(e, index, 'validFrom', 'ticketSessions')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Valid Till:</label>
                <input
                  value={session.validTill}
                  onChange={(e) => handleNestedInputChange(e, index, 'validTill', 'ticketSessions')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Day Start From:</label>
                <input
                  value={session.dayStartFrom}
                  onChange={(e) => handleNestedInputChange(e, index, 'dayStartFrom', 'ticketSessions')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Day End To:</label>
                <input
                  value={session.dayEndTo}
                  onChange={(e) => handleNestedInputChange(e, index, 'dayEndTo', 'ticketSessions')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Day:</label>
                <input
                  value={session.day}
                  onChange={(e) => handleNestedInputChange(e, index, 'day', 'ticketSessions')}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('ticketSessions', {
            displayName: '',
            validFrom: '',
            validTill: '',
            dayStartFrom: '',
            dayEndTo: '',
            day: ''
          })} className="bg-blue-500 text-white px-2 py-1 rounded">Add Ticket Session</button>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Registration Valid From:</label>
          <input name="registrationValidFrom" value={formData.registrationValidFrom} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Registration Valid Till:</label>
          <input name="registrationValidTill" value={formData.registrationValidTill} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Validity No Of Days:</label>
          <input
            name="noOfDays"
            value={formData.ticketValidity.noOfDays}
            onChange={(e) => handleNestedInputChange(e, 0, 'noOfDays', 'ticketValidity')}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">QR Release Format Code:</label>
          <input name="qrReleaseFormatCode" value={formData.qrReleaseFormatCode} onChange={handleInputChange} className="border rounded px-4 py-2 w-full" />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}