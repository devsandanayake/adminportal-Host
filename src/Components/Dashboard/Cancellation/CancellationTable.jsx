import React from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import sampleData from './sampleData.json';
 

export default function CancellationTable() {
  DataTable.use(DT);

  // Define column mappings
  const columns = [
    { title: 'Entity', data: 'Entity' },
    { title: 'BookingID', data: 'BookingID' },
    { title: 'User Name', data: 'UserName' },
    { title: 'UUID', data: 'UUID' },
    { title: 'Location', data: 'Location' },
    { title: 'Created At', data: 'CreatedAt' },
    { title: 'Status', data: 'Status' },
    {
        title: 'Action',
        data: null,
        render: (data, type, row) =>
          `
           <div style="display: flex; gap: 10px;">
          <a href="/cancellation/${row.BookingID}" style="color: blue;">
            <i class="bi bi-eye"></i>
          </a>
          <button class="" style="color: green;">
            <i class="ri-shield-check-fill"></i>
          </button>

           <button class="" style="color: red;">
           <i class="ri-tools-fill"></i>
          </button>
        </div>
          `,
      },
  ];

  return (
    <div>
      <div className="pagetitle">
        <h1>Cancellation Details</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Cancellation</li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <h1 className="flex-1">Cancellation</h1>
          </div>
        </div>
        <div className="card-body">
          <DataTable
            data={sampleData}
            columns={columns}
            className="display table table-bordered"
          />
        </div>
      </div>
    </div>
  );
}