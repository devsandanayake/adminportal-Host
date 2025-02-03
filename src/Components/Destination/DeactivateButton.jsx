import React from 'react';
import { useDispatch } from 'react-redux';
import { deactivateDestination } from "../../actions/Destination/destinationAction";

const DeactivateButton = ({ id }) => {
    const dispatch = useDispatch();

    const handleDeactivate = async () => {
        const confirmDeactivation = window.confirm("Are you sure you want to deactivate this destination?");
        if (confirmDeactivation) {
            await dispatch(deactivateDestination(id));
            alert("Destination deactivated successfully");
            window.location.replace("/destinations");
        }
    };

    return (
        <button className="deactivate-btn" data-id={id} style={{ color: 'red' }} onClick={handleDeactivate}>
            <i className="ri-tools-fill">Remove</i>
        </button>
    );
};

export default DeactivateButton;