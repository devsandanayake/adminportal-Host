import React, { Component } from 'react';
import './index.scss'
import Select2 from "react-select2-wrapper";
import 'react-select2-wrapper/css/select2.css';
import $ from 'jquery';
import {FETCH_DESTINATION_LIST, FETCH_ENTITY_LIST} from "../../../constants";
import 'datatables.net-dt/css/dataTables.dataTables.css';

class DestinationList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        $('.entity-list-table').DataTable({
            "processing": true,
            "serverSide": true,
            "searching": true,
            "columnDefs": [
                {
                    "targets": [4, 5, 6, 7],
                    "className": "text-center",
                },
                {
                    "targets": [7],
                    "orderable": false
                }
            ],
            "beforeSend": function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token)
            },
            "ajax": {
                "url": FETCH_DESTINATION_LIST,
                headers:{
                    "Authorization" : `Bearer ${token}`
                },
                "data": function (d) {
                    delete d['columns']
                    return d
                },
                "dataSrc": function (json) {
                    let return_data = [];
                    let data = json.data
                    for(let a in data){
                        return_data.push({
                            ...data[a],
                            'verified': `<badge class="p-1 ps-2 pe-2 badge ${data[a]['isVerified'] != null && data[a]['isVerified'] === 1 ? 'badge-success' : 'badge-danger'}">${data[a]['isVerified'] != null && data[a]['isVerified'] === 1 ? 'Verified' : data[a]['isVerified'] == null ? 'Verification Pending' : 'Not-Verified'}</badge>`,
                            'dType': `<badge class="p-1 ps-2 pe-2 badge badge-primary">${data[a]['destinationType'] ?? 'Default'}</badge>`,
                            'oType': `${data[a]['ownershipType'] ?? '--Non--'}`,
                            'status': `<badge class="p-1 ps-2 pe-2 badge ${data[a]['isActive'] ? 'badge-success' : 'badge-warning'}">${data[a]['isActive'] ? 'Active': 'In-active'}</badge>`,
                                                       'action': `
                                <button title="destination configuration" data-uuid="${data[a]['uuid']}" class="dev-cog rt-device-remove device-cog ml-2">
                                    <i class="bi bi-gear-wide-connected"></i>
                                </button>
                                <a href="/destination/${data[a]['uuid']}" title="destination visibility" class="dev-cog rt-device-remove device-cog ml-2" data-uuid="${data[a]['uuid']}">
                                    <i class="bi bi-eye"></i>
                                </a>
                            `
                        })
                    }
                    return return_data;
                },
            },
            "columns": [
                {"data": 'name'},
                {"data": 'uuid'},
                {"data": 'dType'},
                {"data": 'oType'},
                {"data": 'createdAt'},
                {"data": 'status'},
                {"data": 'verified'},
                {"data": 'action'}
            ]
        })
    }

    render() {
        return (
            <div className={`destination-list p-1 w-100`}>
                <div className="pagetitle">
                    <h1>Destination List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Destination List</li>
                        </ol>
                    </nav>
                </div>

                <div className={` mt-4`}>
                    <div className="card">
                        <div className={`card-header`}>
                            <div className={`d-flex align-items-center`}>
                                <h1 className={`flex-1`}>Registered Destinations</h1>
                                <a href={'/destinations/new-registration'} className={`btn btn-sm btn-primary`}>Add New Destination</a>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className={`filter-panel row mt-3 border m-0 p-3`}>
                                <div className={`col-2 mb-2 pl-0`}>
                                    <div className={`form-group`}>
                                        <label htmlFor="name">Name</label>
                                        <input type={`text`} name="name" id="name"
                                               className={`form-control f-sm mt-1`}/>
                                    </div>
                                </div>
                                <div className={`col-4 mb-2 pl-0`}>
                                    <div className={`form-group`}>
                                        <label className={`mb-1`} htmlFor="name">City</label>
                                        <br/>
                                        <Select2
                                            multiple
                                            className={`w-100 form-control mt-1 f-sm`}
                                            data={['bug', 'feature', 'documents', 'discussion']}
                                        />

                                    </div>
                                </div>
                                <div className={`col-2 mb-2 pl-0`}>
                                    <div className={`form-group`}>
                                        <label className={`mb-1`} htmlFor="name">Destination Type</label>
                                        <br/>
                                        <Select2
                                            className={`w-100 form-control f-sm`}
                                            data={['bug', 'feature', 'documents', 'discussion']}
                                            options={
                                                {
                                                    placeholder: 'Destination type',
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={`col-2 mb-2 pl-0`}>
                                    <div className={`form-group`}>
                                        <label className={`mb-1`} htmlFor="name">Ownership Type</label>
                                        <br/>
                                        <Select2
                                            className={`w-100 form-control f-sm`}
                                            data={['bug', 'feature', 'documents', 'discussion']}
                                            options={
                                                {
                                                    placeholder: 'Ownership type',
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={`col-2 pl-0`}>
                                    <div className={`form-group`}>
                                        <label className={`mb-1`} htmlFor="name">Status</label>
                                        <br/>
                                        <Select2
                                            className={`w-100 form-control f-sm`}
                                            data={['Active', 'In-Active']}
                                            options={
                                                {
                                                    placeholder: 'Active status',
                                                }
                                            }
                                        />

                                    </div>
                                </div>
                                <div className={`col-4 pl-0`}>
                                    <div className={`form-group`}>
                                        <label htmlFor="name">Registration</label>
                                        <div className={`row`}>
                                            <div className={`col-6`}>
                                                <input type={`datetime-local`} name="name" id="name"
                                                       className={`form-control f-sm mt-1`}/>
                                            </div>
                                            <div className={`col-6 pl-0`}>
                                                <input type={`datetime-local`} name="name" id="name"
                                                       className={`form-control f-sm mt-1`}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-2 pl-0`}>
                                    <div className={`form-group`}>
                                        <label className={`mb-1`} htmlFor="name">&nbsp;</label>
                                        <br/>
                                        <button type={`button`} className={`btn btn-primary btn-sm`}>Filter
                                            Destinations
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className={`mt-3`}>
                                <table className="table table-striped entity-list-table cell-border">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>UUID</th>
                                        <th>Destination Type</th>
                                        <th>Ownership Type</th>
                                        <th>Registered At</th>
                                        <th>Status</th>
                                        <th>Is Verified</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                {/*<DataTable*/}
                                {/*    data={sampleData}*/}
                                {/*    columns={this.columns}*/}
                                {/*    className="display table table-bordered"*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DestinationList;