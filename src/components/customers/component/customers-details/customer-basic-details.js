import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card,Row,Table} from "reactstrap";
import LocaleStrings from '../../../../languages';

class CustomerBasicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false}
    }
    
    render() {
        let {selectedCustomer} = this.props;
        // console.log('selectedCustomer: -', selectedCustomer)

        return (
            <Row className="m-2">
                <div className="col-md-3 p-2">
                    <Card className="shadow text-center pb-3">
                        <h4 className="p-2 mb-3">{selectedCustomer.details ? selectedCustomer.details.fullname : ''}</h4>
                        <div className="text-xs mb-3">{LocaleStrings.customer_detail_text_plan_amount}: <span className="fa-lg">{selectedCustomer.details ? parseFloat(selectedCustomer.details.planamount).toFixed(2) : '0.00'}</span></div>
                        <div className="text-xs mb-3">{LocaleStrings.customer_detail_text_plan_due_amount}: <span className="fa-lg">{selectedCustomer.details ? parseFloat(selectedCustomer.details.planleftamount).toFixed(2) : '0.00'}</span></div>
                    </Card>
                </div>
                <div className="col-md-9 p-2">
                    <Card className="shadow">
                        <h4 className="p-2 text-center">{LocaleStrings.customerDetails}</h4>
                        
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">{LocaleStrings.customers_table_th_agentname}</th>
                                    <th scope="col">{LocaleStrings.agents_detail_table_th_email}</th>
                                    <th scope="col">{LocaleStrings.agents_detail_table_th_mobile}</th>
                                    <th scope="col">{LocaleStrings.agents_detail_table_th_paymentmode}</th>
                                    <th scope="col">{LocaleStrings.agents_detail_table_th_planname}</th>
                                    <th scope="col">{LocaleStrings.agents_detail_table_th_planduration}</th>
                                    <th scope="col">{LocaleStrings.agents_detail_table_th_paidtilldate}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_approvalstatus}</th>
                                    <th scope="col">{LocaleStrings.agents_table_th_status}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.agentname : ''}</div></td>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.email : ''}</div></td>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.mobile : ''}</div></td>
                                    <td><div className="text-capitalize">{selectedCustomer.details ? selectedCustomer.details.paymentmode : ''}</div></td>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.planname : ''}</div></td>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.planduration + ' days' : ''}</div></td>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.paidtilldate : 0.00}</div></td>
                                    <td><div>{selectedCustomer.details ? selectedCustomer.details.approvalstatus : ''}</div></td>
                                    <td><div className="text-capitalize">{selectedCustomer.details ? selectedCustomer.details.status : ''}</div></td>
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
    }
}

export default connect(mapStateToProps)(CustomerBasicDetails);