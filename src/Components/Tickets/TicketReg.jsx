import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tickectPost } from '../../actions/Tickets/ticketsAction';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function TicketsRegisteration() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    destinationCode: "EDD_676A792B68ED0",
    name: "Pinnawala Entrace Ticket",
    noOfTickets: "1000",
    description: "Gate Entrance",
    paymentMethods: ["VISA_ON", "MASTER_CARD_ON"],
    ticketTypeCode: "DST_ENTRANCE_TICKET",
    validFrom: "2024-12-10 00:00:00",
    validTill: "2025-12-10 00:00:00",
    ticketGroupCode: "ENTRANCE_TICKETS_LOCAL",
    ticketOriginCode: "FOREIGN",
    ticketPricing: {
      currencyCode: "USD",
      validFrom: "2024-12-10 00:00:00",
      validTill: "2025-12-10 00:00:00",
      basePrice: "250"
    },
    ticketImages: [
      {
        displayOrder: "1",
        imageFile: null,
        mobileImageFile: null,
        validFrom: "2024-12-10 00:00:00",
        validTill: "2025-12-10 00:00:00"
      }
    ],
    ticketSession: [
      {
        displayName: "Tuesday",
        validFrom: "2024-12-10 00:00:00",
        validTill: "2025-12-10 00:00:00",
        dayStartFrom: "09:00:00",
        dayEndTo: "16:00:00",
        day: "Monday"
      }
    ],
    registrationValidFrom: "2024-12-10 00:00:00",
    registrationValidTill: "2025-12-10 00:00:00",
    ticketAgerCode: "ADULT",
    ticketValidity: {
      noOfDays: "10"
    },
    qrReleaseFormatCode: "PER_BOOKING"
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, index, field) => {
    const file = e.target.files[0];
    setFormData((prev) => {
      const images = [...prev.ticketImages];
      images[index][field] = file;
      return { ...prev, ticketImages: images };
    });
  };

  const handleImageFieldChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const images = [...prev.ticketImages];
      images[index][field] = value;
      return { ...prev, ticketImages: images };
    });
  };

  const handleSessionFieldChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const sessions = [...prev.ticketSession];
      sessions[index][field] = value;
      return { ...prev, ticketSession: sessions };
    });
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      ticketImages: [
        ...prev.ticketImages,
        {
          displayOrder: "",
          imageFile: null,
          mobileImageFile: null,
          validFrom: "",
          validTill: ""
        }
      ]
    }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => {
      const images = [...prev.ticketImages];
      images.splice(index, 1);
      return { ...prev, ticketImages: images };
    });
  };

  const addSessionField = () => {
    setFormData((prev) => ({
      ...prev,
      ticketSession: [
        ...prev.ticketSession,
        {
          displayName: "",
          validFrom: "",
          validTill: "",
          dayStartFrom: "",
          dayEndTo: "",
          day: ""
        }
      ]
    }));
  };

  const removeSessionField = (index) => {
    setFormData((prev) => {
      const sessions = [...prev.ticketSession];
      sessions.splice(index, 1);
      return { ...prev, ticketSession: sessions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
  
    // Add basic fields
    data.append("destinationCode", formData.destinationCode);
    data.append("name", formData.name);
    data.append("noOfTickets", formData.noOfTickets);
    data.append("description", formData.description);
    formData.paymentMethods.forEach((method, index) => {
        data.append(`paymentMethods[${index}]`, method);
      });
    data.append("ticketTypeCode", formData.ticketTypeCode);
    data.append("validFrom", moment(formData.validFrom).format("YYYY-MM-DD HH:mm:ss"));
    data.append("validTill", moment(formData.validTill).format("YYYY-MM-DD HH:mm:ss"));
    data.append("ticketGroupCode", formData.ticketGroupCode);
    data.append("ticketOriginCode", formData.ticketOriginCode);
  
    // Add ticketPricing object
    data.append("ticketPricing[currencyCode]", formData.ticketPricing.currencyCode);
    data.append("ticketPricing[validFrom]", moment(formData.ticketPricing.validFrom).format("YYYY-MM-DD HH:mm:ss"));
    data.append("ticketPricing[validTill]",  moment(formData.ticketPricing.validTill).format("YYYY-MM-DD HH:mm:ss"));
    data.append("ticketPricing[basePrice]", formData.ticketPricing.basePrice);
  
    // Add ticketImages array
    formData.ticketImages.forEach((image, index) => {
      data.append(`ticketImages[${index}][displayOrder]`, image.displayOrder);
      if (image.imageFile) {
        data.append(`ticketImages[${index}][imageFile]`, image.imageFile);
      }
      if (image.mobileImageFile) {
        data.append(`ticketImages[${index}][mobileImageFile]`, image.mobileImageFile);
      }
      data.append(`ticketImages[${index}][validFrom]`, moment(image.validFrom).format("YYYY-MM-DD HH:mm:ss"));
      data.append(`ticketImages[${index}][validTill]`, moment(image.validTill).format("YYYY-MM-DD HH:mm:ss"));
    });
  
    // Add ticketSession array
    formData.ticketSession.forEach((session, index) => {
      data.append(`ticketSession[${index}][displayName]`, session.displayName);
      data.append(`ticketSession[${index}][validFrom]`, moment(session.validFrom).format("YYYY-MM-DD HH:mm:ss"));
      data.append(`ticketSession[${index}][validTill]`, moment(session.validTill).format("YYYY-MM-DD HH:mm:ss"));
         data.append(`ticketSession[${index}][dayStartFrom]`, session.dayStartFrom + ":00");
    data.append(`ticketSession[${index}][dayEndTo]`, session.dayEndTo + ":00");
      data.append(`ticketSession[${index}][day]`, session.day);
    });
  
    // Add other fields
    data.append("registrationValidFrom", moment(formData.registrationValidFrom).format("YYYY-MM-DD HH:mm:ss"));
    data.append("registrationValidTill", moment(formData.registrationValidTill).format("YYYY-MM-DD HH:mm:ss"));
    data.append("ticketAgerCode", formData.ticketAgerCode);
    data.append("ticketValidity[noOfDays]", formData.ticketValidity.noOfDays);
    data.append("qrReleaseFormatCode", formData.qrReleaseFormatCode);
  
    // Dispatch action
    dispatch(tickectPost(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block font-medium">Destination Code:</label>
          <input
            name="destinationCode"
            value={formData.destinationCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
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
          <label className="block font-medium">Number of Tickets:</label>
          <input
            name="noOfTickets"
            value={formData.noOfTickets}
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
          <label className="block font-medium">Payment Methods:</label>
          <select
            name="paymentMethods"
            value={formData.paymentMethods}
            onChange={(e) => setFormData({ ...formData, paymentMethods: Array.from(e.target.selectedOptions, option => option.value) })}
            className="border rounded px-4 py-2 w-full"
            multiple
          >
            <option value="VISA_ON">VISA_ON</option>
            <option value="MASTER_CARD_ON">MASTER_CARD_ON</option>
            {/* Add more options here if needed */}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Type Code:</label>
          <input
            name="ticketTypeCode"
            value={formData.ticketTypeCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Valid From:</label>
          <input
            type="datetime-local"
            name="validFrom"
            value={formData.validFrom}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Valid Till:</label>
          <input
            type="datetime-local"
            name="validTill"
            value={formData.validTill}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Group Code:</label>
          <input
            name="ticketGroupCode"
            value={formData.ticketGroupCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Origin Code:</label>
          <input
            name="ticketOriginCode"
            value={formData.ticketOriginCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Pricing:</label>
          <div className="space-y-2">
            <label className="block font-medium">Currency Code:</label>
            <input
              name="currencyCode"
              value={formData.ticketPricing.currencyCode}
              onChange={(e) => setFormData({ ...formData, ticketPricing: { ...formData.ticketPricing, currencyCode: e.target.value } })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Valid From:</label>
            <input
              type="datetime-local"
              name="ticketPricingValidFrom"
              value={formData.ticketPricing.validFrom}
              onChange={(e) => setFormData({ ...formData, ticketPricing: { ...formData.ticketPricing, validFrom: e.target.value } })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Valid Till:</label>
            <input
              type="datetime-local"
              name="ticketPricingValidTill"
              value={formData.ticketPricing.validTill}
              onChange={(e) => setFormData({ ...formData, ticketPricing: { ...formData.ticketPricing, validTill: e.target.value } })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Base Price:</label>
            <input
              name="basePrice"
              value={formData.ticketPricing.basePrice}
              onChange={(e) => setFormData({ ...formData, ticketPricing: { ...formData.ticketPricing, basePrice: e.target.value } })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-medium">Ticket Images:</h2>
          {formData.ticketImages.map((image, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <input
                type="number"
                value={image.displayOrder}
                onChange={(e) => handleImageFieldChange(e, index, "displayOrder")}
                placeholder="Display Order"
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index, "imageFile")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index, "mobileImageFile")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="datetime-local"
                value={image.validFrom}
                onChange={(e) => handleImageFieldChange(e, index, "validFrom")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="datetime-local"
                value={image.validTill}
                onChange={(e) => handleImageFieldChange(e, index, "validTill")}
                className="border rounded px-4 py-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium">Ticket Sessions:</h2>
          {formData.ticketSession.map((session, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <input
                value={session.displayName}
                onChange={(e) => handleSessionFieldChange(e, index, "displayName")}
                placeholder="Display Name"
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="datetime-local"
                value={session.validFrom}
                onChange={(e) => handleSessionFieldChange(e, index, "validFrom")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="datetime-local"
                value={session.validTill}
                onChange={(e) => handleSessionFieldChange(e, index, "validTill")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="time"
                value={session.dayStartFrom}
                onChange={(e) => handleSessionFieldChange(e, index, "dayStartFrom")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                type="time"
                value={session.dayEndTo}
                onChange={(e) => handleSessionFieldChange(e, index, "dayEndTo")}
                className="border rounded px-4 py-2 w-full"
              />
              <input
                value={session.day}
                onChange={(e) => handleSessionFieldChange(e, index, "day")}
                placeholder="Day"
                className="border rounded px-4 py-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeSessionField(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSessionField}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Session
          </button>
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Registration Valid From:</label>
          <input
            type="datetime-local"
            name="registrationValidFrom"
            value={formData.registrationValidFrom}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Registration Valid Till:</label>
          <input
            type="datetime-local"
            name="registrationValidTill"
            value={formData.registrationValidTill}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Ager Code:</label>
          <input
            name="ticketAgerCode"
            value={formData.ticketAgerCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Ticket Validity (No of Days):</label>
          <input
            name="noOfDays"
            value={formData.ticketValidity.noOfDays}
            onChange={(e) => setFormData({ ...formData, ticketValidity: { ...formData.ticketValidity, noOfDays: e.target.value } })}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">QR Release Format Code:</label>
          <input
            name="qrReleaseFormatCode"
            value={formData.qrReleaseFormatCode}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}