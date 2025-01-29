import React, { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "../../Destination/custom.css";

DataTable.use(DT);

const TimePeriodList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    startFrom: "",
    validTill: "",
    noOfDays: 5,
    noOfMonths: 5,
    noOfYears: 5,
    noOfHours: 5,
    noOfMins: 5,
    isActive: true,
  });

  const timePeriods = [
    { id: 1, startFrom: "", validTill: "", no_of_days: 5, no_of_months: null, no_of_years: null, no_of_hours: null, no_of_mins: null, is_active: true, status: "Active" },
    { id: 2, startFrom: "", validTill: "", no_of_days: 5, no_of_months: null, no_of_years: null, no_of_hours: null, no_of_mins: null, is_active: true, status: "Active" },
    { id: 3, startFrom: "", validTill: "", no_of_days: 5, no_of_months: null, no_of_years: null, no_of_hours: null, no_of_mins: null, is_active: true, status: "Active" },
    { id: 4, startFrom: "", validTill: "", no_of_days: 5, no_of_months: null, no_of_years: null, no_of_hours: null, no_of_mins: null, is_active: true, status: "Active" },
    { id: 5, startFrom: "", validTill: "", no_of_days: 5, no_of_months: null, no_of_years: null, no_of_hours: null, no_of_mins: null, is_active: true, status: "Active" },
    { id: 6, startFrom: "", validTill: "", no_of_days: 5, no_of_months: null, no_of_years: null, no_of_hours: null, no_of_mins: null, is_active: true, status: "Active" },
  ];

  const columns = [
    { title: "Start From", data: "startFrom" },
    { title: "Valid Till", data: "validTill" },
    { title: "No. of Days", data: "no_of_days" },
    { title: "No. of Months", data: "no_of_months" },
    { title: "No. of Years", data: "no_of_years" },
    { title: "No. of Hours", data: "no_of_hours" },
    { title: "No. of Mins", data: "no_of_mins" },
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
    <div className="time-period-list">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <h1 className="flex-1">Time Period List</h1>
            <button className="btn btn-md btn-primary" onClick={() => setShowPopup(true)}>
              Add Time Period
            </button>
          </div>
        </div>
        <div className="card-body">
          <DataTable
            data={timePeriods}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h1>Create Form <span className="badge bg-primary">Time Period</span></h1>
            <br />
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Start From :</label>
                <input
                  type="text"
                  name="startFrom"
                  className="form-control"
                  value={formData.startFrom}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Valid Till :</label>
                <input
                  type="text"
                  name="validTill"
                  className="form-control"
                  value={formData.validTill}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>No. of Days :</label>
                <input
                  type="number"
                  name="noOfDays"
                  className="form-control"
                  value={formData.noOfDays}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>No. of Months :</label>
                <input
                  type="number"
                  name="noOfMonths"
                  className="form-control"
                  value={formData.noOfMonths}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>No. of Years :</label>
                <input
                  type="number"
                  name="noOfYears"
                  className="form-control"
                  value={formData.noOfYears}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>No. of Hours :</label>
                <input
                  type="number"
                  name="noOfHours"
                  className="form-control"
                  value={formData.noOfHours}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>No. of Minutes :</label>
                <input
                  type="number"
                  name="noOfMins"
                  className="form-control"
                  value={formData.noOfMins}
                  onChange={handleInputChange}
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
                  Add Time Period
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

export default TimePeriodList;
