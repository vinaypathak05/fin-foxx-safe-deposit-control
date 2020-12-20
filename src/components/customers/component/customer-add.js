import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import {Button,Modal} from "reactstrap";
import {Tabs,Tab} from 'react-bootstrap';
import {BaseComponent} from '../../Common/base-component';
import {COMMON_FAIL_MESSAGE,LABEL_POSITION_TOP,validateEmail,validatePhoneNumbers,BASE_IMAGES_URL} from '../../Common/constant';
import {openCustomerCreateModal, addCustomer, addCustomerPlan, customerKycFiles} from '../action';
import {showSuccess,showError} from '../../Common/errorbar';
import LocaleStrings from '../../../languages';
import ImagesDrop from '../../Common/image-upload';
import UploadIcon from '../../../assets/img/icons/picture.png';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, selectedTab: 1};
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.openCustomerCreateModal({showModal: false, selectedTab: 1});
    }

    handleSelect = (key) => {
        this.setState({selectedTab: key})
    }

    onSubmitForm = (values) => {
        let {editMode,session,allPlans} = this.props;
        // console.log('Values: -', values)

        if(!editMode) {
            this.setState({loading: true});
            this.props.addCustomer(session, values, (response) => {
                
                if(response.success == 1) {
                    
                    let filter = _.filter(allPlans.data, obj => { return obj.planid == values.planidfk});
                    let pvalue = {customeridfk: response.data.insertId, planidfk: values.planidfk, planleftamount: filter[0].planamount};

                    this.props.addCustomerPlan(session, pvalue, (pres) => {
                        this.setState({loading:false});

                        if(pres.success == 1) {
                            this.props.showSuccess(LocaleStrings.agents_add_form_success);
                            this.props.finishOperationsCallback();
                            this.closeModal();
                        }
                        else {
                            this.props.showError(COMMON_FAIL_MESSAGE);        
                        }
                    });
                }
                else if(response.success == 2) {
                    this.setState({loading:false});
                    let message = COMMON_FAIL_MESSAGE;
                    if(response.data.email != '') {
                        message = response.data.email;
                    }
                    else if(response.data.mobile != '') {
                        message = response.data.mobile;
                    }
                    else if(response.data.firstname != '') {
                        message = response.data.firstname;
                    }
                    else if(response.data.lastname != '') {
                        message = response.data.lastname;
                    }
                    else if(response.data.paymentmode != '') {
                        message = response.data.paymentmode;
                    }

                    this.props.showError(message);
                }
                else {
                    this.setState({loading:false});
                    this.props.showError(COMMON_FAIL_MESSAGE);
                }
            });
        }
        
    }
    

    render() {
        var {modalStatus,editMode, handleSubmit, pristine, reset, submitting, invalid} = this.props;
        var edit=editMode;
        let spinner = this.state.loading ? 'fas fa-spinner fa-pulse' : '';
        
        return (
            <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
                <div className="modal-header">
                    <h2 className="modal-title" id="modal-title-default"> {edit ? LocaleStrings.customers_madal_title_edit : LocaleStrings.customers_madal_title_add}</h2>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.closeModal()}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <hr />
                <form onSubmit={handleSubmit(this.onSubmitForm)} encType="multipart/form-data">
                    <div className="modal-body">
                        <Tabs className="branding-tabs mt-0" id="speaker-from-tab" activeKey={this.state.selectedTab} onSelect={this.handleSelect}>
                            <Tab className="pt-3" eventKey={1} title={LocaleStrings.customers_madal_tab_text_basic_details}>
                                <CustomerForm {...this.props}/>
                            </Tab>
                            <Tab className="pt-3" eventKey={2} title={LocaleStrings.customers_madal_tab_text_others_details}>
                                <OthersForm {...this.props}/>
                            </Tab>
                            <Tab className="pt-3" eventKey={3} title={LocaleStrings.customers_madal_tab_text_docs_details}>
                                <KYCFileUpload {...this.props}/>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="modal-footer">
                        <Button color="secondary" onClick={this.closeModal}>{LocaleStrings.button_close}</Button>
                        <Button color="primary" type="submit" disabled={ pristine || invalid || submitting }><i className={spinner} aria-hidden="true"></i> {LocaleStrings.button_save}</Button>
                    </div>
                </form>
            </Modal>
        );
    }
}

