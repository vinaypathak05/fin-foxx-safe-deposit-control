import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Card,CardHeader,Row,Col,Table} from "reactstrap";
import LocaleStrings from '../../../../languages';
import RenderList from './customer-payments-items';
import Loader from '../../../Common/loader';

class CustomerPayments extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    listRender = () => {    
        return _.map(this.props.singelCustomerPayments.data, (item, index) => {
            return <RenderList key={index} printList={item} />;
        });
    }

    render() {
        let {singelCustomerPayments} = this.props;

        return (
            <Row className="m-2">
                <div className="col p-2">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <Row>
                                <Col md={6}>
                                    <h2>{LocaleStrings.payments}</h2>
                                </Col>
                            </Row>
                        </CardHeader>
                        {singelCustomerPayments && singelCustomerPayments.data ?
                            <div>
                                {singelCustomerPayments.data && singelCustomerPayments.data.length > 0 ?
                                    <Table className="align-items-center table-flush min-height-135" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">{LocaleStrings.customer_detail_table_th_payment_amount}</th>
                                                <th scope="col">{LocaleStrings.customer_detail_table_th_payment_date}</th>
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
                            </div>
                        :
                            <div className="loaderstyle">
                                <Loader />
                            </div>
                        }
                    </Card>
                </div>                
            </Row>
        );
    }
}

function mapStateToProps(state) {
    // console.log('state :- ', state);

    return {
        session: state.session,
        singelCustomerPayments: state.singelCustomerPayments,
    };
}

export default connect(mapStateToProps)(CustomerPayments);