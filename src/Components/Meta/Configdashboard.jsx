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
import PaymentmethodTypeList from "./PaymentMethodType/PaymentMethodTypeRegList"
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Meta Data Handler</h5>

          {/* Default Tabs */}
          <ul className="nav nav-tabs d-flex" role="tablist">
          <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "currency" ? "active" : ""}`}
                onClick={() => handleTabClick("currency")}
                type="button"
                role="tab"
                aria-controls="currency"
                aria-selected={activeTab === "currency"}
              >
                Currency Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "address" ? "active" : ""}`}
                onClick={() => handleTabClick("address")}
                type="button"
                role="tab"
                aria-controls="address"
                aria-selected={activeTab === "address"}
              >
                Address Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "booking" ? "active" : ""}`}
                onClick={() => handleTabClick("booking")}
                type="button"
                role="tab"
                aria-controls="booking"
                aria-selected={activeTab === "booking"}
              >
                Booking Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "device" ? "active" : ""}`}
                onClick={() => handleTabClick("device")}
                type="button"
                role="tab"
                aria-controls="device"
                aria-selected={activeTab === "device"}
              >
                Device Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "contacttype" ? "active" : ""}`}
                onClick={() => handleTabClick("contacttype")}
                type="button"
                role="tab"
                aria-controls="contacttype"
                aria-selected={activeTab === "contacttype"}
              >
                Contact Type Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "taglist" ? "active" : ""}`}
                onClick={() => handleTabClick("taglist")}
                type="button"
                role="tab"
                aria-controls="taglist"
                aria-selected={activeTab === "taglist"}
              >
                Tag List Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "devicetype" ? "active" : ""}`}
                onClick={() => handleTabClick("devicetype")}
                type="button"
                role="tab"
                aria-controls="devicetype"
                aria-selected={activeTab === "devicetype"}
              >
                Device Type Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "entitytype" ? "active" : ""}`}
                onClick={() => handleTabClick("entitytype")}
                type="button"
                role="tab"
                aria-controls="entitytype"
                aria-selected={activeTab === "entitytype"}
              >
                Entity Type Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "geolocation" ? "active" : ""}`}
                onClick={() => handleTabClick("geolocation")}
                type="button"
                role="tab"
                aria-controls="geolocation"
                aria-selected={activeTab === "geolocation"}
              >
                Geo Location Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "paymentmethod" ? "active" : ""}`}
                onClick={() => handleTabClick("paymentmethod")}
                type="button"
                role="tab"
                aria-controls="paymentmethod"
                aria-selected={activeTab === "paymentmethod"}
              >
                Payment Method Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "paymentmethodtype" ? "active" : ""}`}
                onClick={() => handleTabClick("paymentmethodtype")}
                type="button"
                role="tab"
                aria-controls="paymentmethodtype"
                aria-selected={activeTab === "paymentmethodtype"}
              >
                Payment Method Type Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "paymentstate" ? "active" : ""}`}
                onClick={() => handleTabClick("paymentstate")}
                type="button"
                role="tab"
                aria-controls="paymentstate"
                aria-selected={activeTab === "paymentstate"}
              >
                Payment State Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "qrformat" ? "active" : ""}`}
                onClick={() => handleTabClick("qrformat")}
                type="button"
                role="tab"
                aria-controls="qrformat"
                aria-selected={activeTab === "qrformat"}
              >
                Qr Format Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "ReviewMode" ? "active" : ""}`}
                onClick={() => handleTabClick("ReviewMode")}
                type="button"
                role="tab"
                aria-controls="ReviewMode"
                aria-selected={activeTab === "ReviewMode"}
              >
                Review Mode Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "TagType" ? "active" : ""}`}
                onClick={() => handleTabClick("TagType")}
                type="button"
                role="tab"
                aria-controls="TagType"
                aria-selected={activeTab === "TagType"}
              >
                Tag Type Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "Ticketager" ? "active" : ""}`}
                onClick={() => handleTabClick("Ticketager")}
                type="button"
                role="tab"
                aria-controls="Ticketager"
                aria-selected={activeTab === "Ticketager"}
              >
                Ticket ager Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "TicketOrigin" ? "active" : ""}`}
                onClick={() => handleTabClick("TicketOrigin")}
                type="button"
                role="tab"
                aria-controls="TicketOrigin"
                aria-selected={activeTab === "TicketOrigin"}
              >
                Ticket Origin Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "TicketState" ? "active" : ""}`}
                onClick={() => handleTabClick("TicketState")}
                type="button"
                role="tab"
                aria-controls="TicketState"
                aria-selected={activeTab === "TicketState"}
              >
                Ticket State Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "TicketType" ? "active" : ""}`}
                onClick={() => handleTabClick("TicketType")}
                type="button"
                role="tab"
                aria-controls="TicketType"
                aria-selected={activeTab === "TicketType"}
              >
                Ticket Type Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "Category" ? "active" : ""}`}
                onClick={() => handleTabClick("Category")}
                type="button"
                role="tab"
                aria-controls="Category"
                aria-selected={activeTab === "Category"}
              >
                Tour Category Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "SubCategory" ? "active" : ""}`}
                onClick={() => handleTabClick("SubCategory")}
                type="button"
                role="tab"
                aria-controls="SubCategory"
                aria-selected={activeTab === "SubCategory"}
              >
                Tour SubCategory Management
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link w-100 ${activeTab === "Validity" ? "active" : ""}`}
                onClick={() => handleTabClick("Validity")}
                type="button"
                role="tab"
                aria-controls="Validity"
                aria-selected={activeTab === "Validity"}
              >
                Validity Period Management
              </button>
            </li>
          </ul>

          <div className="tab-content pt-2">
          <div
              className={`tab-pane fade ${activeTab === "currency" ? "show active" : ""}`}
              id="currency"
              role="tabpanel"
              aria-labelledby="currency-tab"
            >
              <CurencyList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "address" ? "show active" : ""}`}
              id="address"
              role="tabpanel"
              aria-labelledby="address-tab"
            >
              <AddressList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "booking" ? "show active" : ""}`}
              id="booking"
              role="tabpanel"
              aria-labelledby="booking-tab"
            >
              <BookingList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "device" ? "show active" : ""}`}
              id="device"
              role="tabpanel"
              aria-labelledby="device-tab"
            >
              <ClientDeviceList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "contacttype" ? "show active" : ""}`}
              id="contacttype"
              role="tabpanel"
              aria-labelledby="contacttype-tab"
            >
              <ContacttypeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "taglist" ? "show active" : ""}`}
              id="taglist"
              role="tabpanel"
              aria-labelledby="taglist-tab"
            >
              <DestiReTagList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "devicetype" ? "show active" : ""}`}
              id="devicetype"
              role="tabpanel"
              aria-labelledby="devicetype-tab"
            >
              <DeviceTypeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "entitytype" ? "show active" : ""}`}
              id="entitytype"
              role="tabpanel"
              aria-labelledby="entitytype-tab"
            >
              <EntityTypeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "geolocation" ? "show active" : ""}`}
              id="geolocation"
              role="tabpanel"
              aria-labelledby="geolocation-tab"
            >
              <GeolocationList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "paymentmethod" ? "show active" : ""}`}
              id="paymentmethod"
              role="tabpanel"
              aria-labelledby="paymentmethod-tab"
            >
              <PaymentmethodList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "paymentmethodtype" ? "show active" : ""}`}
              id="paymentmethodtype"
              role="tabpanel"
              aria-labelledby="paymentmethodtype-tab"
            >
              <PaymentmethodTypeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "paymentstate" ? "show active" : ""}`}
              id="paymentstate"
              role="tabpanel"
              aria-labelledby="paymentstate-tab"
            >
              <PaymentStateList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "qrformat" ? "show active" : ""}`}
              id="qrformat"
              role="tabpanel"
              aria-labelledby="qrformat-tab"
            >
              <QrFormatList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "ReviewMode" ? "show active" : ""}`}
              id="ReviewMode"
              role="tabpanel"
              aria-labelledby="ReviewMode-tab"
            >
              <ReviewModeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "TagType" ? "show active" : ""}`}
              id="TagType"
              role="tabpanel"
              aria-labelledby="TagType-tab"
            >
              <MetaTagTypeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "Ticketager" ? "show active" : ""}`}
              id="Ticketager"
              role="tabpanel"
              aria-labelledby="Ticketager-tab"
            >
              <TicketAgerList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "TicketOrigin" ? "show active" : ""}`}
              id="TicketOrigin"
              role="tabpanel"
              aria-labelledby="TicketOrigin-tab"
            >
              <TicketOriginList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "TicketState" ? "show active" : ""}`}
              id="TicketState"
              role="tabpanel"
              aria-labelledby="TicketState-tab"
            >
              <TicketStateList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "TicketType" ? "show active" : ""}`}
              id="TicketType"
              role="tabpanel"
              aria-labelledby="TicketType-tab"
            >
              <TicketTypeList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "Category" ? "show active" : ""}`}
              id="Category"
              role="tabpanel"
              aria-labelledby="Category-tab"
            >
              <TourCategoryList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "SubCategory" ? "show active" : ""}`}
              id="SubCategory"
              role="tabpanel"
              aria-labelledby="SubCategory-tab"
            >
              <TourSubCategoryList />
            </div>
            <div
              className={`tab-pane fade ${activeTab === "Validity" ? "show active" : ""}`}
              id="Validity"
              role="tabpanel"
              aria-labelledby="Validity-tab"
            >
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
