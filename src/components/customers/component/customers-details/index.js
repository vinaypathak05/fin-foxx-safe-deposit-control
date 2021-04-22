import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row } from "reactstrap";
import Header from "../../../Headers/Header.jsx";
import { fetchSingleCustomer, fetchSingleCustomerPayments } from "../../action";
import { fetchAllPlans } from "../../../plans/action";
import CustomerBasicDetails from "./customer-basic-details";
import CustomerOtherInfo from "./customer-other-info";
import CustomerPlans from "./customer-plans";
import CustomerPay from "./plan-amount-received";
import CustomerRewardPayment from "./customer-plan-reward";
import ApproveCustomer from "../customer-approve";
import CustomerNewPlan from "./new-plan-add";

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var urlpath = this.props.location.pathname;
    let Id = Number(urlpath.split("/")[3]);

    this.props.fetchSingleCustomer(this.props.session, Id);
    this.props.fetchAllPlans(this.props.session);
    setTimeout(() => {
      // console.log('selectedCustomer :- ', this.props.selectedCustomer)
      // this.props.fetchSingleCustomerPayments(
      //   this.props.session,
      //   this.props.selectedCustomer.details.customerplanid
      // );
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {}

  additionalCallback = () => {
    let { session, selectedCustomer } = this.props;

    this.props.fetchSingleCustomer(
      session,
      selectedCustomer.details.customerid
    );
    // this.props.fetchSingleCustomerPayments(
    //   session,
    //   selectedCustomer.details.customerplanid
    // );
  };

  render() {
    let {
      selectedCustomer,
      customerApproveModal,
      customerPaymentModalStatus,
      customerRewardModal,
      customerNewPlanModal,
    } = this.props;
    // console.log("selectedCustomer :- ", selectedCustomer);

    return (
      <>
        <Header />
        <div className="mt--7 mr-5 ml-5">
          <Row>
            <div className="col">
              <Card className="shadow mb-5">
                <CardBody>
                  <CustomerBasicDetails selectedCustomer={selectedCustomer} />
                  <hr />
                  <CustomerOtherInfo />
                  <hr />
                  <CustomerPlans selectedCustomer={selectedCustomer} />
                </CardBody>
              </Card>
            </div>
          </Row>
        </div>
        {customerApproveModal && customerApproveModal.showModal ? (
          <ApproveCustomer finishOperationsCallback={this.additionalCallback} />
        ) : (
          ""
        )}

        {customerPaymentModalStatus && customerPaymentModalStatus.showModal ? (
          <CustomerPay finishOperationsCallback={this.additionalCallback} />
        ) : (
          ""
        )}
        {customerRewardModal && customerRewardModal.showModal ? (
          <CustomerRewardPayment
            finishOperationsCallback={this.additionalCallback}
          />
        ) : (
          ""
        )}
        {customerNewPlanModal && customerNewPlanModal.showModal ? (
          <CustomerNewPlan finishOperationsCallback={this.additionalCallback} />
        ) : (
          ""
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state.selectedCustomer :- ', state.selectedCustomer)

  return {
    session: state.session,
    selectedCustomer: state.selectedCustomer,
    customerPaymentModalStatus: state.customerPaymentReceiveModal,
    customerApproveModal: state.customerApproveModal,
    customerRewardModal: state.customerRewardModal,
    customerNewPlanModal: state.customerNewPlanModal,
  };
}

export default connect(mapStateToProps, {
  fetchSingleCustomer,
  fetchSingleCustomerPayments,
  fetchAllPlans,
})(CustomerDetails);
