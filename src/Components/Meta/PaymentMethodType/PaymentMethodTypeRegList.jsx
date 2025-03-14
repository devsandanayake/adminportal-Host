import React, { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "../../Destination/custom.css";

DataTable.use(DT);

const PaymentmethodTypeList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    version: "",
    code: "",
    icon: "",
  });

  // const entitytypes = [
  //   { version: "US Dollar", name: "USD", code: "840", IsLocal: "YES", isactivestatus: "YES",  isActive: true, id: 1 },
  //   { version: "Euro", name: "EUR", code: "978",IsLocal: "YES", isactivestatus: "YES",  isActive: false, id: 2 },
  //   { version: "Sri Lankan Rupee", name: "LKR", code: "144",IsLocal: "YES", isactivestatus: "YES",  isActive: true, id: 3 },
  //   { version: "British Pound", name: "GBP", code: "826",IsLocal: "YES", isactivestatus: "YES", isActive: true, id: 4 },
  // ];

  const columns = [
    { title: "Version", data: "version" },
    { title: "Name", data: "name" },
    { title: "Code", data: "code" },
    { title: "Is Active", data: "isactivestatus" },
    { title: "Icon", data: "icon" },
    {
      title: "Status",
      data: "isActive",
      render: (data) => (data ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Inactive</span>'),
    },
    {
      title: "Action",
      data: null,
      render: (_, __, row) =>
        `<div style="display: flex; gap: 10px;">
          <button class="btn btn-danger" data-id="${row.id}" title="Delete">
            <i class="ri-delete-bin-2-fill"></i>
          </button>
          <button class="btn btn-primary" data-id="${row.id}" title="Update">
            <i class="ri-tools-fill"></i>
          </button>
          
        </div>`,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setShowPopup(false);
  };

  return (
    <div className="devicetype-list">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <h1 className="flex-1">Payment Method Type</h1>
            <button className="btn btn-md btn-primary" onClick={() => setShowPopup(true)}>
              Add Payment Method Type
            </button>
          </div>
        </div>
        <div className="card-body">
          <DataTable
            // data={entitytypes}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <h1>Create Form <span class="badge bg-primary">Payment Method Type</span></h1>
           <br></br>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Version :</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name :</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Code :</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Icon :</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group space-x-3">
                <button type="submit" className="btn btn-primary">
                  Add Payment Method Type
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentmethodTypeList;
