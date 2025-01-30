import React, { useEffect, useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import './custom.css';
import { useDispatch, useSelector } from "react-redux";
import { getDestinationDestailsForTable } from "../../actions/Destination/destinationAction";

DataTable.use(DT);

const DestinationList = () => {
  const dispatch = useDispatch();
  const destinationDetails = useSelector(state => state.destination);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    dispatch(getDestinationDestailsForTable());
  }, [dispatch]);

  useEffect(() => {
    if (destinationDetails.success) {
      setDestinations(destinationDetails.data);
    }
  }, [destinationDetails]);

  const columns = [
  { title: "Entity", data: "entity" },
  { title: "Name", data: "name" },
  { title: "UUID", data: "uuid" },
  { title: "Location", data: "location.name" },
  { title: "Created At", data: "createdAt" },
  { title: "Status", data: "isActive", render: data => data ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Inactive</span>' },
  { title: "Action", data: null, render: (data, type, row) => `
    <div style="display: flex; gap: 10px;">
      <a href="/cancellation/${row.id}" style="color: blue;">
        <i class="bi bi-eye"></i>
      </a>
      <button class="" style="color: green;">
        <i class="bi bi-people"></i>
      </button>
      <button class="" style="color: red;">
        <i class="ri-tools-fill"></i>
      </button>
    </div>
  ` }
];

  return (
    <div className={`destination-list`}>
      <div className={`card`}>
        <div className={`card-header`}>
          <div className={`d-flex align-items-center`}>
            <h1 className={`flex-1`}>Destinations</h1>
            <a href={'/destinationRegistartion'} className={`btn btn-sm btn-primary`}>Add New Destination</a>
          </div>
        </div>
        <div className={`card-body`}>
          <DataTable
            data={destinations}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationList;