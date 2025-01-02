import axiosInstance from '../../axiosConfig';
import { WEB_CLIENT } from '../../constants';
import {
    TICKET_REQUEST,
    TICKET_SUCCESS,
    TICKET_FAILURE,
}
from '../../actions/types';

export const ticketRequest = () => ({
    type: TICKET_REQUEST,
});

export const ticketSuccess = (data) => ({
    type: TICKET_SUCCESS,
    payload: data,
});

export const ticketFailure = (error) => ({
    type: TICKET_FAILURE,
    payload: error,
});


export const tickectPost = (ticket) => {
    // Log and validate ticket data
    console.log("Ticket data: ", ticket);

  

    return (dispatch) => {
        dispatch(ticketRequest());
        axiosInstance.post(`${WEB_CLIENT}/destination-panel/ticket/new-ticket`, ticket)
            .then(response => {
                dispatch(ticketSuccess(response.data));
            })
            .catch(error => {
                console.error("API error response: ", error.response?.data || error.message);
                dispatch(ticketFailure(error.response?.data?.message || error.message));
            });
    };
};
