import axiosInstance from "../axiosConfig";
import{
    ENTITY_REQUEST,
    ENTITY_SUCCESS,
    ENTITY_FAILURE
}
from './types'

export const entityRequest = () => ({
    type: ENTITY_REQUEST,
});

export const entitySuccess = (data) => ({
    type: ENTITY_SUCCESS,
    payload: data,
});

export const entityFailure = (error) => ({
    type: ENTITY_FAILURE,
    payload: error,
});

export const registerEntity = (entity) => {
    console.log(entity);
    return (dispatch) => {
       
        dispatch(entityRequest());
        axiosInstance.post('/internal-api/v1/client-web/entity-panel/registration/new-entity', entity,
            {
                headers: {
                  "Content-Type": "application/json", // Explicitly set content type
                },
            }
        )
            .then(response => {
                dispatch(entitySuccess(response.data));
            })
            .catch(error => {
                dispatch(entityFailure(error.message));
            });
    };
}


 
