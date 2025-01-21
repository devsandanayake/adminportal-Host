import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import LoginPage from './Components/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import EntityRegistration from './Components/Entity/Registration/page'
import DestinationRegistration from './Components/Destination/DestinationRegistration/DestinationRegistration';
import DestinationList from "./Components/Destination/DestinationList";
import AddNewRegistrationComponent from "./Components/Destination/DestinationRegistration/AddNewRegistrationComponent";
import CancellationTable from './Components/Dashboard/Cancellation/CancellationTable';
import EntityView from './Components/Entity/EntityView';
import TicketInsert from './Components/Ticket/TicketInsert/TicketInsert';

 


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
      <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/entityRegistartion' element={<EntityRegistration />} />
        <Route path='/destinations' element={<DestinationList />} />
        <Route path='/destinationRegistartion' element={<DestinationRegistration />} />
        <Route path='/add-new-destination' element={<AddNewRegistrationComponent />} />
        <Route path='/cancellation' element={<CancellationTable />} />
        <Route path='/entityView' element={<EntityView />} />
        <Route path='/ticketInsert' element={<TicketInsert />} />
      </Routes>
      </Layout>
    </Router>
    
  );
}

export default App;
