import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import {Container,Card,CardHeader,CardBody,CardFooter,Table,Row,Col,Button} from "reactstrap";
import {fetchPlans, searchPlans, openPlanCreateModal} from '../action';
import RenderList from './plans-list';
import CreateNew from './plan-add';
import Header from "../../Headers/Header.jsx";
import Pagination from '../../Common/pagination';
import {itemCount} from '../../Common/constant';
import Loader from '../../Common/loader'
import LocaleStrings from '../../../languages';

class Plans extends Component {
    constructor(props) {
        super(props);
        this.state={pageNumber:1, search:''}
    }

    componentDidMount() {
        this.props.fetchPlans(this.props.session);
    }

    openModal = () => {
        this.props.openPlanCreateModal({showModal: true});
    }

    additionalCallback = () => {
        this.paginationCallback(this.state.pageNumber);
    }

    onSearch = (event) => {
        let search = event.target.value;
        let pageNumber = 1

        if(search === '') {
            this.props.fetchPlans(this.props.session, pageNumber, (response) => {
                
            });
        }
        else {
            this.props.searchPlans(this.props.session, search, pageNumber, (response) => {
                
            });
        }
        this.setState({search, pageNumber});    
    }

    paginationCallback = (pageNumber) => {
        let {search} = this.state;

        if(search === '') {
            this.props.fetchPlans(this.props.session, pageNumber, (response) => {
                
            });
        }
        else {
            this.props.searchPlans(this.props.session, search, pageNumber, (response) => {
                
            });
        }
        this.setState({...this.state, pageNumber});
    }

    listRender = () => {
        let {plansList} = this.props;
        let {pageNumber} = this.state;

        return _.map(plansList.data, item => {
            return <RenderList key={`key_${item.planid}`} printList={item} pagination={this.paginationCallback} currentPage={pageNumber}/>;
        });
    }
    
    render() {
        let {plansList,modalStatus} = this.props;
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
                                        
                                        {modalStatus && modalStatus.showModal ? <CreateNew finishOperationsCallback={this.additionalCallback}/> : '' }
                                    </div>
                                </Col>
                            </Row>

                        </CardHeader>

                        <CardBody>
                            
                            {plansList && plansList.data ?
                                <div style={{marginTop:15}}>
                                    {plansList.data && plansList.data.length > 0 ?
                                        <Table className="align-items-center table-flush min-height-135" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">{LocaleStrings.plans_table_th_name}</th>
                                                    <th scope="col">{LocaleStrings.plans_table_th_duration} (In days)</th>
                                                    <th scope="col">{LocaleStrings.plane_table_th_price}</th>
                                                    <th scope="col">{LocaleStrings.plans_table_th_status}</th>
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

                                    {plansList.count > itemCount ?
                                        <CardFooter className="py-4">
                                            <Pagination
                                                activePage={this.state.pageNumber}
                                                itemsCountPerPage={itemCount}
                                                totalItemsCount={plansList.count}
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
            </>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        session : state.session,
        plansList: state.plansList,
        modalStatus: state.planCreateModal,
    }
}
export default connect(mapStateToProps, {fetchPlans, searchPlans, openPlanCreateModal})(Plans);