import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Table } from "reactstrap";
import LocaleStrings from "../../../../languages";

class CustomerBasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    let { selectedCustomer } = this.props;
    // console.log('selectedCustomer: -', selectedCustomer)

    return (
      <Row className="m-2">
        <div className="col-md-3 p-2">
          <Card className="shadow text-center pb-3">
            <h4 className="p-2 mb-2">
              {selectedCustomer.details
                ? selectedCustomer.details.fullname
                : ""}
            </h4>
            <div className="text-xs mb-2">
              {LocaleStrings.customer_detail_text_ongoing_plans}:{" "}
              <span className="fa-lg">
                {selectedCustomer.details
                  ? selectedCustomer.details.ongoing_plans.length
                  : 0}
              </span>
            </div>
            <div className="text-xs mb-2">
              {LocaleStrings.customer_detail_text_reward_plans}:{" "}
              <span className="fa-lg">
                {selectedCustomer.details
                  ? selectedCustomer.details.cashback_plans.length
                  : 0}
              </span>
            </div>
            <div className="text-xs mb-2">
              {LocaleStrings.customer_detail_text_completed_plans}:{" "}
              <span className="fa-lg">
                {selectedCustomer.details
                  ? selectedCustomer.details.completed_plans.length
                  : 0}
              </span>
            </div>
          </Card>
        </div>
        <div className="col-md-9 p-2">
          <Card className="shadow">
            <h4 className="p-2 text-center">{LocaleStrings.customerDetails}</h4>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    {LocaleStrings.customers_table_th_customercode}
                  </th>
                  <th scope="col">
                    {LocaleStrings.customers_table_th_agentname}
                  </th>
                  <th scope="col">{LocaleStrings.customers_table_th_email}</th>
                  <th scope="col">{LocaleStrings.customers_table_th_mobile}</th>
                  <th scope="col">
                    {LocaleStrings.customers_table_th_approvalstatus}
                  </th>
                  <th scope="col">{LocaleStrings.customers_table_th_status}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      {selectedCustomer.details
                        ? selectedCustomer.details.customercode
                        : ""}
                    </div>
                  </td>
                  <td>
                    <div>
                      {selectedCustomer.details
                        ? selectedCustomer.details.agentname
                        : ""}
                    </div>
                  </td>
                  <td>
                    <div>
                      {selectedCustomer.details
                        ? selectedCustomer.details.email
                        : ""}
                    </div>
                  </td>
                  <td>
                    <div>
                      {selectedCustomer.details
                        ? selectedCustomer.details.mobile
                        : ""}
                    </div>
                  </td>
                  <td>
                    <div className="text-capitalize">
                      {selectedCustomer.details
                        ? selectedCustomer.details.approvalstatus
                        : ""}
                    </div>
                  </td>
                  <td>
                    <div className="text-capitalize">
                      {selectedCustomer.details
                        ? selectedCustomer.details.status
                        : ""}
                    </div>
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
  };
};

export default connect(mapStateToProps)(CustomerBasicDetails);
