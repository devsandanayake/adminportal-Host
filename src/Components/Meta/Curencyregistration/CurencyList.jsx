import React, { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "../../Destination/custom.css";

DataTable.use(DT);

const CurencyList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    image: null,
  });

  const destinations = [
    { name: "US Dollar", code: "USD", iscode: "840", isactivestatus: "YES", icon: "usd.png", isActive: true, id: 1 },
    { name: "Euro", code: "EUR", iscode: "978", isactivestatus: "YES", icon: "euro.png", isActive: false, id: 2 },
    { name: "Sri Lankan Rupee", code: "LKR", iscode: "144", isactivestatus: "YES", icon: "lkr.png", isActive: true, id: 3 },
    { name: "British Pound", code: "GBP", iscode: "826", isactivestatus: "YES", icon: "gbp.png", isActive: true, id: 4 },
  ];

  const columns = [
    { title: "Name", data: "name" },
    { title: "Code", data: "code" },
    { title: "ISO Code", data: "iscode" },
    { title: "Icon", data: "icon" },
    { title: "Is Active", data: "isactivestatus" },
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

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setShowPopup(false);
  };

  return (
    <div className="curency-list">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <h1 className="flex-1">Currency</h1>
            <button className="btn btn-md btn-primary" onClick={() => setShowPopup(true)}>
              Add New Currency
            </button>
          </div>
        </div>
        <div className="card-body">
          <DataTable
            data={destinations}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <h1>Create Form <span class="badge bg-primary">Curency</span></h1>
           <br></br>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name :</label>
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
                <label>ISO Code :</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="isActive" className="block font-medium mb-2">
                  Status:
                </label>
                <select
                  id="isActive"
                  name="isActive"
                  className="form-control"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Deactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Upload Icon</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className="form-group space-x-3">
                <button type="submit" className="btn btn-primary">
                  Add Curency
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

export default CurencyList;
