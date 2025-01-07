import React, {Component} from "react";
import Select2 from "react-select2-wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class DestinationImageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData : {
                owningEntityCode: "",
                owningEntityBranchCode: "",
                name: "",
                displayName: "",
                description: "",
                overview: "",
                highlight: "",
                tagCodes: [],
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({formData : { ...this.state.formData, [name]: value }});
    };

    render() {
        return <div className={`border dst-images p-3 mb-3`}>
            <div className={`row`}>
                <div className={`col-2`}>
                    <div className="form-group mb-0">
                        <label className={`mb-1`} htmlFor="region2">Aspect Ratio</label>
                        <br/>
                        <Select2 className={`w-100 form-control mt-2`}
                                 data={[
                                     {text: 'bug', id: 1},
                                     {text: 'feature', id: 2},
                                     {text: 'documents', id: 3},
                                     {text: 'discussion', id: 4},
                                 ]}
                                 options={{
                                     placeholder: 'Select one entity',
                                 }}
                        />
                    </div>
                </div>
                <div className={`col-2`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Display Order</label>
                        <input name={`name`} value={this.state.formData.name}
                               onChange={this.handleInputChange}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Valid From</label>
                        <input name={`name`} value={this.state.formData.name}
                               onChange={this.handleInputChange} type={"datetime-local"}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Valid Till</label>
                        <input name={`name`} value={this.state.formData.name}
                               onChange={this.handleInputChange} type={"datetime-local"}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
            </div>
            <div className={`row mt-2`}>
                <div className={`col-6`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Web Image</label>
                        <input name={`name`} value={this.state.formData.displayName}
                               onChange={this.handleInputChange} type={`file`}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Mobile Image</label>
                        <input name={`name`} value={this.state.formData.description}
                               onChange={this.handleInputChange} type={`file`}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-2`}>
                    <label className={`mb-1`} htmlFor="region2">&nbsp;</label>
                    <br/>
                    <a className={`btn btn-sm btn-danger`} onClick={() => { this.props.removeDstImage(this.props.index) }}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </a>
                </div>
            </div>
        </div>
    }
}

export default DestinationImageComponent