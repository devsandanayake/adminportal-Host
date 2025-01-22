import React from 'react';
import './EntityList.scss'
import DataTable from "datatables.net-react";
import sampleData from "../../Entity/sampleData.json";

export default function EntityList() {

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
        <div className={`entity-list p-1 w-100`}>
            <div className="pagetitle">
                <h1>Entity List</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">Entity List</li>
                    </ol>
                </nav>
            </div>

            <div className="entity-summary m-0 d-flex">

                <div className="summary-card ca mr-5">
                    <div className="card-body grid-container center p-0 gap-0">
                        <div className="grid-center card-img c-l1 b-shadow-fd br-war">
                            <p className="p-0 m-0">
                                <i className={`bi bi-bank`}></i>
                            </p>
                        </div>
                        <div className="grid-center card-detail b-shadow-lt br-war">
                            <div className="grid-container">
                                <div className="grid-center text-left">
                                    <div className="l-1">
                                        <small className="p-0 m-0 fs">No of Registered</small>
                                        <p className="p-0 m-0 fs">Entities</p>
                                    </div>
                                </div>
                                <div className="grid-center">
                                    <p className="p-0 m-0 all_devices dev-cnt fm f-suc"><b>943430</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="summary-card ca mr-5">
                    <div className="card-body grid-container center p-0 gap-0">
                        <div className="grid-center card-img c-l1 b-shadow-fd br-suc">
                            <p className="p-0 m-0">
                                <i className="bi bi-diagram-3"></i>
                            </p>
                        </div>
                        <div className="grid-center card-detail b-shadow-lt br-suc">
                            <div className="grid-container">
                                <div className="grid-center text-left">
                                    <div className="l-1">
                                        <small className="p-0 m-0 fs">No of Registered</small>
                                        <p className="p-0 m-0 fs">Branches</p>
                                    </div>
                                </div>
                                <div className="grid-center">
                                    <p className="p-0 m-0 all_devices dev-cnt fm f-suc"><b>943430</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`entity-list-table mt-5`}>
                <div className="card">
                    <div className={`card-header`}>
                        <div className={`d-flex align-items-center`}>
                            <h1 className={`flex-1`}>Registered Entities</h1>
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
        </div>
    )
}