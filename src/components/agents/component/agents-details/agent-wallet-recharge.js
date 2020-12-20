import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import {Button,Modal} from "reactstrap";
import {BaseComponent} from '../../../Common/base-component';
import {COMMON_FAIL_MESSAGE,LABEL_POSITION_TOP,AGENT_INSENTIVE,AGENT_SECURITY_AMOUNT} from '../../../Common/constant';
import {openWalletRechargeModal,agentWalletRecharge} from '../../action';
import {showSuccess,showError} from '../../../Common/errorbar';
import LocaleStrings from '../../../../languages';

class WalletRecharge extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, };
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.openWalletRechargeModal({showModal: false});
    }

    onSubmitForm = (data) => {
        let {selectedAgent,session,agentAllRecharges} = this.props;
        // console.log('Values: -', data)
        let rechargeMoney = data.amountpaid;
        let amount = rechargeMoney;
        let insentive = Math.round((parseInt((amount*AGENT_INSENTIVE))/100));
        let fullamount = Math.round(parseInt(insentive) + parseInt(amount));
        let values = {};

        if(agentAllRecharges && agentAllRecharges.data && agentAllRecharges.data.length == 0) {
            amount = (rechargeMoney - AGENT_SECURITY_AMOUNT);

            values.securityamount = AGENT_SECURITY_AMOUNT;
            insentive = Math.round((parseInt((amount*AGENT_INSENTIVE))/100));
            fullamount = Math.round(parseInt(insentive) + parseInt(amount));
        }
        
        values.amountpaid = amount;
        values.insentive = insentive;
        values.agentidfk = selectedAgent.agentDetails.agentid;
        values.transactiontype = 'WR';
        values.walletid = selectedAgent.agentDetails.walletid;
        values.balance = parseFloat(selectedAgent.agentDetails.balance)+parseFloat(fullamount);
        values.earnings = parseFloat(selectedAgent.agentDetails.earnings)+parseFloat(insentive);
        // console.log('Values1: -', values)
        
        this.setState({loading: true});
        this.props.agentWalletRecharge(session, values, (response) => {
            this.setState({loading:false});
            
            if(response.success == 1) {
                this.props.showSuccess(LocaleStrings.agents_detail_wallet_add_form_success);
                this.props.finishOperationsCallback(selectedAgent.agentDetails.agentid);
                this.closeModal();
            }
            else if(response.success == 2) {
                let message = COMMON_FAIL_MESSAGE;
                if(response.data.agentidfk != '') {
                    message = response.data.agentidfk;
                }
                else if(response.data.walletid != '') {
                    message = response.data.walletid;
                }
                else if(response.data.amountpaid != '') {
                    message = response.data.amountpaid;
                }

                this.props.showError(message);
            }
            else {
                this.props.showError(COMMON_FAIL_MESSAGE);
            }
        });
    }
    

    render() {
        var {modalStatus, handleSubmit, pristine, reset, submitting, invalid, selectedAgent, agentAllRecharges} = this.props;
        let spinner = this.state.loading ? 'fas fa-spinner fa-pulse' : '';
        
        return (
            <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
                <div className="modal-header">
                    <h2 className="modal-title" id="modal-title-default"> {LocaleStrings.agents_detail_wallet_madal_title_recharge}</h2>
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
                        {agentAllRecharges && agentAllRecharges.data && agentAllRecharges.data.length == 0 ?
                            <div className="mb-4">
                                <i className="fa fa-info-circle text-info" aria-hidden="true" style={{fontSize: 20}}></i>&nbsp; 
                                {LocaleStrings.agents_detail_wallet_text_security_money}: Rs.{AGENT_SECURITY_AMOUNT}
                            </div>
                        :
                            ''
                        }

                        <AgentWalletForm {...this.props}/>
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

function validate(values, ownProps) {
    // console.log('values : - ', values)
    
    let {agentAllRecharges} = ownProps;
    let errors = {};
    var amountpaid = values['amountpaid'];

    if(!amountpaid || amountpaid === '') {
        errors['amountpaid'] = LocaleStrings.required;
    }
    else if(agentAllRecharges && agentAllRecharges.data && agentAllRecharges.data.length > 0 && amountpaid && amountpaid < 10) {
        errors['amountpaid'] = LocaleStrings.agents_detail_wallet_validation_invalid_amount;
    }
    else if(agentAllRecharges && agentAllRecharges.data && agentAllRecharges.data.length == 0 && amountpaid && amountpaid < AGENT_SECURITY_AMOUNT) {
        errors['amountpaid'] = LocaleStrings.agents_detail_wallet_validation_security_amount_required;
    }

    return errors;
}

function mapStateToProps(state) {

    return {
        session: state.session,
        modalStatus: state.agentWalletRechrgeModal,
        selectedAgent: state.selectedAgent,
    };
}

export default connect(mapStateToProps, {openWalletRechargeModal,agentWalletRecharge,showSuccess,showError}) (reduxForm({
    validate,
    form:'AgentWalletForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}) (WalletRecharge));

class AgentWalletForm extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    
    render() {
        
        return (
            <div>
                <Field
                    name="amountpaid"
                    label={LocaleStrings.agents_detail_wallet_add_form_label_amount}
                    placeholder={LocaleStrings.agents_detail_wallet_add_form_ph_amount}
                    type="number"
                    component={this.renderFieldText}
                    mandatory='true'
                    labelposition={LABEL_POSITION_TOP}
                />
            </div>
        );
    }
}