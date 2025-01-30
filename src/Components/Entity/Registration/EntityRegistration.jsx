import React, {Component} from "react";
import Select2 from "react-select2-wrapper";
import './index.scss'
import CreatableSelect from 'react-select/creatable';
import axios from "axios";
import {FETCH_ENTITY_REGISTRATION_META, NEW_ENTITY_REGISTRATION} from "../../../constants";
import $ from 'jquery';

class NewEntityRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dstImageLastIndex: 0,
            meta : {},
            tagOptions : [],
            tagCodes : [],
            contactNos : [],
            emails : [],
            formData : {
                entityTypeCode: "",
                name: "",
                description: "",
                overview: "",
                entityCode: "",
                geoName : "",
                address : "",
                latitude : 0,
                longitude : 0,
                altitude : 0,
                website : "",
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        console.log(this.state);
    }

    componentDidMount() {
        this.getEntityTypes()
    }

    getEntityTypes(){
        const token = localStorage.getItem('token');
        let cancel;
        let glob = this;
        axios({
            method : 'GET',
            url : FETCH_ENTITY_REGISTRATION_META,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            cancelToken: new axios.CancelToken((c)=>cancel = c)
        }).then((response) => {
            if(response.status === 200 && response.data && response.data.status && response.data.result){
                let result = response.data.result
                console.log(result)
                glob.setState({meta:{...result}})
            }
        }, (error) => {
            if(axios.isCancel(error)){
                return
            }
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({formData : { ...this.state.formData, [name]: value }});
    };

    handleChange = (newValue, actionMeta) => {

        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
            console.log("Removed option:", actionMeta.removedValue);
            let options = this.state.tagOptions
            let newOptions = options.filter((x) => x.value !== actionMeta.removedValue.value)
            this.setState({tagOptions : [...newOptions], tagCodes : [...newOptions]})
        }

    };

    contactHandleChange = (newValue, actionMeta) => {

        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
            console.log("Removed option:", actionMeta.removedValue);
            let options = this.state.contactNos
            let newOptions = options.filter((x) => x.value !== actionMeta.removedValue.value)
            this.setState({contactNos : [...newOptions]})
        }
    };

    emailHandleChange = (newValue, actionMeta) => {
        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
            console.log("Removed option:", actionMeta.removedValue);
            let options = this.state.emails
            let newOptions = options.filter((x) => x.value !== actionMeta.removedValue.value)
            this.setState({emails : [...newOptions]})
        }
    };

    handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const token = localStorage.getItem('token');
        let cancel;
        let glob = this;
        axios({
            method : 'POST',
            url : NEW_ENTITY_REGISTRATION,
            data : {
                name : this.state.formData.name,
                entityTypeCode : this.state.formData.entityTypeCode,
                description : this.state.formData.description,
                entityCode : this.state.formData.entityCode,
                geoLocation : {
                    name : this.state.formData.geoName,
                    address : this.state.formData.address,
                    latitude : this.state.formData.latitude.toString(),
                    longitude : this.state.formData.longitude.toString(),
                    altitude : this.state.formData.altitude.toString(),
                },
                fullAddress: `${this.state.formData.geoName}, ${this.state.formData.address}`,
                website : this.state.formData.website,
                contactNos : this.state.contactNos.map(x => x.value),
                emails : this.state.emails.map(x => x.value),
                tagCodes : this.state.tagCodes.map(x => x.value),
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            cancelToken: new axios.CancelToken((c)=>cancel = c)
        }).then((response) => {
            console.log(response)
            if(response.status === 200 && response.data && response.data.status){
                $('.e-list').click()
            }
        }, (error) => {
            if(axios.isCancel(error)){
                return
            }
        });
    }

    render() {
        return <div className={`entity-registration`}>
            <div className="pagetitle">
                <h1>Entity Registration</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">
                            <a href={'/entity/list'} className={`e-list`}>Entity List</a>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={`d-flex align-items-center`}>

            </div>
            <div className={`entity-from`}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className={`card mt-2 mb-0`}>
                        <div className={`card-header`}>
                            <h2>Entity Info</h2>
                        </div>
                        <div className={`card-body pt-3`}>
                            <div className={`row`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Entity Type</label>
                                        <br/>
                                        <Select2 onChange={(e) => this.setState({formData:{...this.state.formData, entityTypeCode : e.target.value}})}
                                                 value={this.state.formData.entityTypeCode} className={`w-100 form-control entity-type mt-2`}
                                                 data={(this.state.meta && this.state.meta.entityTypes
                                                     ? this.state.meta.entityTypes.map(x => {
                                                         return {text: x.name, id: x.code}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select one entity',
                                                 }}
                                        />
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Name</label>
                                        <input required={true} name={`name`} value={this.state.formData.name}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Registration No</label>
                                        <input required={true} name={`entityCode`}
                                               value={this.state.formData.entityCode}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Description</label>
                                        <input name={`description`} value={this.state.formData.description}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Website</label>
                                        <input name={`website`} value={this.state.formData.website}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Emails</label>
                                        <br/>
                                        <CreatableSelect
                                            onChange={this.emailHandleChange}
                                            value={this.state.emails}
                                            options={this.state.emails}
                                            onCreateOption={(inputValue) => {
                                                const newOption = {value: inputValue, label: inputValue};
                                                this.setState({emails: [...this.state.emails, newOption]})
                                            }}
                                            className={`tagCodes`} isMulti/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Contact Nos</label>
                                        <br/>
                                        <CreatableSelect
                                            onChange={this.contactHandleChange}
                                            value={this.state.contactNos}
                                            options={this.state.contactNos}
                                            onCreateOption={(inputValue) => {
                                                const newOption = {value: inputValue, label: inputValue};
                                                this.setState({contactNos: [...this.state.contactNos, newOption]})
                                            }}
                                            className={`tagCodes`} isMulti/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Tags</label>
                                        <br/>
                                        <CreatableSelect
                                            onChange={this.handleChange}
                                            value={this.state.tagCodes}
                                            options={this.state.tagOptions}
                                            onCreateOption={(inputValue) => {
                                                const newOption = {value: inputValue, label: inputValue};
                                                this.setState({
                                                    tagOptions: [...this.state.tagOptions, newOption],
                                                    tagCodes: [...this.state.tagCodes, newOption]
                                                })
                                            }}
                                            className={`tagCodes`} isMulti/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-3`}>
                        <div className={`card-header`}>
                            <div className={`d-flex align-items-center`}>
                                <h2 className={`flex-1`}>Entity Location</h2>
                            </div>
                        </div>
                        <div className={`card-body pt-3`}>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Location Name</label>
                                        <input required={true} name={`geoName`} value={this.state.formData.geoName}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Address</label>
                                        <input required={true} name={`address`} value={this.state.formData.address}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Latitude</label>
                                        <input required={true} type={`number`} name={`latitude`}
                                               value={this.state.formData.latitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Longitude</label>
                                        <input required={true} type={`number`} name={`longitude`}
                                               value={this.state.formData.longitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Altitude</label>
                                        <input type={`number`} name={`altitude`} value={this.state.formData.altitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-3`}>
                        <div className={`card-body pt-3`}>
                            <div className={`row mt-2`}>
                                <div className={`col-2`}>
                                    <div className="form-group mb-0">
                                        <button type={`submit`} className="form-control btn btn-success btn-sm">Register Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default NewEntityRegistration;