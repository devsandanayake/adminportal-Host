import axiosInstance from "../../axiosConfig";
import { HOST, WEB_CLIENT , USER_CLIENT_OPEN} from "../../constants";

import {
    DESTINATION_REQUEST,
    DESTINATION_SUCCESS,
    DESTINATION_FAILURE,
    DEACTIVATE_DESTINATION_REQUEST,
    DEACTIVATE_DESTINATION_SUCCESS,
    DEACTIVATE_DESTINATION_FAILURE,
    DESTINATION__BYID_REQUEST,
    DESTINATION__BYID_SUCCESS,
    DESTINATION__BYID_FAILURE,
    DESTINATION_UPDATE_REQUEST,
    DESTINATION_UPDATE_SUCCESS,
    DESTINATION_UPDATE_FAILURE
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

export const deactivateDestinationRequest = () =>({
    type: DEACTIVATE_DESTINATION_REQUEST,
});

export const deactivateDestinationSuccess = (data) =>({
    type: DEACTIVATE_DESTINATION_SUCCESS,
    payload: data,
});

export const deactivateDestinationFailure = (error) =>({
    type: DEACTIVATE_DESTINATION_FAILURE,
    payload: error,
});

export const destinationByIDRequest = () =>({
    type: DESTINATION__BYID_REQUEST,
});

export const destinationByIDSuccess = (data) =>({
    type: DESTINATION__BYID_SUCCESS,
    payload: data,
});

export const destinationByIDFailure = (error) =>({
    type: DESTINATION__BYID_FAILURE,
    payload: error,
});

//DESTINATION UPDATE
export const destinationUpdateRequest = () =>({
    type: DESTINATION_UPDATE_REQUEST,
});

export const destinationUpdateSuccess = (data) =>({
    type: DESTINATION_UPDATE_SUCCESS,
    payload: data,
});

export const destinationUpdateFailure = (error) =>({
    type: DESTINATION_UPDATE_FAILURE,
    payload: error,
});



export const viewDestionationById = (id) => {
    return (dispatch) => {
        dispatch(destinationByIDRequest());
        axiosInstance.get(`${HOST}/${USER_CLIENT_OPEN}/destination/details`, {
            params: {
                destinationCode: id,
                isUserReviewsInclude: true,
                isReviewTagsInclude: true,
                isTagsInclude: true
            }
        })
        .then(response => {
            dispatch(destinationByIDSuccess(response.data));
        })
        .catch(error => {
            dispatch(destinationByIDFailure(error.message));
        });
    };
}



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

export const getDestinationCodeName = () => {
    return (dispatch) => {
        dispatch(destinationRequest());
        axiosInstance.get(`${WEB_CLIENT}/admin-pannel-api/destination/destination-code`)
            .then(response => {
                dispatch(destinationSuccess(response.data));
            })
            .catch(error => {
                dispatch(destinationFailure(error.message));
            });
    };
}


export const getDestinationCategory = () => {
    return (dispatch) => {
        dispatch(destinationRequest());
        axiosInstance.get(`${WEB_CLIENT}/admin-pannel-api/destination/subcategory-data`)
            .then(response => {
                dispatch(destinationSuccess(response.data));
            })
            .catch(error => {
                dispatch(destinationFailure(error.message));
            });
    };
}


export const getDestinationDestailsForTable = () => {
    return (dispatch) => {
        dispatch(destinationRequest());
        axiosInstance.get(`${WEB_CLIENT}/admin-pannel-api/destination/view-upload-destination`)
            .then(response => {
                dispatch(destinationSuccess(response.data));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(destinationFailure(error.message));
            });
    };
}


export const deactivateDestination = (id) => {
    return (dispatch) => {
        dispatch(deactivateDestinationRequest());
        axiosInstance.post(`${WEB_CLIENT}/admin-pannel-api/destination/deactivate-destination`, { id: id })
            .then(response => {
                dispatch(deactivateDestinationSuccess(response.data));
            })
            .catch(error => {
                dispatch(deactivateDestinationFailure(error.message));
            });
    }
}

//DESTINATION UPDATE
export const updateDestination = (destination) => {
    return (dispatch) => {
        dispatch(destinationUpdateRequest());
        axiosInstance.put(`${WEB_CLIENT}/destination-panel/update/update-destination`, destination)
            .then(response => {
                dispatch(destinationUpdateSuccess(response.data));
                alert("Destination updated successfully");
                window.location.reload();
            })
            .catch(error => {
                dispatch(destinationUpdateFailure(error.message));
            });
    }
}