function validate(values) {
    // console.log('values : - ', values)
    let errors = {};
    var createdby = values['createdby'];
    var planidfk = values['planidfk'];
    var paymentmode = values['paymentmode'];
    var firstname = values['firstname'];
    var lastname = values['lastname'];
    var email = values['email'];
    var mobile = values['mobile'];
    var userpic = values['userpic'];
    var aadhaarfrontpic = values['aadhaarfrontpic'];
    var aadhaarbackpic = values['aadhaarbackpic'];
    var bankdetailspic = values['bankdetailspic'];

    if (!createdby || createdby === '') {
        errors['createdby'] = LocaleStrings.required;
    }

    if (!planidfk || planidfk === '') {
        errors['planidfk'] = LocaleStrings.required;
    }

    if (!paymentmode || paymentmode === '') {
        errors['paymentmode'] = LocaleStrings.required;
    }

    if (!firstname || firstname.trim() === '') {
        errors['firstname'] = LocaleStrings.required;
    }

    if (!lastname || lastname.trim() === '') {
        errors['lastname'] = LocaleStrings.required;
    } 
    
    if(email && !validateEmail(email)) {
        errors['email'] = LocaleStrings.agents_validation_invalid_email;
    }

    if (!mobile || mobile.trim() === '') {
        errors['mobile'] = LocaleStrings.required;
    }
    if(mobile && !validatePhoneNumbers(mobile)) {
        errors['mobile'] = LocaleStrings.agents_validation_invalid_mobile_number;
    }

    if (!userpic || userpic.trim() === '') {
        errors['userpic'] = LocaleStrings.required;
    }

    if (!aadhaarfrontpic || aadhaarfrontpic.trim() === '') {
        errors['aadhaarfrontpic'] = LocaleStrings.required;
    }

    if (!aadhaarbackpic || aadhaarbackpic.trim() === '') {
        errors['aadhaarbackpic'] = LocaleStrings.required;
    }

    if (!bankdetailspic || bankdetailspic.trim() === '') {
        errors['bankdetailspic'] = LocaleStrings.required;
    }

    return errors;
}

function mapStateToProps(state, ownProps) {
    var edit = false;
    var initVals = ownProps.callfrom === 'agent' ? {createdby: ownProps.selectedAgent.agentDetails.agentid} : {}
    
    return {
        session: state.session,
        modalStatus: state.customerCreateModal,
        customerKYCFiles: state.customerKYCFiles,
        editMode: edit,
        initialValues: initVals,
        allAgents: state.allAgentsList,
        allPlans: state.allPlansList
    };
}

