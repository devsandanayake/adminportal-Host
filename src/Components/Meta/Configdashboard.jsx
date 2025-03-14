import React, { useState } from "react";
import CurencyList from "./Curencyregistration/CurencyList";
import AddressList from "./AddressTypeRegistration/AddressList";
import BookingList from "./BookingStateRegistration/BookingList";
import ClientDeviceList from "./DeviceRegistration/DeviceList";
import ContacttypeList from "./Contacttype/ContacttypeList";
import DestiReTagList from "./Desti_reviewtagRegistration/Desti_reviewtagList";
// import DestinationList from "../Destination/DestinationList";
import DeviceTypeList from "./DeviceType/DevicetypeList";
import EntityTypeList from "./EntityType/EntityTypeList";
import GeolocationList from "./GeoLocation/GeoLocationList";
import PaymentmethodList from "./PaymentMethod/PaymentMethodRegList";
import PaymentmethodTypeList from "./PaymentMethodType/PaymentMethodTypeRegList";
import PaymentStateList from "./Paymentstate/PaymentStateRegList";
import QrFormatList from "./QrformatRegistration/QrformatList";
import ReviewModeList from "./MetaReviewMode/ReviewModeList";
import MetaTagTypeList from "./MetaTagType/MetaTagTypeList";
import TicketAgerList from "./MetaTicketAger/TicketAgerList";
import TicketOriginList from "./MetaTicketOrigin/TicketOriginList";
import TicketStateList from "./MetaTicketState/TicketStateList";
import TicketTypeList from "./MetaTicketType/TicketTypeList";
import TourCategoryList from "./MetaTourCategory/TourCategoryList";
import TourSubCategoryList from "./MetaTourSubCategory/TourSubCategoryList";
import ValidityPeriodList from "./MetaValidityPeriod/ValidityPeriodList";

const MetaDashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("currency");
  const [activeTopTab, setActiveTopTab] = useState("merchants");
  const [merchantType, setMerchantType] = useState("Private");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [destinationCategory, setDestinationCategory] = useState("Private");
  const [ownershipType, setOwnershipType] = useState("Private");
  const [ticketOrigin, setTicketOrigin] = useState("CCF");
  const [ticketType, setTicketType] = useState("Local");
  const [ticketAgeCategory, setTicketAgeCategory] = useState("Infants & Toddlers(Below 6 years)");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTopTabClick = (tab) => {
    setActiveTopTab(tab);
  };

  const handleMerchantTypeChange = (event) => {
    setMerchantType(event.target.value);
  };

  const handleBankNameChange = (event) => {
    setBankName(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleDestinationCategoryChange = (event) => {
    setDestinationCategory(event.target.value);
  };

  const handleOwnershipTypeChange = (event) => {
    setOwnershipType(event.target.value);
  };

  const handleTicketOriginChange = (event) => {
    setTicketOrigin(event.target.value);
  };

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handleTicketAgeCategoryChange = (event) => {
    setTicketAgeCategory(event.target.value);
  };

  const bankNames = ["Bank of Ceylon", "Commercial Bank", "Hatton National Bank", "Sampath Bank"];
  const branches = ["Colombo", "Kandy", "Galle", "Jaffna"];

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Meta Data Handler</h5>

          {/* Top Level Tabs */}
          <ul className="nav nav-tabs d-flex" role="tablist">
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTopTab === "merchants" ? "active" : ""}`}
                onClick={() => handleTopTabClick("merchants")}
                type="button"
                role="tab"
                aria-controls="merchants"
                aria-selected={activeTopTab === "merchants"}
              >
                Merchants
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTopTab === "destinations" ? "active" : ""}`}
                onClick={() => handleTopTabClick("destinations")}
                type="button"
                role="tab"
                aria-controls="destinations"
                aria-selected={activeTopTab === "destinations"}
              >
                Destinations
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTopTab === "tickets" ? "active" : ""}`}
                onClick={() => handleTopTabClick("tickets")}
                type="button"
                role="tab"
                aria-controls="tickets"
                aria-selected={activeTopTab === "tickets"}
              >
                Tickets
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTopTab === "users" ? "active" : ""}`}
                onClick={() => handleTopTabClick("users")}
                type="button"
                role="tab"
                aria-controls="users"
                aria-selected={activeTopTab === "users"}
              >
                Users
              </button>
            </li>
          </ul>

          {activeTopTab === "merchants" && (
            <div className="mt-3">
              <div className="mb-3">
                <label htmlFor="merchantType" className="form-label">Merchant Type</label>
                <select id="merchantType" className="form-select" value={merchantType} onChange={handleMerchantTypeChange}>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="bankName" className="form-label">Bank Name</label>
                <select id="bankName" className="form-select" value={bankName} onChange={handleBankNameChange}>
                  <option value="">Select Bank</option>
                  {bankNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="branch" className="form-label">Branch</label>
                <select id="branch" className="form-select" value={branch} onChange={handleBranchChange}>
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTopTab === "destinations" && (
            <div className="mt-3">
              <div className="mb-3">
                <label htmlFor="destinationCategory" className="form-label">Destination Category</label>
                <select id="destinationCategory" className="form-select" value={destinationCategory} onChange={handleDestinationCategoryChange}>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="ownershipType" className="form-label">Ownership Type</label>
                <select id="ownershipType" className="form-select" value={ownershipType} onChange={handleOwnershipTypeChange}>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                </select>
              </div>
            </div>
          )}

          {activeTopTab === "tickets" && (
            <div className="mt-3">
              <div className="mb-3">
                <label htmlFor="ticketOrigin" className="form-label">Ticket Origin</label>
                <select id="ticketOrigin" className="form-select" value={ticketOrigin} onChange={handleTicketOriginChange}>
                  <option value="CCF">CCF</option>
                  <option value="Wildlife">Wildlife</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="ticketType" className="form-label">Ticket Type</label>
                <select id="ticketType" className="form-select" value={ticketType} onChange={handleTicketTypeChange}>
                  <option value="Local">Local</option>
                  <option value="Foreign">Foreign</option>
                  <option value="SAARC">SAARC</option>
                  <option value="Non-SAARC">Non-SAARC</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="ticketAgeCategory" className="form-label">Ticket Age Category</label>
                <select id="ticketAgeCategory" className="form-select" value={ticketAgeCategory} onChange={handleTicketAgeCategoryChange}>
                  <option value="Infants & Toddlers(Below 6 years)">Infants & Toddlers(Below 6 years)</option>
                  <option value="Children">Children</option>
                  <option value="Adults">Adults</option>
                </select>
              </div>
            </div>
          )}

          {/* Dropdown for Meta Data Management */}
          <div className="dropdown mb-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="metaDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select Meta Data Management
            </button>
            <ul className="dropdown-menu" aria-labelledby="metaDropdown">
              <li><button className="dropdown-item" onClick={() => handleTabClick("currency")}>Currency Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("address")}>Address Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("booking")}>Booking Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("device")}>Device Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("contacttype")}>Contact Type Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("taglist")}>Tag List Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("devicetype")}>Device Type Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("entitytype")}>Entity Type Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("geolocation")}>Geo Location Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("paymentmethod")}>Payment Method Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("paymentmethodtype")}>Payment Method Type Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("paymentstate")}>Payment State Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("qrformat")}>Qr Format Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("ReviewMode")}>Review Mode Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("TagType")}>Tag Type Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("Ticketager")}>Ticket Ager Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("TicketOrigin")}>Ticket Origin Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("TicketState")}>Ticket State Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("TicketType")}>Ticket Type Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("Category")}>Tour Category Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("SubCategory")}>Tour SubCategory Management</button></li>
              <li><button className="dropdown-item" onClick={() => handleTabClick("Validity")}>Validity Period Management</button></li>
            </ul>
          </div>

          <div className="tab-content pt-2">
            <div className={`tab-pane fade ${activeTab === "currency" ? "show active" : ""}`} id="currency" role="tabpanel" aria-labelledby="currency-tab">
              <CurencyList />
            </div>
            <div className={`tab-pane fade ${activeTab === "address" ? "show active" : ""}`} id="address" role="tabpanel" aria-labelledby="address-tab">
              <AddressList />
            </div>
            <div className={`tab-pane fade ${activeTab === "booking" ? "show active" : ""}`} id="booking" role="tabpanel" aria-labelledby="booking-tab">
              <BookingList />
            </div>
            <div className={`tab-pane fade ${activeTab === "device" ? "show active" : ""}`} id="device" role="tabpanel" aria-labelledby="device-tab">
              <ClientDeviceList />
            </div>
            <div className={`tab-pane fade ${activeTab === "contacttype" ? "show active" : ""}`} id="contacttype" role="tabpanel" aria-labelledby="contacttype-tab">
              <ContacttypeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "taglist" ? "show active" : ""}`} id="taglist" role="tabpanel" aria-labelledby="taglist-tab">
              <DestiReTagList />
            </div>
            <div className={`tab-pane fade ${activeTab === "devicetype" ? "show active" : ""}`} id="devicetype" role="tabpanel" aria-labelledby="devicetype-tab">
              <DeviceTypeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "entitytype" ? "show active" : ""}`} id="entitytype" role="tabpanel" aria-labelledby="entitytype-tab">
              <EntityTypeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "geolocation" ? "show active" : ""}`} id="geolocation" role="tabpanel" aria-labelledby="geolocation-tab">
              <GeolocationList />
            </div>
            <div className={`tab-pane fade ${activeTab === "paymentmethod" ? "show active" : ""}`} id="paymentmethod" role="tabpanel" aria-labelledby="paymentmethod-tab">
              <PaymentmethodList />
            </div>
            <div className={`tab-pane fade ${activeTab === "paymentmethodtype" ? "show active" : ""}`} id="paymentmethodtype" role="tabpanel" aria-labelledby="paymentmethodtype-tab">
              <PaymentmethodTypeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "paymentstate" ? "show active" : ""}`} id="paymentstate" role="tabpanel" aria-labelledby="paymentstate-tab">
              <PaymentStateList />
            </div>
            <div className={`tab-pane fade ${activeTab === "qrformat" ? "show active" : ""}`} id="qrformat" role="tabpanel" aria-labelledby="qrformat-tab">
              <QrFormatList />
            </div>
            <div className={`tab-pane fade ${activeTab === "ReviewMode" ? "show active" : ""}`} id="ReviewMode" role="tabpanel" aria-labelledby="ReviewMode-tab">
              <ReviewModeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "TagType" ? "show active" : ""}`} id="TagType" role="tabpanel" aria-labelledby="TagType-tab">
              <MetaTagTypeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "Ticketager" ? "show active" : ""}`} id="Ticketager" role="tabpanel" aria-labelledby="Ticketager-tab">
              <TicketAgerList />
            </div>
            <div className={`tab-pane fade ${activeTab === "TicketOrigin" ? "show active" : ""}`} id="TicketOrigin" role="tabpanel" aria-labelledby="TicketOrigin-tab">
              <TicketOriginList />
            </div>
            <div className={`tab-pane fade ${activeTab === "TicketState" ? "show active" : ""}`} id="TicketState" role="tabpanel" aria-labelledby="TicketState-tab">
              <TicketStateList />
            </div>
            <div className={`tab-pane fade ${activeTab === "TicketType" ? "show active" : ""}`} id="TicketType" role="tabpanel" aria-labelledby="TicketType-tab">
              <TicketTypeList />
            </div>
            <div className={`tab-pane fade ${activeTab === "Category" ? "show active" : ""}`} id="Category" role="tabpanel" aria-labelledby="Category-tab">
              <TourCategoryList />
            </div>
            <div className={`tab-pane fade ${activeTab === "SubCategory" ? "show active" : ""}`} id="SubCategory" role="tabpanel" aria-labelledby="SubCategory-tab">
              <TourSubCategoryList />
            </div>
            <div className={`tab-pane fade ${activeTab === "Validity" ? "show active" : ""}`} id="Validity" role="tabpanel" aria-labelledby="Validity-tab">
              <ValidityPeriodList />
            </div>
          </div>
          {/* End Default Tabs */}
        </div>
      </div>
    </div>
  );
};

export default MetaDashboardTabs;