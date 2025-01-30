import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import LoginPage from './Components/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import EntityRegistration from './Components/Entity/Registration/page'
import AddNewRegistrationComponent from "./Components/Destination/DestinationRegistration/AddNewRegistrationComponent";
import CancellationTable from './Components/Dashboard/Cancellation/CancellationTable';
import EntityView from './Components/Entity/EntityView';
import SuperAdminLayout from "./Components/SuperAdmin/Layout/SuperAdminLayout";
import UpdatePage from './Components/Destination/DestinationUpdate/UpdatePage';
import ConfigDashboard from "./Components/Meta/Configdashboard";
import TicketInsert from './Components/Ticket/TicketInsert/TicketInsert';
import EntityList from "./Components/Entity/List/EntityList";
import NewEntityRegistration from "./Components/Entity/Registration/EntityRegistration";
import DestinationList from "./Components/Destination/List/DestinationList";
import DestinationRegistration from "./Components/Destination/Registration/DestinationRegistration";
import DestinationTicketList from "./Components/Tickets/DestinationTickets/List/DestinationTicketList";
import DestinationTicketRegistration
    from "./Components/Tickets/DestinationTickets/Registration/DestinationTicketRegistration";


function App() {
  const authState = useSelector(state => state.auth);

  if(!authState.isAuthenticated){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
       <SuperAdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/entityRegistartion' element={<EntityRegistration />} />
        <Route path='/destinations' element={<DestinationList />} />
        <Route path='/destinationRegistartion' element={<DestinationRegistration />} />
        <Route path='/add-new-destination' element={<AddNewRegistrationComponent />} />
        <Route path='/cancellation' element={<CancellationTable />} />
        <Route path='/entity/list' element={<EntityList />} />
        <Route path='/ticketInsert' element={<TicketInsert />} />

        {/*DESTINATION-PAGES ROUTES*/}
        <Route path='/destination/:id' element={<UpdatePage />} />

        {/*META-PAGES ROUTES*/}
        <Route path='/configdashboard' element={<ConfigDashboard />} />


    
        <Route path="/entity/new-registration" element={<NewEntityRegistration />} />
        <Route path='/destinations/new-registration' element={<DestinationRegistration />} />

          <Route path='/tickets/destination-tickets' element={<DestinationTicketList />} />
          <Route path='/tickets/destination-tickets/new-registration' element={<DestinationTicketRegistration />} />


      </Routes>
      </SuperAdminLayout>
    </Router>
    
  );
}

export default App;
