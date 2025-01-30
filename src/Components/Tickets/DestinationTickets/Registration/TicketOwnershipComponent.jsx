import React, {Component} from "react";
import Select2 from "react-select2-wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class TicketOwnershipComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData : {
                asp: "",
                aspDivWidth: "",
                aspDivHeight: "",
                validFrom: "",
                validTill: "",
                imageFile: null,
                mobileImageFile: null,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleFileChange = (event, type) => {
        if (event.target.files.length > 0) {
            let file = event.target.files[0]
            this.setState({ [type]: file });
            this.props.onChange(this.props.index, type, file)
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({formData : { ...this.state.formData, [name]: value }});
        this.props.onChange(this.props.index, name, value)
    };

    render() {
        return <div className={`border dst-images p-3 mb-3`}>
            <div className={`row`}>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label className={`mb-1`} htmlFor="region2">Ownership Entity / Entity Branch</label>
                        <br/>
                        <Select2 onChange={this.handleOwnershipTypeChange}
                                 value={this.state.ownerShipTypeVal}
                                 className={`w-100 form-control ownership-type mt-2`}
                                 data={(this.state.meta && this.state.meta.ownershipTypes
                                     ? this.state.meta.ownershipTypes.map(x => {
                                         return {text: x.name, id: `${x.code}|${x.maxOwners}`}
                                     }) : [])}
                                 options={{
                                     placeholder: 'Select one type',
                                 }}
                        />
                    </div>
                </div>
                <div className={`col-2`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Share Percentage</label>
                        <input type={`number`} required name={`name`} value={this.state.name}
                               onChange={this.handleInputChange}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-2`}>
                    <label className={`mb-1`} htmlFor="region2">&nbsp;</label>
                    <br/>
                    <a className={`btn btn-sm btn-danger`} onClick={() => {
                        this.props.removeDstImage(this.props.index)
                    }}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </a>
                </div>
            </div>
        </div>
    }
}

export default TicketOwnershipComponent