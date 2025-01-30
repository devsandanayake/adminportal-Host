import React, {Component} from "react";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import './custom.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import DestinationImageComponent from "../Registration/DestinationImageComponent";

class AddNewRegistrationComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            dstImageLastIndex: 0,
            formData : {
                owningEntityCode: "",
                owningEntityBranchCode: "",
                name: "",
                displayName: "",
                description: "",
                overview: "",
                highlight: "",
                tagCodes: [],
                geotag: {
                    name : "",
                    address : "",
                    latitude : 0,
                    longitude : 0,
                    altitude : 0,
                },
                destinationImages : {}
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        console.log(this.state);
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({formData : { ...this.state.formData, [name]: value }});
    };

    addDstImage = () => {
        let destinationImages = this.state.formData.destinationImages;
        destinationImages[this.state.dstImageLastIndex] = {index:this.state.dstImageLastIndex};
        this.setState({
            formData: { ...this.state.formData, destinationImages : {...destinationImages} },
            dstImageLastIndex : this.state.dstImageLastIndex + 1
        });
    }

    removeDstImage = (index) => {
        let destinationImages = this.state.formData.destinationImages;
        if(destinationImages[index]){
            delete destinationImages[index];
        }
        this.setState({
            formData: { ...this.state.formData, destinationImages : {...destinationImages} }
        });
    }

    render() {
        return <div className={`add-new-destination`}>
            <div className={`d-flex align-items-center`}>
                <h1 className={`flex-1`}>Add New Destination</h1>
                <a href={'/add-new-destination'} className={`btn btn-sm btn-default border`}>All Destinations</a>
            </div>
            <div className={`destination-from`}>
                <form>
                    <div className={`card mt-2`}>
                        <div className={`card-header`}>
                            <h2>Destination Info</h2>
                        </div>
                        <div className={`card-body pt-3`}>
                            <div className={`row`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Owning Entity</label>
                                        <br/>
                                        <Select2 className={`w-100 form-control mt-2`} data={['dwd']}
                                                 options={{
                                                     placeholder: 'Select one entity',
                                                 }}
                                        />
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Owning Entity Branch</label>
                                        <br/>
                                        <Select2 className={`w-100 form-control mt-2`} data={['dwd','dwdd']}
                                                 options={{
                                                     placeholder: 'Select one entity branch',
                                                 }}
                                        />
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Name</label>
                                        <input name={`name`} value={this.state.formData.name}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Display Name</label>
                                        <input name={`name`} value={this.state.formData.displayName}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Description</label>
                                        <input name={`name`} value={this.state.formData.description}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Sub-Categories</label>
                                        <br/>
                                        <Select2 multiple className={`w-100 form-control mt-2`} data={[]}
                                                 options={{
                                                     placeholder: 'Select one entity',
                                                 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Tag Codes</label>
                                        <br/>
                                        <Select2 multiple className={`w-100 form-control mt-2`} data={[]}
                                                 options={{
                                                     placeholder: 'Select one entity',
                                                 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Overview</label>
                                        <textarea rows={5} name={`name`} onChange={this.handleInputChange}
                                                  className="form-control f-sm  mt-1 region-select r-name">
                                            {this.state.formData.overview}
                                        </textarea>

                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Highlight</label>
                                        <textarea rows={5} name={`name`} onChange={this.handleInputChange}
                                                  className="form-control f-sm  mt-1 region-select r-name">
                                            {this.state.formData.highlight}
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-2`}>
                        <div className={`card-header`}>
                            <div className={`d-flex align-items-center`}>
                                <h2 className={`flex-1`}>Destination Location</h2>
                            </div>
                        </div>
                        <div className={`card-body pt-3`}>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Location Name</label>
                                        <input name={`name`} value={this.state.formData.geotag.name}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                    <label htmlFor="region2">Address</label>
                                        <input name={`name`} value={this.state.formData.geotag.address}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Latitude</label>
                                        <input type={`number`} name={`name`} value={this.state.formData.geotag.latitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Longitude</label>
                                        <input type={`number`} name={`name`} value={this.state.formData.geotag.longitude}
                                               onChange={this.handleInputChange}  className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Altitude</label>
                                        <input type={`number`} name={`name`} value={this.state.formData.geotag.altitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-2`}>
                        <div className={`card-header`}>
                            <div className={`d-flex align-items-center`}>
                                <h2 className={`flex-1`}>Destination Images</h2>
                                <a onClick={this.addDstImage} className={`btn btn-sm btn-success border`}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </a>
                            </div>
                        </div>
                        <div className={`card-body pt-3`}>
                            {
                                Object.values(this.state.formData.destinationImages).map((item, index) => {
                                    return <DestinationImageComponent removeDstImage={this.removeDstImage} key={`dst-img-${index}`} index={item['index']} item={item} />
                                })
                            }
                        </div>
                    </div>

                </form>
            </div>
        </div>
    }
}

export default AddNewRegistrationComponent;