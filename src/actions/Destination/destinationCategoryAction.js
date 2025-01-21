import axiosInstance from "../../axiosConfig";
import { WEB_CLIENT } from "../../constants";

import {
    DESTINATION_CAT_REQUEST,
    DESTINATION_CAT_SUCCESS,
    DESTINATION_CAT_FAILURE

}
from '../types'

 
export const destinationCategoryRequest = () =>({
    type: DESTINATION_CAT_REQUEST,
});

export const destinationCategorySuccess = (data) =>({
    type: DESTINATION_CAT_SUCCESS,
    payload: data,
});


export const destinationCategoryFailure = (error) =>({
    type: DESTINATION_CAT_FAILURE,
    payload: error,
});




export const getDestinationCategory = () => {
    return (dispatch) => {
        dispatch(destinationCategoryRequest());
        axiosInstance.get(`${WEB_CLIENT}/admin-pannel-api/destination/subcategory-data`)
            .then(response => {
                dispatch(destinationCategorySuccess(response.data));
            })
            .catch(error => {
                dispatch(destinationCategoryFailure(error.message));
            });
    };
}


