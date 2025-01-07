import React from 'react'

export default function Card() {
  return (
    <>
  {/* <!-- pagetitle end --> */}

    <div className='col-lg-8'>
    <div className='row'>
    {/* <!-- sales card start --> */}
      <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">

          <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a className="dropdown-item" href="#">Today</a></li>
              <li><a className="dropdown-item" href="#">This Month</a></li>
              <li><a className="dropdown-item" href="#">This Year</a></li>
            </ul>
          </div>

          <div className="card-body">
            <h5 className="card-title">Sales <span>| Today</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-cart"></i>
              </div>
              <div className="ps-3">
                <h6>145</h6>
                <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
              </div>
            </div>
          </div>

        </div>
      </div>    {/* <!-- sales card end --> */}

      
      <div className="col-xxl-4 col-md-6"> {/* <!-- reve card end --> */}
      <a href='/'>
        <div className="card info-card revenue-card">

          <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a className="dropdown-item" href="#">Today</a></li>
              <li><a className="dropdown-item" href="#">This Month</a></li>
              <li><a className="dropdown-item" href="#">This Year</a></li>
            </ul>
          </div>

          <div className="card-body">
            <h5 className="card-title">Revenue <span>| This Month</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="ps-3">
                <h6>$3,264</h6>
                <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
              </div>
            </div>
          </div>
       </div>   </a>
    </div> {/* <!-- reve card end --> */}
 


    <div className="col-xxl-4 col-md-6"> {/* <!-- reve card end --> */}
        <div className="card info-card revenue-card">

          <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a className="dropdown-item" href="#">Today</a></li>
              <li><a className="dropdown-item" href="#">This Month</a></li>
              <li><a className="dropdown-item" href="#">This Year</a></li>
            </ul>
          </div>

          <div className="card-body">
            <h5 className="card-title">SLT Revenue <span>| This Month</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="ps-3">
                <h6>$3,264</h6>
                <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
              </div>
            </div>
          </div>
       </div>
    </div> {/* <!-- reve card end --> */}

    <div className="col-xxl-4 col-md-6"> {/* <!-- reve card end --> */}
        <div className="card info-card revenue-card">

          <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a className="dropdown-item" href="#">Today</a></li>
              <li><a className="dropdown-item" href="#">This Month</a></li>
              <li><a className="dropdown-item" href="#">This Year</a></li>
            </ul>
          </div>

          <div className="card-body">
            <h5 className="card-title">Partner Revenue <span>| This Month</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="ps-3">
                <h6>$3,264</h6>
                <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
              </div>
            </div>
          </div>
       </div>
    </div> {/* <!-- reve card end --> */}


    <div className="col-xxl-4 col-md-6"> {/* <!-- reve card end --> */}
      <a href='cancellation'>
        <div className="card info-card  customers-card">

          <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a className="dropdown-item" href="#">Today</a></li>
              <li><a className="dropdown-item" href="#">This Month</a></li>
              <li><a className="dropdown-item" href="#">This Year</a></li>
            </ul>
          </div>

          <div className="card-body">
            <h5 className="card-title">Cancellation <span>| This Month</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-people"></i>
              </div>
              <div className="ps-3">
                <h6>3,264</h6>
                <span className="text-danger small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">count</span>
              </div>
            </div>
          </div>
       </div>
       </a>
    </div> {/* <!-- reve card end --> */}



      </div>
  </div>
  </>
  )
}
