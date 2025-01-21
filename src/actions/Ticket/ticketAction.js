import axiosInstance from "../../axiosConfig";
import{
    TICKET_REQUEST,
    TICKET_SUCCESS,
    TICKET_FAILURE
}
from '../types'
import { WEB_CLIENT } from "../../constants";


export const ticketRequest = () =>({
    type: TICKET_REQUEST,
});


export const ticketSuccess = (data) =>({
    type: TICKET_SUCCESS,
    payload: data,
});


export const ticketFailure = (error) =>({
    type: TICKET_FAILURE,
    payload: error,
});



export const ticketPost = (ticket) => {
    return (dispatch) => {
        console.log(ticket);
        for (var value of ticket) {
            console.log(value);
        }
        dispatch(ticketRequest());
        axiosInstance.post(`${WEB_CLIENT}/destination-panel/ticket/new-ticket`, ticket)
            .then(response => {
                dispatch(ticketSuccess(response.data));
            })
            .catch(error => {
                dispatch(ticketFailure(error.message));
            });
    };
}


