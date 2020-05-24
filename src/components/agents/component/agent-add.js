import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, Fields, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import {Button,Modal} from "reactstrap";
import {BaseComponent} from '../../Common/base-component';
import {COMMON_FAIL_MESSAGE,LABEL_POSITION_TOP} from '../../Common/constant';
import {openAgentCreateModal} from '../action';
import {showSuccess,showError} from '../../Common/errorbar';
import LocaleStrings from '../../../languages';

class AddAgent extends Component {
    constructor(props) {
        super(props);        
        this.state = {loading: false};
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.openAgentCreateModal({showModal: false});
    }

    onSubmitForm = (values) => {
        let {editMode,session} = this.props;
        console.log('Values: -', values)
        
    }
    

    render() {
        var {modalStatus,editMode, handleSubmit, pristine, reset, submitting, invalid} = this.props;
        var edit=editMode;
        let spinner = this.state.loading ? 'fas fa-spinner fa-pulse' : '';
        
        return (
            <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
                <div className="modal-header">
                    <h2 className="modal-title" id="modal-title-default"> {edit ? LocaleStrings.agents_madal_title_edit : LocaleStrings.agents_madal_title_add}</h2>
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
                        <AgentForm {...this.props}/>
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
    
    // return errors;
}

function mapStateToProps(state) {
    var edit = false;
    var initVals = {}
    
    return {
        session: state.session,
        modalStatus: state.agentCreateModal,
        editMode: edit,
        initialValues: initVals,
    };
}

export default connect(mapStateToProps, {openAgentCreateModal,showSuccess,showError}) (reduxForm({
    validate,
    form:'AgentForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}) (AddAgent));

class AgentForm extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    
    render() {
        
        return (
            <div>
                Hello
            </div>
        );
    }
}