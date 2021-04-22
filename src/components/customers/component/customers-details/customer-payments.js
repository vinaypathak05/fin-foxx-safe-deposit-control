import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, CardHeader, CardFooter, Row, Col, Table } from "reactstrap";
import RenderList from "./customer-payments-items";
import Pagination from "../../../Common/pagination";
import Loader from "../../../Common/loader";
import LocaleStrings from "../../../../languages";

class CustomerPayments extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 1 };
  }

  componentDidMount() {}

  listRender = () => {
    return _.map(this.props.singelCustomerPayments.data, (item, index) => {
      return <RenderList key={index} printList={item} />;
    });
  };

  paginationCallback = (pageNumber) => {
    this.props.pagination(pageNumber);

    this.setState({ ...this.state, pageNumber });
  };

  render() {
    let { singelCustomerPayments } = this.props;
    let itemCount = 10;

    return (
      <Card className="">
        <CardHeader className="border-0">
          <h3>{LocaleStrings.customer_detail_text_transaction_history}</h3>
        </CardHeader>
        {singelCustomerPayments && singelCustomerPayments.data ? (
          <div>
            {singelCustomerPayments.data &&
            singelCustomerPayments.data.length > 0 ? (
              <Table
                className="align-items-center table-flush min-height-135"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col" width="20%">
                      {LocaleStrings.customer_detail_table_th_payment_date}
                    </th>
                    <th scope="col" width="40%">
                      {
                        LocaleStrings.customer_detail_table_th_payment_description
                      }
                    </th>
                    <th scope="col" width="20%">
                      {LocaleStrings.customer_detail_table_th_payment_dr}
                    </th>
                    <th scope="col" width="20%">
                      {LocaleStrings.customer_detail_table_th_payment_cr}
                    </th>
                  </tr>
                </thead>
                <tbody>{this.listRender()}</tbody>
              </Table>
            ) : (
              <div className="no-content-message">
                {LocaleStrings.no_record}
              </div>
            )}

            {singelCustomerPayments.count > itemCount ? (
              <CardFooter className="py-4">
                <Pagination
                  activePage={this.state.pageNumber}
                  itemsCountPerPage={itemCount}
                  totalItemsCount={singelCustomerPayments.count}
                  pageRangeDisplayed={3}
                  onChange={this.paginationCallback}
                />
              </CardFooter>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="loaderstyle">
            <Loader />
          </div>
        )}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state :- ', state);

  return {
    session: state.session,
    // singelCustomerPayments: state.singelCustomerPayments,
    singelCustomerPayments: state.currentPlanTransactions,
  };
}

export default connect(mapStateToProps)(CustomerPayments);
