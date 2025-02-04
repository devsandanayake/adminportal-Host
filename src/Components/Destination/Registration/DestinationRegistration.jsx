import React, {Component} from "react";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import './index.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import DestinationImageComponent from "./DestinationImageComponent";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import {
    FETCH_DESTINATION_REGISTRATION_META, FETCH_ENTITY_BRANCH_LIST,
    FETCH_ENTITY_LIST,
    FETCH_ENTITY_REGISTRATION_META, NEW_DESTINATION_REGISTRATION, NEW_ENTITY_REGISTRATION
} from "../../../constants";
import $ from "jquery";

class DestinationRegistration extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            entities: [],
            entityBranches: [],
            entityBranchOptions: [],
            dstImageLastIndex: 0,
            meta : {},
            ownerShipTypeVal : "",
            ownershipTypeCode : "",
            destinationTypeCode : "",
            tagCodes : [],
            contactNos : [],
            emails : [],
            cityId : null,
            ownershipEntities : [],
            ownershipEntityBranches : [],
            name: "",
            displayName: "",
            shortDescription: "",
            description: "",
            overview: "",
            highlight: "",
            geoName : "",
            address : "",
            latitude : 0,
            longitude : 0,
            altitude : 0,
            destinationImages : {},
            subCatCodes : [],
            reviewTags : []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        console.log(this.state);
        this.getRegistrationMeta();
        this.getEntities();
        this.getEntityBranches();
    }

    updateDestinationImages = (index, type, value) => {
        let dstImages = this.state.destinationImages
        let dst = {index: index}
        if(dstImages[index]){
            dst = dstImages[index]
        }
        dst[type] = value
        dstImages[index] = {...dst}
        this.setState({destinationImages:dstImages})
    }

    handleOwnershipTypeChange = (e) =>{
        let val = e.target.value;
        let vals = val.split('|')
        let selectedEntities = this.state.ownershipEntities ?? []
        let max = parseInt(vals[1])
        console.log(max)
        if(max === 1){
            selectedEntities = selectedEntities.length > 0 ? [selectedEntities[0]] : [];
        }
        console.log(selectedEntities)
        let selectedEntityBranches = this.state.ownershipEntityBranches ?? []
        let branchOptions = [...this.state.entityBranches].filter(x => selectedEntities.indexOf(x.entityId+"") > -1)
        let selectedBranches = branchOptions.filter(x => selectedEntityBranches.indexOf(x.id+"") > -1).map(x=>x.id+"")
        console.log(selectedEntities, selectedEntityBranches, branchOptions, selectedBranches);
        this.setState({
            ownerShipTypeVal: val,
            ownerShipTypeCode: vals[0],
            maxOwnerCount: parseInt(vals[1]),
            ownershipEntities : [...selectedEntities],
            ownershipEntityBranches : [...selectedBranches],
            entityBranchOptions : [...branchOptions],
        })
    }

    handleEntityChange = (selectedValues) => {
        let selectedEntities = selectedValues ?? []
        console.log(selectedEntities, this.state.maxOwnerCount)
        if(this.state.maxOwnerCount == 1 && selectedEntities.length > 0){
            selectedEntities = [selectedEntities[0]]
        }
        console.log(selectedEntities, this.state.maxOwnerCount)
        let selectedEntityBranches = this.state.ownershipEntityBranches ?? []
        let branchOptions = [...this.state.entityBranches].filter(x => selectedEntities.indexOf(x.entityId+"") > -1)
        let selectedBranches = branchOptions.filter(x => selectedEntityBranches.indexOf(x.id+"") > -1).map(x=>x.id)
        if(this.state.maxOwnerCount == 1 && selectedBranches.length > 0){
            selectedBranches = [selectedBranches[0]]
        }
        this.setState({
            ownershipEntityBranches : [...selectedBranches],
            entityBranchOptions : [...branchOptions],
            ownershipEntities : [...selectedEntities],
        })
    }

    handleCreatableChange = (newValue, actionMeta, type) => {
        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
            console.log("Removed option:", actionMeta.removedValue);
            let options = this.state[type] ?? []
            let newOptions = options.filter((x) => x.value !== actionMeta.removedValue.value)
            this.setState({[type] : [...newOptions]})
        }
    };

    getEntities(){
        const token = localStorage.getItem('token');
        let cancel;
        let glob = this;
        axios({
            method : 'GET',
            url : FETCH_ENTITY_LIST,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            cancelToken: new axios.CancelToken((c)=>cancel = c)
        }).then((response) => {
            console.log(response)
            if(response.status === 200 && response.data && response.data.data){
                let result = response.data.data
                console.log(result)
                glob.setState({entities:[...result]})
            }
        }, (error) => {
            if(axios.isCancel(error)){
                return
            }
        });
    }

    getEntityBranches(){
        const token = localStorage.getItem('token');
        let cancel;
        let glob = this;
        axios({
            method : 'GET',
            url : FETCH_ENTITY_BRANCH_LIST,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            cancelToken: new axios.CancelToken((c)=>cancel = c)
        }).then((response) => {
            console.log(response)
            if(response.status === 200 && response.data && response.data.data){
                let result = response.data.data
                glob.setState({entityBranches:[...result], entityBranchOptions : [...result]})
                console.log(glob.state)
            }
        }, (error) => {
            if(axios.isCancel(error)){
                return
            }
        });
    }

    getRegistrationMeta(){
        const token = localStorage.getItem('token');
        let cancel;
        let glob = this;
        axios({
            method : 'GET',
            url : FETCH_DESTINATION_REGISTRATION_META,
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
        this.setState({[name]: value});
    };

    addDstImage = () => {
        let destinationImages = this.state.destinationImages;
        destinationImages[this.state.dstImageLastIndex] = {index:this.state.dstImageLastIndex};
        this.setState({
            destinationImages : {...destinationImages},
            dstImageLastIndex : this.state.dstImageLastIndex + 1
        });
    }

    removeDstImage = (index) => {
        let destinationImages = this.state.destinationImages;
        if(destinationImages[index]){
            delete destinationImages[index];
        }
        this.setState({
            destinationImages : {...destinationImages}
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const token = localStorage.getItem('token');
        let cancel;
        let glob = this;
        let data = new FormData();
        data.append('name', this.state.name);
        data.append('displayName', this.state.displayName);
        data.append('destinationTypeCode', this.state.destinationTypeCode);
        data.append('cityId', this.state.cityId);
        data.append('shortDescription', this.state.shortDescription);
        data.append('description', this.state.description);
        data.append('overview', this.state.overview);
        data.append('highlight', this.state.highlight);
        data.append('geotag[name]', this.state.geoName);
        data.append('geotag[address]', this.state.address);
        data.append('geotag[latitude]', this.state.latitude);
        data.append('geotag[longitude]', this.state.longitude);
        data.append('geotag[altitude]', this.state.altitude);
        data.append('ownershipTypeCode', this.state.ownerShipTypeCode);
        if(this.state.ownershipEntities){
            for(let a in this.state.ownershipEntities ?? []){
                data.append(`ownershipEntityIds[${a}]`, this.state.ownershipEntities[a]);
            }
        }
        if(this.state.subCatCodes){
            for(let a in this.state.subCatCodes ?? []){
                data.append(`tourSubCategoryCodes[${a}]`, this.state.subCatCodes[a]);
            }
        }
        if(this.state.reviewTags){
            for(let a in this.state.reviewTags ?? []){
                data.append(`reviewTagIds[${a}]`, this.state.reviewTags[a]);
            }
        }
        if(this.state.ownershipEntityBranches){
            for(let a in this.state.ownershipEntityBranches ?? []){
                data.append(`ownershipEntityBranchIds[${a}]`, this.state.ownershipEntityBranches[a]);
            }
        }
        if(this.state.tagCodes){
            let tags = this.state.tagCodes.map(x => x.value) ?? []
            for(let a in tags){
                data.append(`tagCodes[${a}]`, tags[a]);
            }
        }
        if(this.state.emails){
            let emails = this.state.emails.map(x => x.value) ?? []
            for(let a in emails){
                data.append(`emails[${a}]`,emails[a]);
            }
        }
        if(this.state.contactNos){
            let contactNos = this.state.contactNos.map(x => x.value) ?? []
            for(let a in contactNos){
                data.append(`contactNos[${a}]`, contactNos[a]);
            }
        }
        if(this.state.contactNos){
            let contactNos = this.state.contactNos.map(x => x.value) ?? []
            for(let a in contactNos){
                data.append(`contactNos[${a}]`, contactNos[a]);
            }
        }
        if(this.state.destinationImages){
            let images = Object.values(this.state.destinationImages) ?? []
            console.log(images);
            for(let a in images){
                if(images[a]['mobileImageFile']){
                    data.append(`destinationImages[${a}][mobileImageFile]`, images[a]['mobileImageFile'] ?? null);
                }
                if(images[a]['imageFile']){
                    data.append(`destinationImages[${a}][imageFile]`, images[a]['imageFile'] ?? null);
                }
                data.append(`destinationImages[${a}][displayOrder]`, images[a]['displayOrder'] ?? '0');
                data.append(`destinationImages[${a}][aspDivHeight]`, images[a]['aspDivHeight']);
                data.append(`destinationImages[${a}][aspDivWidth]`, images[a]['aspDivWidth']);
                data.append(`destinationImages[${a}][validFrom]`, images[a]['validFrom'].replace("T", " "));
                data.append(`destinationImages[${a}][validTill]`, images[a]['validTill'].replace("T", " "));
            }
        }
        axios({
            method : 'POST',
            url : NEW_DESTINATION_REGISTRATION,
            data : data,
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            cancelToken: new axios.CancelToken((c)=>cancel = c)
        }).then((response) => {
            console.log(response)
            if(response.status === 200 && response.data && response.data.status){
                $(`.back-nav`).click()
                console.log($(`.back-nav`).click());
                alert("Destination registered successfully")
            }
        }, (error) => {
            if(axios.isCancel(error)){
                return
            }
        });
    }

    render() {
        return <div className={`add-new-destination`}>
            <div className={`d-flex align-items-center`}>
                <h1 className={`flex-1`}>Add New Destination</h1>
                <a href={'/destinations'} className={`btn btn-sm btn-default back-nav border`}>All Destinations</a>
            </div>
            <div className={`destination-from`}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className={`card mt-2 mb-0`}>
                        <div className={`card-header`}>
                            <h2>Destination Info</h2>
                        </div>
                        <div className={`card-body pt-3`}>
                            <div className={`row`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Destination Type</label>
                                        <br/>
                                        <Select2 onChange={(e) => this.setState({
                                            destinationTypeCode: e.target.value
                                        })}
                                                 value={this.state.destinationTypeCode}
                                                 className={`w-100 form-control destination-type mt-2`}
                                                 data={(this.state.meta && this.state.meta.destinationTypes
                                                     ? this.state.meta.destinationTypes.map(x => {
                                                         return {text: x.name, id: x.code}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select one type',
                                                 }}
                                        />
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Name</label>
                                        <input required name={`name`} value={this.state.name}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Display Name</label>
                                        <input required name={`displayName`} value={this.state.displayName}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">City</label>
                                        <br/>
                                        <Select2 onChange={(e) => this.setState({
                                            cityId: e.target.value
                                        })}
                                                 value={this.state.cityId}
                                                 className={`w-100 form-control destination-type mt-2`}
                                                 data={(this.state.meta && this.state.meta.cities
                                                     ? this.state.meta.cities.map(x => {
                                                         return {text: `${x.name} - ${x.districtName}`, id: x.id}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select one city',
                                                 }}
                                        />
                                    </div>
                                </div>
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Short Description</label>
                                        <input required name={`shortDescription`} value={this.state.shortDescription}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Description</label>
                                        <textarea name={`description`} value={this.state.description}
                                                  onChange={this.handleInputChange}
                                                  className="form-control f-sm  mt-1 region-select r-name">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Sub-Categories</label>
                                        <br/>
                                        <Select2 multiple value={this.state.subCatCodes}
                                                 onChange={(e) => {
                                                     let selected = [...e.target.selectedOptions].map(o => o.value)
                                                     this.setState({subCatCodes: [...selected]})
                                                 }} className={`w-100 form-control sub-cats mt-2`}
                                                 data={(this.state.meta && this.state.meta.subCategories
                                                     ? this.state.meta.subCategories.map(x => {
                                                         return {text: x.name, id: x.code}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select sub categories',
                                                 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Destination Review Tags</label>
                                        <br/>
                                        <Select2 multiple value={this.state.reviewTags}
                                                 onChange={(e) => {
                                                     let selected = [...e.target.selectedOptions].map(o => o.value)
                                                     this.setState({reviewTags: [...selected]})
                                                 }}
                                                 className={`w-100 form-control review-tags mt-2`}
                                                 data={(this.state.meta && this.state.meta.cities
                                                     ? this.state.meta.reviewTags.map(x => {
                                                         return {text: `${x.name}`, id: x.id}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select one city',
                                                 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Emails</label>
                                        <br/>
                                        <CreatableSelect
                                            onChange={(newValue, actionMeta) => {
                                                this.handleCreatableChange(newValue, actionMeta, 'emails')
                                            }}
                                            value={this.state.emails}
                                            options={this.state.emails}
                                            onCreateOption={(inputValue) => {
                                                const newOption = {value: inputValue, label: inputValue};
                                                this.setState({emails: [...this.state.emails, newOption]})
                                            }}
                                            className={`emails`} isMulti/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Contact Numbers</label>
                                        <br/>
                                        <CreatableSelect
                                            onChange={(newValue, actionMeta) => {
                                                this.handleCreatableChange(newValue, actionMeta, 'contactNos')
                                            }}
                                            value={this.state.contactNos}
                                            options={this.state.contactNos}
                                            onCreateOption={(inputValue) => {
                                                const newOption = {value: inputValue, label: inputValue};
                                                this.setState({contactNos: [...this.state.contactNos, newOption]})
                                            }}
                                            className={`contact-nos`} isMulti/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Tags</label>
                                        <br/>
                                        <CreatableSelect
                                            onChange={(newValue, actionMeta) => {
                                                this.handleCreatableChange(newValue, actionMeta, 'tagCodes')
                                            }}
                                            value={this.state.tagCodes}
                                            options={this.state.tagCodes}
                                            onCreateOption={(inputValue) => {
                                                const newOption = {value: inputValue, label: inputValue};
                                                this.setState({tagCodes: [...this.state.tagCodes, newOption]})
                                            }}
                                            className={`contact-nos`} isMulti/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Overview</label>
                                        <textarea required rows={5} name={`overview`} onChange={this.handleInputChange}
                                                  className="form-control f-sm  mt-1 region-select r-name">
                                            {this.state.overview}
                                        </textarea>

                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-3`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Highlight</label>
                                        <textarea required rows={5} name={`highlight`} onChange={this.handleInputChange}
                                                  className="form-control f-sm  mt-1 region-select r-name">
                                            {this.state.highlight}
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-3 mb-0`}>
                        <div className={`card-header`}>
                            <div className={`d-flex align-items-center`}>
                                <h2 className={`flex-1`}>Ownership Details</h2>
                            </div>
                        </div>
                        <div className={`card-body pt-3`}>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Ownership Type</label>
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
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Ownership Entities</label>
                                        <br/>
                                        <Select2 multiple value={this.state.ownershipEntities}
                                                 onChange={(e) => {
                                                     this.handleEntityChange([...e.target.selectedOptions].map(o => o.value))
                                                 }}
                                                 className={`w-100 form-control entities mt-2`}
                                                 data={(this.state.entities && this.state.entities.length > 0
                                                     ? this.state.entities.map(x => {
                                                         return {text: x.name, id: x.id}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select one type',
                                                 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-12`}>
                                    <div className="form-group mb-0">
                                        <label className={`mb-1`} htmlFor="region2">Ownership Entity Branches</label>
                                        <br/>
                                        <Select2 multiple value={this.state.ownershipEntityBranches}
                                                 onChange={(e) => {
                                                     let selectedBranches = [...e.target.selectedOptions].map(o => o.value)
                                                     if (this.state.maxOwnerCount == 1 && selectedBranches.length > 0) {
                                                         selectedBranches = [selectedBranches[0]]
                                                     }
                                                     this.setState({ownershipEntityBranches: [...selectedBranches]})
                                                 }}
                                                 className={`w-100 form-control entities mt-2`}
                                                 data={(this.state.entityBranchOptions && this.state.entityBranchOptions.length > 0
                                                     ? this.state.entityBranchOptions.map(x => {
                                                         return {text: x.name, id: x.id}
                                                     }) : [])}
                                                 options={{
                                                     placeholder: 'Select one type',
                                                 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-3 mb-0`}>
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
                                        <input required name={`geoName`} value={this.state.geoName}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-8`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Address</label>
                                        <input required name={`address`} value={this.state.address}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`row mt-2`}>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Latitude</label>
                                        <input type={`number`} name={`latitude`} value={this.state.latitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Longitude</label>
                                        <input type={`number`} name={`longitude`}
                                               value={this.state.longitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                                <div className={`col-4`}>
                                    <div className="form-group mb-0">
                                        <label htmlFor="region2">Altitude</label>
                                        <input type={`number`} name={`altitude`} value={this.state.altitude}
                                               onChange={this.handleInputChange}
                                               className="form-control f-sm  mt-1 region-select r-name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`card mt-3 mb-0`}>
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
                                Object.values(this.state.destinationImages).map((item, index) => {
                                    return <DestinationImageComponent onChange={this.updateDestinationImages} removeDstImage={this.removeDstImage}
                                                                      key={`dst-img-${index}`} index={item['index']}
                                                                      item={item}/>
                                })
                            }
                        </div>
                    </div>

                    <div className={`card mt-3`}>
                        <div className={`card-body pt-3`}>
                            <div className={`row mt-2`}>
                                <div className={`col-2`}>
                                    <div className="form-group mb-0">
                                        <button type={`submit`} className="form-control btn btn-success btn-sm">Register
                                            Now
                                        </button>
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

export default DestinationRegistration;