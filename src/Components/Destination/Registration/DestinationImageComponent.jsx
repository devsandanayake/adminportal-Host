import React, {Component} from "react";
import Select2 from "react-select2-wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class DestinationImageComponent extends Component {

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
                <div className={`col-2`}>
                    <div className="form-group mb-0">
                        <label className={`mb-1`} htmlFor="region2">Aspect Ratio</label>
                        <br/>
                        <Select2 value={this.state.asp}
                                 onChange={(e)=>{
                                     let val = e.target.value
                                     let vals = val.split('|')
                                     if(vals.length > 1) {
                                         this.setState({asp:val, aspDivWidth : vals[0], aspDivHeight:vals[1]})
                                         this.props.onChange(this.props.index, 'aspDivWidth', vals[0])
                                         this.props.onChange(this.props.index, 'aspDivHeight', vals[1])
                                     }
                                 }}
                                 className={`w-100 form-control mt-2`}
                                 data={[
                                     {text: '16:9', id: "16|9"},
                                     {text: '1:2', id: "1|2"},
                                     {text: '3:4', id: "3|4"},
                                     {text: '2:1', id: "2|1"},
                                 ]}
                                 options={{
                                     placeholder: 'Select one ratio (width:height)',
                                 }}
                        />
                    </div>
                </div>
                <div className={`col-2`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Display Order</label>
                        <input name={`displayOrder`} value={this.state.displayOrder}
                               onChange={this.handleInputChange}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Valid From</label>
                        <input name={`validFrom`} value={this.state.validFrom}
                               onChange={this.handleInputChange} type={"datetime-local"}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Valid Till</label>
                        <input name={`validTill`} value={this.state.validTill}
                               onChange={this.handleInputChange} type={"datetime-local"}
                               className="form-control f-sm  mt-1 region-select r-name"/>
                    </div>
                </div>
            </div>
            <div className={`row mt-2`}>
                <div className={`col-6`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Web Image</label>
                        <input onChange={(e)=>{this.handleFileChange(e, 'imageFile')}} type={`file`} className="form-control f-sm  mt-1 img-file region-select r-name"/>
                    </div>
                </div>
                <div className={`col-4`}>
                    <div className="form-group mb-0">
                        <label htmlFor="region2">Mobile Image</label>
                        <input onChange={(e)=>{this.handleFileChange(e, 'mobileImageFile')}} type={`file`} className="form-control f-sm  mt-1 mob-img-file region-select r-name"/>
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