export default connect(mapStateToProps, {openCustomerCreateModal,addCustomer,addCustomerPlan,customerKycFiles,showSuccess,showError}) (reduxForm({
    validate,
    form:'CustomerForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}) (AddCustomer));

class CustomerForm extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    
    render() {
        let {allAgents,allPlans} = this.props;
        let agentOptions = [];
        let planOptions = [];
        let paymentModeOptions = [
            {label: 'Daily', value: 'daily'},
            {label: 'Monthly', value: 'monthly'},
            {label: 'One-time', value: 'onetime'}
        ];

        _.map(allAgents.data, (item, index) => {
            var obj = { label:`${item.fullname}`, value:(item.agentid.toString())};
            agentOptions.push(obj);
        });

        _.map(allPlans.data, (item, index) => {
            var obj = { label:`${item.planname}`, value:(item.planid.toString())};
            planOptions.push(obj);
        });
        
        return (
            <div>
                <Field
                    name="createdby"
                    label={LocaleStrings.customers_add_form_label_user_agent}
                    placeholder={LocaleStrings.customers_add_form_ph_user_agent}
                    component={this.renderFieldSelect}
                    mandatory='true'
                    opts={agentOptions}
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="planidfk"
                    label={LocaleStrings.customers_add_form_label_plan}
                    placeholder={LocaleStrings.customers_add_form_ph_plan}
                    component={this.renderFieldSelect}
                    mandatory='true'
                    opts={planOptions}
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="paymentmode"
                    label={LocaleStrings.customers_add_form_label_payment_mode}
                    placeholder={LocaleStrings.customers_add_form_ph_payment_mode}
                    component={this.renderFieldSelect}
                    mandatory='true'
                    opts={paymentModeOptions}
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="email"
                    label={LocaleStrings.customers_add_form_label_email}
                    placeholder={LocaleStrings.customers_add_form_ph_email}
                    type="email"
                    component={this.renderFieldText}
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="firstname"
                    label={LocaleStrings.customers_add_form_label_firstname}
                    placeholder={LocaleStrings.customers_add_form_ph_firstname}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='true'
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="lastname"
                    label={LocaleStrings.customers_add_form_label_lastname}
                    placeholder={LocaleStrings.customers_add_form_ph_lastname}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='true'
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="mobile"
                    label={LocaleStrings.customers_add_form_label_mobile}
                    placeholder={LocaleStrings.customers_add_form_ph_mobile}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='true'
                    labelposition={LABEL_POSITION_TOP}
                />
            </div>
        );
    }
}

class OthersForm extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    
    render() {
        
        return (
            <div>
                <Field
                    name="address1"
                    label={LocaleStrings.customers_add_form_label_address1}
                    placeholder={LocaleStrings.customers_add_form_ph_address1}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='false'
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="address2"
                    label={LocaleStrings.customers_add_form_label_address2}
                    placeholder={LocaleStrings.customers_add_form_ph_address2}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='false'
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="city"
                    label={LocaleStrings.customers_add_form_label_city}
                    placeholder={LocaleStrings.customers_add_form_ph_city}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='false'
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="state"
                    label={LocaleStrings.customers_add_form_label_state}
                    placeholder={LocaleStrings.customers_add_form_ph_state}
                    type="text"
                    component={this.renderFieldText}
                    mandatory='false'
                    labelposition={LABEL_POSITION_TOP}
                />
                <Field
                    name="pincode"
                    label={LocaleStrings.customers_add_form_label_pin}
                    placeholder={LocaleStrings.customers_add_form_ph_pin}
                    type="number"
                    component={this.renderFieldText}
                    mandatory='false'
                    labelposition={LABEL_POSITION_TOP}
                />
            </div>
        );
    }
}

class KYCFileUpload extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {fileChanged: true}
    }
  
    onFilesDrop = (index, files) => {
        let {customerKYCFiles} = this.props;

        // console.log('files :- ', files)
        // console.log('index :- ', index)
        // console.log('customerKYCFiles :- ', customerKYCFiles)

        customerKYCFiles[index].file = files.file ? files.file : "";
        customerKYCFiles[index].filename = files.filename ? files.filename : "";

        // console.log('customerKYCFiles : - ', customerKYCFiles)
        this.props.customerKycFiles(customerKYCFiles);

        this.props.autofill(customerKYCFiles[index].key, files.file);
    }

    onFileAvailable = (available) => {
        this.setState({fileChanged: !this.state.fileChanged})
    }

    otherFiles = () => {
        let {customerKYCFiles} = this.props;
        // console.log('customerKYCFiles : - ', customerKYCFiles)

        return _.map(customerKYCFiles, (item, index) => {
            // console.log('index :- ', index);
            var filePreview = '';
            var fileName = '';
            var fileOld = false;

            if(item && item.file && item.file != '') {
                var file = item.file;
                fileName = item.filename;
                filePreview = `${BASE_IMAGES_URL}/${file}`;
                fileOld = true;
                var n = file.search(";base64,");
                if(n > 0) {
                    filePreview = `${file}`;          
                    fileOld = false;
                }
            }
        
            return(
                <>
                    <ImagesDrop
                        key={`key-${index}`}
                        label={item.label}
                        width={350}
                        height='auto'
                        onFileSave={this.onFilesDrop.bind(this,index)}
                        filepath={filePreview}
                        onFileChnageLocally={this.onFileAvailable}
                        fileName={fileName}
                        fileOld={fileOld}
                        className='content-files-dropbox'
                        innerText={<div className="content-files-drop-text"><div><img src={`${UploadIcon}`}/></div><div>{LocaleStrings.drag_and_drop} <br />{LocaleStrings.or} <span className="select-file">{LocaleStrings.select_file}</span></div></div>}
                    />
                    <Field
                        name={item.key}
                        type="text"
                        component={this.renderHiddenFieldTextShowError}
                    />
                </>
            );
        });
    }

    render() {
        return (
            <div className="dashboard-inside-container">
                <div className="row">
                    {this.otherFiles()}
                </div>
            </div>
        );
    }
}