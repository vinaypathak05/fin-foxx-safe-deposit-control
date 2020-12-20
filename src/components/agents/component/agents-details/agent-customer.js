import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Card,CardHeader,CardFooter,Row,Col,Table,Button} from "reactstrap";
import LocaleStrings from '../../../../languages';
import CreateNew from '../../../customers/component/customer-add';
// import RenderList from './agent-customer-list';
import RenderList from '../../../customers/component/customers-list';
import CustomerPayment from '../../../customers/component/customer-amount-received';
import {fetchSingleAgentWalletRecharges,fetchSingleAgent,fetchSingleAgentCustomers} from '../../action';
import {openCustomerCreateModal} from '../../../customers/action';
import Loader from '../../../Common/loader'
import Pagination from '../../../Common/pagination';

class AgentCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {pageNumber: 1}
    }

    componentDidMount() {
        
    }

    openModal = () => {
        this.props.openCustomerCreateModal({showModal: true});
    }

    additionalCallback = () => {
        this.paginationCallback(1);
    }

    paginationCallback = (pageNumber) => {
        let {selectedAgent} = this.props;
        
        this.props.fetchSingleAgentCustomers(this.props.session, selectedAgent.agentDetails.agentid, pageNumber, (response) => {
            this.props.fetchSingleAgent(this.props.session, selectedAgent.agentDetails.agentid);
        });
        
        this.setState({...this.state, pageNumber});
    }

    listRender = () => {
        let {pageNumber} = this.state;
        
        return _.map(this.props.agentCustomers.data, (item, index) => {
            return <RenderList key={index} history={this.props.history} printList={item} pagination={this.paginationCallback} currentPage={pageNumber} callfrom="agent"/>;
        });
    }

    render() {
        let {selectedAgent,modalStatus,agentCustomers,customerPaymentModalStatus} = this.props;

        return (
            <Row className="m-2">
                <div className="col p-2">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <Row>
                                <Col md={6}>
                                    <h2>{LocaleStrings.customers}</h2>
                                </Col>
                                {selectedAgent && selectedAgent.agentDetails && selectedAgent.agentDetails.approvalstatus === 'approved' && selectedAgent.agentDetails.status === 'active' ? 
                                    <Col md={6} className="text-right">
                                        <Button color="primary" size="sm" type="button" className="ml-3" onClick={this.openModal}>{LocaleStrings.button_new_customer}</Button>
                                    </Col>
                                :   
                                    ''
                                }
                            </Row>
                            
                            {modalStatus && modalStatus.showModal ? 
                                <CreateNew finishOperationsCallback={this.additionalCallback} callfrom="agent" selectedAgent={selectedAgent}/>
                            :
                                ''
                            }
                        </CardHeader>
                        {agentCustomers && agentCustomers.data ?
                            <div>
                                {agentCustomers.data && agentCustomers.data.length > 0 ?
                                    <Table className="align-items-center table-flush min-height-135 tablelist" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_fullname}</th>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_email}</th>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_mobile}</th>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_paymentmode}</th>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_paidtilldate}</th>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_dueamount}</th>
                                                <th scope="col">{LocaleStrings.agents_detail_table_th_planamount}</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.listRender()}

                                        </tbody>
                                    </Table>
                                :
                                    <div className="no-content-message">{LocaleStrings.no_record}</div>
                                }

                                {agentCustomers.count > 10 ?
                                    <CardFooter className="py-4">
                                        <Pagination
                                            activePage={this.state.pageNumber}
                                            itemsCountPerPage={10}
                                            totalItemsCount={agentCustomers.count}
                                            pageRangeDisplayed={3}
                                            onChange={this.paginationCallback}
                                        />
                                    </CardFooter>
                                :
                                    ''
                                }
                            </div>
                        :
                            <div className="loaderstyle">
                                <Loader />
                            </div>
                        }
                    </Card>
                    {customerPaymentModalStatus && customerPaymentModalStatus.showModal ? <CustomerPayment finishOperationsCallback={this.additionalCallback}/> : '' }
                </div>                
            </Row>
        );
    }
}

function mapStateToProps(state) {
    // console.log('state :- ', state.customerPaymentReceiveModal);

    return {
        session: state.session,
        selectedAgent: state.selectedAgent,
        modalStatus: state.customerCreateModal,
        agentCustomers: state.agentCustomers,
        customerPaymentModalStatus: state.customerPaymentReceiveModal
    };
}

export default connect(mapStateToProps, {openCustomerCreateModal,fetchSingleAgentWalletRecharges,fetchSingleAgent,fetchSingleAgentCustomers})(AgentCustomer);