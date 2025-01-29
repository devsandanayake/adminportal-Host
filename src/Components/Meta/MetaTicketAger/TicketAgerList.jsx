import React, { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "../../Destination/custom.css";

DataTable.use(DT);

const AgeGroupList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    min_age: "",
    max_age: "",
    version: "",
    isActive: true,
  });

  const ageGroups = [
    { id: 1, name: "ADULT", code: "ADULT", min_age: 18, max_age: 60, version: 1, is_active: true, status: "Active" },
    { id: 2, name: "CHILD", code: "CHILD", min_age: 5, max_age: 16, version: 1, is_active: true, status: "Active" },
  ];

  const columns = [
    { title: "Name", data: "name" },
    { title: "Code", data: "code" },
    { title: "Min Age", data: "min_age" },
    { title: "Max Age", data: "max_age" },
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
    <div className="age-group-list">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <h1 className="flex-1">Age Group List</h1>
            <button className="btn btn-md btn-primary" onClick={() => setShowPopup(true)}>
              Add Age Group
            </button>
          </div>
        </div>
        <div className="card-body">
          <DataTable
            data={ageGroups}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h1>Create Form <span className="badge bg-primary">Age Group</span></h1>
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
                <label>Min Age :</label>
                <input
                  type="number"
                  name="min_age"
                  className="form-control"
                  value={formData.min_age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Max Age :</label>
                <input
                  type="number"
                  name="max_age"
                  className="form-control"
                  value={formData.max_age}
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
                  Add Age Group
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

export default AgeGroupList;
