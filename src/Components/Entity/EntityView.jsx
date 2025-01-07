import React from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import sampleData from './sampleData.json';

export default function EntityView() {
  DataTable.use(DT);

  // Define column mappings
  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Name', data: 'name' },
    { title: 'Entity Type Code', data: 'entityTypeCode' },
    { title: 'Description', data: 'description' },
    {
      title: 'Branches',
      data: 'entityBranches',
      render: (data, type, row) => {
        return data.map(branch => `
          <div>
            <strong>${branch.branchName}</strong> 
          </div>
        `).join('<hr />');
      }
    },
    {
      title: 'Action',
      data: null,
      render: (data, type, row) =>
        `
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
        `,
    },
  ];

  return (
    <div>
      <div className="pagetitle">
        <h1>Entity Details</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Entity</li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className={`card-header`}>
                    <div className={`d-flex align-items-center`}>
                        <h1 className={`flex-1`}>Entity</h1>
                        <a href={'/entityRegistartion'} className={`btn btn-sm btn-primary`}>Add New Entity</a>
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