import React, { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "../../Destination/custom.css";

DataTable.use(DT);

const OrderStatusList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    version: "",
    isActive: true,
  });

  const orderStatuses = [
    { id: 1, name: "ORDERED", code: "ORDERED", version: 1, is_active: true, status: "Active" },
    { id: 2, name: "QR_RELEASED", code: "QR_RELEASED", version: 1, is_active: true, status: "Active" },
    { id: 3, name: "PARTIALLY_USED", code: "PARTIALLY_USED", version: 1, is_active: true, status: "Active" },
    { id: 4, name: "SCANNED_UTILIZED", code: "SCANNED_UTILIZED", version: 1, is_active: true, status: "Active" },
  ];

  const columns = [
    { title: "Name", data: "name" },
    { title: "Code", data: "code" },
    { title: "Version", data: "version" },
    { title: "Is Active", data: "is_active" },
    {
      title: "Status",
      data: "status",
      render: (data) => (
        data === "Active" ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Inactive</span>'
      ),
    },
    {
      title: "Action",
      data: null,
      render: (_, __, row) => (
        `<div style="display: flex; gap: 10px;">
          <button class="btn btn-danger" data-id="${row.id}" title="Delete">
            <i class="ri-delete-bin-2-fill"></i>
          </button>
          <button class="btn btn-primary" data-id="${row.id}" title="Update">
            <i class="ri-tools-fill"></i>
          </button>
        </div>`
      ),
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
    <div className="order-status-list">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <h1 className="flex-1">Order Status List</h1>
            <button className="btn btn-md btn-primary" onClick={() => setShowPopup(true)}>
              Add Order Status
            </button>
          </div>
        </div>
        <div className="card-body">
          <DataTable
            data={orderStatuses}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h1>Create Form <span className="badge bg-primary">Order Status</span></h1>
            <br />
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
                  type="text"
                  name="code"
                  className="form-control"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Version :</label>
                <input
                  type="number"
                  name="version"
                  className="form-control"
                  value={formData.version}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Is Active :</label>
                <select
                  name="isActive"
                  className="form-control"
                  value={formData.isActive}
                  onChange={handleInputChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              <div className="form-group space-x-3">
                <button type="submit" className="btn btn-primary">
                  Add Order Status
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

export default OrderStatusList;
