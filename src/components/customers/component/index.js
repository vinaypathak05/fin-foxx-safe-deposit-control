import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import {Container,Card,CardHeader,CardBody,CardFooter,Table,Row,Col,Button} from "reactstrap";
import {fetchCustomers, searchCustomers, openCustomerCreateModal, customerKycFiles} from '../action';
import {fetchAllAgents} from '../../agents/action';
import {fetchAllPlans} from '../../plans/action';
import RenderList from './customers-list';
import CreateNew from './customer-add';
import CustomerPayment from './customer-amount-received';
import ApproveCustomer from './customer-approve';
import Header from "../../Headers/Header.jsx";
import Pagination from '../../Common/pagination';
import {itemCount} from '../../Common/constant';
import Loader from '../../Common/loader'
import LocaleStrings from '../../../languages';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state={pageNumber:1, search:''}
    }

    componentDidMount() {
        this.props.fetchCustomers(this.props.session);
        this.props.fetchAllAgents(this.props.session);
        this.props.fetchAllPlans(this.props.session);
    }

    openModal = () => {
        var files = [
            {label:'Profile Photo', key:'userpic', file:'', filename:''},
            {label:'Aadhaar Front Photo', key:'aadhaarfrontpic', file:'', filename:''},
            {label:'Aadhar Back Photo', key:'aadhaarbackpic', file:'', filename:''},
            {label:'Bank Account Photo', key:'bankdetailspic', file:'', filename:''},
        ];

        this.props.customerKycFiles(files);
        this.props.openCustomerCreateModal({showModal: true});
    }

    additionalCallback = () => {
        this.paginationCallback(this.state.pageNumber);
    }

    onSearch = (event) => {
        let search = event.target.value;
        let pageNumber = 1

        if(search === '') {
            this.props.fetchCustomers(this.props.session, pageNumber, (response) => {
                
            });
        }
        else {
            this.props.searchCustomers(this.props.session, search, pageNumber, (response) => {
                
            });
        }
        this.setState({search, pageNumber});    
    }

    paginationCallback = (pageNumber) => {
        let {search} = this.state;

        if(search === '') {
            this.props.fetchCustomers(this.props.session, pageNumber, (response) => {
                
            });
        }
        else {
            this.props.searchCustomers(this.props.session, search, pageNumber, (response) => {
                
            });
        }
        this.setState({...this.state, pageNumber});
    }

    listRender = () => {
        let {customersList} = this.props;
        let {pageNumber} = this.state;

        return _.map(customersList.data, (item, index) => {
            return <RenderList key={`key_${index}`} history={this.props.history} printList={item} pagination={this.paginationCallback} currentPage={pageNumber} callfrom="customer"/>;
        });
    }
    
    render() {
        let {customersList,modalStatus,customerPaymentModalStatus,customerApproveModal} = this.props;
        let {search} = this.state;
        
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">

                            <Row>
                                <Col lg="7" md="5" sm="6"></Col>
                                <Col lg="5" md="7" sm="6" className="text-right">
                                    <div style={{display:'flex'}}>
                                        <input className="form-control inputsearch" placeholder={LocaleStrings.search} type="search" value={search} onChange={this.onSearch}/>
                                        &nbsp;
                                        <Button color="primary" type="button" onClick={this.openModal}>{LocaleStrings.button_add_new}</Button>
                                        
                                        {modalStatus && modalStatus.showModal ? <CreateNew finishOperationsCallback={this.additionalCallback} callfrom="customer"/> : '' }
                                    </div>
                                </Col>
                            </Row>

                        </CardHeader>

                        <CardBody>
                            
                            {customersList && customersList.data ?
                                <div style={{marginTop:15}}>
                                    {customersList.data && customersList.data.length > 0 ?
                                        <Table className="align-items-center table-flush min-height-135 tablelist" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">{LocaleStrings.customers_table_th_name}</th>
                                                    <th scope="col">{LocaleStrings.customers_table_th_agentname}</th>
                                                    <th scope="col">{LocaleStrings.agents_detail_table_th_email}</th>
                                                    <th scope="col">{LocaleStrings.agents_detail_table_th_mobile}</th>
                                                    <th scope="col">{LocaleStrings.agents_detail_table_th_paymentmode}</th>
                                                    <th scope="col">{LocaleStrings.agents_detail_table_th_paidtilldate}</th>
                                                    <th scope="col">{LocaleStrings.agents_detail_table_th_dueamount}</th>
                                                    <th scope="col">{LocaleStrings.agents_detail_table_th_planamount}</th>
                                                    <th scope="col"/>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.listRender()}

                                            </tbody>
                                        </Table>
                                    : 
                                        <div className="no-content-message">{LocaleStrings.no_record}</div>
                                    }

                                    {customersList.count > itemCount ?
                                        <CardFooter className="py-4">
                                            <Pagination
                                                activePage={this.state.pageNumber}
                                                itemsCountPerPage={itemCount}
                                                totalItemsCount={customersList.count}
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
                        </CardBody>
                    </Card>
                </Container>

                {customerPaymentModalStatus && customerPaymentModalStatus.showModal ? <CustomerPayment finishOperationsCallback={this.additionalCallback}/> : '' }
                {customerApproveModal && customerApproveModal.showModal ? <ApproveCustomer finishOperationsCallback={this.additionalCallback}/> : '' }
            </>
        );
    }
}

function mapStateToProps(state) {
    // console.log('state.customerPaymentReceiveModal : - ', state.customerPaymentReceiveModal)
    
    return {
        session : state.session,
        customersList: state.customersList,
        modalStatus: state.customerCreateModal,
        customerPaymentModalStatus: state.customerPaymentReceiveModal,
        customerApproveModal: state.customerApproveModal
    }
}
export default connect(mapStateToProps, {fetchCustomers, searchCustomers, openCustomerCreateModal, customerKycFiles, fetchAllAgents, fetchAllPlans})(Customers);