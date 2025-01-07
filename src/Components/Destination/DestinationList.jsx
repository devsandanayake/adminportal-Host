import React, {Component} from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import './custom.css';

DataTable.use(DT);

class DestinationList extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        return <div className={`destination-list`}>
            <div className={`card`}>
                <div className={`card-header`}>
                    <div className={`d-flex align-items-center`}>
                        <h1 className={`flex-1`}>Destinations</h1>
                        <a href={'/destinationRegistartion'} className={`btn btn-sm btn-primary`}>Add New Destination</a>
                    </div>
                </div>
                <div className={`card-body`}>
                    <DataTable data={[]} className="display table table-bordered">
                        <thead>
                        <tr>
                            <th>Entity</th>
                            <th>Name</th>
                            <th>Display Name</th>
                            <th>UUID</th>
                            <th>Location</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>
        </div>
    }

}

export default DestinationList