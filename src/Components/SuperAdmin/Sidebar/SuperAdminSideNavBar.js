import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../actions/authAction';
import { Link } from 'react-router-dom';
import './SideNavBar.scss'

export default function SuperAdminSideNavbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [inquiryCount, setInquiryCount] = useState(0);
  const [showAuctionSubItems, setShowAuctionSubItems] = useState(false);
  const [showinqurySubItems, setShowinqurySubItems] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const fetchInquiryCount = () => {
    const count = localStorage.getItem('inqueryCount') || 0;
    setInquiryCount(count);
  };


  useEffect(() => {
    fetchInquiryCount();
    const interval = setInterval(fetchInquiryCount, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleAuctionSubItems = () => {
    setShowAuctionSubItems(!showAuctionSubItems);
    
  };
  const toggleAuctionSubItems1 = () => {
    setShowinqurySubItems(!showinqurySubItems);
  };

  return (
      <aside id="sidebar" className={`sidebar s-admin-sidebar h-100 p-2`}>

        <ul className="sidebar-nav" id="sidebar-nav">
          {
            !auth.isAuthenticated && <li className="nav-item">
                <a className="nav-link " href="index.html">
                  <i className="bi bi-grid"></i>
                  <span>Home</span>
                </a>
              </li>
          }
          {
              auth.isAuthenticated && <>
                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/">
                    <i className="bi bi-grid-fill"></i>
                    <p>Home</p>
                  </Link>
                </li>

                <li className="nav-item mt-2">
                  <Link className="nav-link collapsed" to="/entity/list">
                    <i className="bi bi-bank"></i>
                    <p>Entities</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/destinations">
                    <i className="bi bi-signpost-2"></i>
                    <p>Destinations</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/ticketInsert">
                    <i className="bi bi-ticket-detailed"></i>
                    <p>Tickets</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/destinations">
                    <i className="bi bi-people"></i>
                    <p>Users</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/destinations">
                    <i className="bi bi-paint-bucket"></i>
                    <p>CMS</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/destinations">
                    <i className="bi bi-shield-lock"></i>
                    <p>Security</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/configdashboard">
                    <i className="bi bi-gear"></i>
                    <p>Configs</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link collapsed">
                    <i className="bi bi-person-walking"></i>
                    <p>Logout</p>
                  </a>
                </li>

              </>
          }
        </ul>
      </aside>
  );
}
