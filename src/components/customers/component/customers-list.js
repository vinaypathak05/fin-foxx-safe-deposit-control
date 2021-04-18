import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  activateDeactivateCustomer,
  openCustomerPaymentModal,
  openCustomerApproveModal,
  selectedCustomerDetails,
} from "../action";
import { showSuccess, showError } from "../../Common/errorbar";
import { COMMON_FAIL_MESSAGE } from "../../Common/constant";
import LocaleStrings from "../../../languages";

class CustomersList extends Component {
  constructor(props) {
    super(props);
  }

  preventClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  openRowDetails = (e) => {
    this.props.selectedCustomerDetails({ details: this.props.printList });
    setTimeout(() => {
      this.props.history.push({
        pathname: "/admin/customer/" + this.props.printList.customerid,
        state: { selected: this.props.printList },
      });
    }, 1000);
  };

  collectAmount = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.openCustomerPaymentModal({
      showModal: true,
      callfrom: this.props.callfrom,
      details: this.props.printList,
    });
  };

  approveAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.openCustomerApproveModal({
      showModal: true,
      details: this.props.printList,
    });
  };

  activateDeactivate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let { session, printList, currentPage } = this.props;
    let values = {
      customerid: printList.customerid,
      status: printList.status == "active" ? "deactivated" : "active",
    };
    this.props.activateDeactivateCustomer(session, values, (response) => {
      if (response.success === 0) {
        this.props.showError(COMMON_FAIL_MESSAGE);
      } else {
        this.props.showSuccess(
          printList.status == "active"
            ? LocaleStrings.customers_alert_deactivated
            : LocaleStrings.customers_alert_activated
        );
        this.props.pagination(currentPage);
      }
    });
  };

  render() {
    let { printList, callfrom } = this.props;
    let classname = printList.status == "deactivated" ? "deactivated" : "";

    return (
      <tr className={classname} onClick={this.openRowDetails}>
        <td>
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              onClick={(e) => this.preventClick(e)}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              {printList.status === "active" &&
              printList.approvalstatus == "approved" ? (
                <DropdownItem onClick={this.collectAmount}>
                  {LocaleStrings.button_amount_collect}
                </DropdownItem>
              ) : null}
              {printList.status == "active" &&
              (printList.approvalstatus == "submitted" ||
                printList.approvalstatus == "onhold") ? (
                <DropdownItem onClick={this.approveAction}>
                  {LocaleStrings.button_approve}
                </DropdownItem>
              ) : (
                ""
              )}
              <DropdownItem onClick={this.activateDeactivate}>
                {printList.status === "active"
                  ? LocaleStrings.button_deactivate
                  : LocaleStrings.button_activate}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
        <td>{printList.customercode}</td>
        <td>{printList.fullname}</td>
        {callfrom === "customer" ? <td>{printList.agentname}</td> : null}
        <td>{printList.email}</td>
        <td>{printList.mobile}</td>
        <td className="text-capitalize">{printList.paymentmode}</td>
        <td>{printList.paidtilldate}</td>
        <td>{printList.planleftamount}</td>
        <td>{printList.planamount}</td>
      </tr>
    );
  }
}

export var mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps, {
  activateDeactivateCustomer,
  openCustomerPaymentModal,
  openCustomerApproveModal,
  selectedCustomerDetails,
  showSuccess,
  showError,
})(CustomersList);
