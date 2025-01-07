import axiosInstance from "../../axiosConfig";
import { WEB_CLIENT } from "../../constants";

import {
    DESTINATION_REQUEST,
    DESTINATION_SUCCESS,
    DESTINATION_FAILURE

}
from '../types'


export const destinationRequest = () =>({
    type: DESTINATION_REQUEST,
});


export const destinationSuccess = (data) =>({
    type: DESTINATION_SUCCESS,
    payload: data,
});


export const destinationFailure = (error) =>({
    type: DESTINATION_FAILURE,
    payload: error,
});



export const destinationPost = (destination) => {
    return (dispatch) => {
        console.log(destination);
        for (var value of destination) {
            console.log(value);
        }
        dispatch(destinationRequest());
        axiosInstance.post(`${WEB_CLIENT}/destination-panel/registration/new-destination`, destination)
            .then(response => {
                dispatch(destinationSuccess(response.data));
            })
            .catch(error => {
                dispatch(destinationFailure(error.message));
            });
    };
}

