import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { Card, Row, Col, Button } from "reactstrap";
import {
  showCurrentPlan,
  fetchCustomerSinglePlanPayments,
  clearSinglePlanTransaction,
  openCustomerPaymentModal,
  openCustomerRewardModal,
} from "../../action";
import { converDateIntoLocalDate } from "../../../Common/constant";
import CustomerPayments from "./customer-payments";
import LocaleStrings from "../../../../languages";
import Loader from "../../../Common/loader";
import CheckMark from "../../../../assets/img/icons/checkmark-circle-fill.png";

class PlanList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  collectAmount = (e) => {
    this.props.openCustomerPaymentModal({
      showModal: true,
      details: this.props.printList,
      customerdetails: this.props.selectedCustomer.details,
    });
  };

  rewardAmount = (e) => {
    this.props.openCustomerRewardModal({
      showModal: true,
      details: this.props.printList,
    });
  };

  handleToggle = () => {
    let { session, printList, openCurrentPlan } = this.props;

    if (
      openCurrentPlan &&
      openCurrentPlan.showPlan &&
      openCurrentPlan.showPlan == printList.customerplanid
    ) {
      this.props.showCurrentPlan({});
      this.props.clearSinglePlanTransaction();
    } else {
      this.props.clearSinglePlanTransaction();
      this.props.showCurrentPlan({ showPlan: printList.customerplanid });
      this.props.fetchCustomerSinglePlanPayments(session, {
        customerid: printList.customeridfk,
        customerplanid: printList.customerplanid,
      });
    }
  };

  paginationCallback = (pageNumber) => {
    let { session, printList } = this.props;

    this.props.fetchCustomerSinglePlanPayments(
      session,
      {
        customerid: printList.customeridfk,
        customerplanid: printList.customerplanid,
      },
      pageNumber
    );
  };

  render() {
    let { printList, openCurrentPlan, plantype } = this.props;
    let catNameStyle = {
      position: "relative",
      right: 91,
      bottom: -2,
      // color: "white",
    };

    return (
      <Card className="shadow p-3 mb-2">
        <Row>
          <Col md={12}>
            <div className="d-flex">
              <h2 className="mr-3">{printList.planname}</h2>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="29">
                <path
                  fill="#f8e71c"
                  fillRule="evenodd"
                  d="M88.362 12.578c-1.049 1.061-1.049 2.783 0 3.845l7.845 7.936c1.693 1.713.494 4.641-1.9 4.641H5c-2.761 0-5-2.239-5-5V5c0-2.761 2.239-5 5-5h89.307c2.394 0 3.593 2.928 1.9 4.641l-7.845 7.937z"
                />
              </svg> */}
              {/* <span style={catNameStyle}>{printList.customerplancode}</span> */}
              <div className="tag">
                <span>{printList.customerplancode}</span>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <span className="text-xs">
                <img className="mr-1" alt="" src={CheckMark} />
                {LocaleStrings.customer_detail_text_plan_amount + ": "}
              </span>
              <span className="fa-md">{printList.planamount}</span>
            </div>
            <div>
              <span className="text-xs">
                <img className="mr-1" alt="" src={CheckMark} />
                {LocaleStrings.customer_detail_text_plan_mode + ": "}
              </span>
              <span className="text-capitalize fa-md">
                {printList.paymentmode}
              </span>
            </div>
            <div>
              <span className="text-xs">
                <img className="mr-1" alt="" src={CheckMark} />
                {LocaleStrings.customer_detail_text_paid_till_date + ": "}
              </span>
              <span className="fa-md">{printList.paidtilldate}</span>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <span className="text-xs">
                <img className="mr-1" alt="" src={CheckMark} />
                {LocaleStrings.customer_detail_text_plan_valid_from + ": "}
              </span>
              <span className="fa-md">
                {moment(printList.planactivatedate).format("DD-MM-YYYY")}
              </span>
            </div>
            <div>
              <span className="text-xs">
                <img className="mr-1" alt="" src={CheckMark} />
                {LocaleStrings.customer_detail_text_plan_valid_to + ": "}
              </span>
              <span className="fa-md">
                {moment(printList.planexpirydate).format("DD-MM-YYYY")}
              </span>
            </div>
            <div>
              <span className="text-xs">
                <img className="mr-1" alt="" src={CheckMark} />
                {LocaleStrings.customer_detail_text_payment_left + ": "}
              </span>
              <span className="fa-md">{printList.planleftamount}</span>
            </div>
          </Col>
          <Col md={4} className="text-right plan-action-section">
            {moment().isSameOrAfter(moment(printList.planactivatedate)) &&
            (plantype === "ongoing" || plantype === "cashback") ? (
              <Button
                color="primary"
                size="sm"
                type="button"
                className=""
                onClick={
                  plantype === "ongoing"
                    ? this.collectAmount
                    : this.rewardAmount
                }
              >
                {plantype === "ongoing"
                  ? LocaleStrings.button_amount_collect
                  : LocaleStrings.button_reward_amount}
              </Button>
            ) : (
              ""
            )}

            <div className="steps-icon-arrow">
              <i
                className={`fas ${
                  openCurrentPlan &&
                  openCurrentPlan.showPlan &&
                  openCurrentPlan.showPlan == printList.customerplanid
                    ? "fa-chevron-circle-up circle-up"
                    : "fa-chevron-circle-down circle-down"
                } updown-icon cursor-pointer mr-1`}
                aria-hidden="false"
                onClick={this.handleToggle}
              ></i>
            </div>
          </Col>
        </Row>

        {openCurrentPlan &&
        openCurrentPlan.showPlan &&
        openCurrentPlan.showPlan == printList.customerplanid ? (
          <Row className="pb-3">
            <Col md={12}>
              <hr className="mt-3 mb-3" />
              <CustomerPayments pagination={this.paginationCallback} />
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  // console.log("state.openCurrentPlan:- ", state.openCurrentPlan);
  // console.log(
  //   "state.currentPlanTransactions:- ",
  //   state.currentPlanTransactions
  // );
  return {
    session: state.session,
    openCurrentPlan: state.openCurrentPlan,
    currentPlanTransactions: state.currentPlanTransactions,
  };
}

export default connect(mapStateToProps, {
  showCurrentPlan,
  fetchCustomerSinglePlanPayments,
  clearSinglePlanTransaction,
  openCustomerPaymentModal,
  openCustomerRewardModal,
})(PlanList);
