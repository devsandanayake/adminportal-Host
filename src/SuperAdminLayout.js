import React from 'react';
import AuthHeader from "./Components/Base/AuthHeader";
import SuperAdminSideNavbar from "./Components/Base/SuperAdmin/SuperAdminSideNavBar";

export default function SuperAdminLayout({ children }) {
  return (
      <div className={"layout-flex d-flex justify-content-between"}>
          <div className={`header-cont`}>
              <AuthHeader />
          </div>
          <div className={`layout-content flex-1 accent-yellow-100`}>
              <div className={`h-100 w-100`}>
                  <div className="d-flex h-100 w-100">
                      <div className={`sidebar-div h-100`}>
                          <SuperAdminSideNavbar/>
                      </div>
                      <div className={`main-content-div flex-1 h-100`}>
                          <main id="" className="main w-100 h-100 p-3">
                              <section className="section dashboard">
                                  {children}
                              </section>
                          </main>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
