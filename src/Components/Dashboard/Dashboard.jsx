import React from 'react';
import Card from './DashboardFisrtBar/Card';

export default function Dashboard() {
  return (
    <>
      <div className="pagetitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        
        {/* Date Pickers and Search Bar */}
        <div className="search-section" style={{ display: 'flex', alignItems: 'center' }}>
          From :<input type="date" className="form-control" style={{ marginRight: '10px', width: '200px' }} />
          To :<input type="date" className="form-control" style={{ marginRight: '10px', width: '200px' }} />
        </div>
      </div>

      <div className='row'>
        <Card />
      </div>
    </>
  );
}
