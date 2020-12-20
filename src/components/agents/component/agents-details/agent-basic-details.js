import React, {Component} from 'react';
import {connect} from 'react-redux';
import {  
    Card,
    Row,
    Table
} from "reactstrap";

import LocaleStrings from '../../../../languages';

class AgentBasicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false}
    }
    
    render() {
        let {selectedAgent,agentCustomers} = this.props;
        // console.log('selectedAgent: -', selectedAgent)

        return (
            <Row className="m-2">
                <div className="col-md-3 p-2">
                    <Card className="shadow text-center pb-3">
                        <h4 className="p-2 mb-2">{selectedAgent.agentDetails ? selectedAgent.agentDetails.fullname : ''}</h4>
                        <div className="text-xs mb-2">{LocaleStrings.agents_detail_text_wallet_amount}: <span className="fa-lg">{selectedAgent.agentDetails ? parseFloat(selectedAgent.agentDetails.balance).toFixed(2) : '0.00'}</span></div>
                        <div className="text-xs mb-2">{LocaleStrings.agents_detail_text_earned_amount}: <span className="fa-lg">{selectedAgent.agentDetails ? parseFloat(selectedAgent.agentDetails.earnings).toFixed(2) : '0.00'}</span></div>
                        <div className="text-xs mb-3">{LocaleStrings.agents_detail_text_total_client}: <span className="fa-lg">{agentCustomers && agentCustomers.count ? agentCustomers.count : 0}</span></div>
                    </Card>
                </div>
                <div className="col-md-9 p-2">
                    <Card className="shadow">
                        <h4 className="p-2 text-center mt-2">{LocaleStrings.agentDetails}</h4>
                        
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">{LocaleStrings.agents_table_th_security_amount}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_email}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_mobile}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_approvalstatus}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_status}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_bank_name}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_bank_acc}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_bank_ifsc}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_bank_branch}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.securityamount : '0.00'}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.email : ''}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.mobile : ''}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.approvalstatus : ''}</div>
                                    </td>
                                    <td>
                                        <div className="text-capitalize">{selectedAgent.agentDetails ? selectedAgent.agentDetails.status : ''}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.bankname : ''}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.bankaccount : ''}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.bankifsc : ''}</div>
                                    </td>
                                    <td>
                                        <div>{selectedAgent.agentDetails ? selectedAgent.agentDetails.bankbranch : ''}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
        );
    }
}

export var mapStateToProps = (state) => {
    return {
        session: state.session,
        agentCustomers: state.agentCustomers,
    }
}

export default connect(mapStateToProps)(AgentBasicDetails);