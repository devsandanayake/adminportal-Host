import React from 'react'
import { useDispatch } from "react-redux";
import moment from "moment";
import { tickectPost } from '../../actions/Tickets/ticketsAction';

export default function TicketsRegisteration() {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
     destinationCode: "",
     name: "",
     noOfTickets: "",
     description: "",
     paymentMethods: "",
     ticketTypeCode: "",
     
  });
  return (
    <div>TicketsRegisteration</div>
  )
}
