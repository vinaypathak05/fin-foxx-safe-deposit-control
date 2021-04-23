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
  // openCustomerPaymentModal,
  openCustomerApproveModal,
  editCustomer,
  openCustomerCreateModal,
  customerKycFiles,
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

  edit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let { printList } = this.props;
    // upload/customers_kyc/102/userpic.png
    var userpic = printList.userpic ? printList.userpic.split("/").pop() : "";
    var aadhaarfrontpic = printList.aadhaarfrontpic
      ? printList.aadhaarfrontpic.split("/").pop()
      : "";
    var aadhaarbackpic = printList.aadhaarbackpic
      ? printList.aadhaarbackpic.split("/").pop()
      : "";
    var bankdetailspic = printList.bankdetailspic
      ? printList.bankdetailspic.split("/").pop()
      : "";

    var files = [
      {
        label: "Profile Photo",
        key: "userpic",
        file: printList.userpic ? printList.userpic : "",
        filename: userpic ? userpic : "",
      },
      {
        label: "Aadhaar Front Photo",
        key: "aadhaarfrontpic",
        file: printList.aadhaarfrontpic ? printList.aadhaarfrontpic : "",
        filename: aadhaarfrontpic ? aadhaarfrontpic : "",
      },
      {
        label: "Aadhar Back Photo",
        key: "aadhaarbackpic",
        file: printList.aadhaarbackpic ? printList.aadhaarbackpic : "",
        filename: aadhaarbackpic ? aadhaarbackpic : "",
      },
      {
        label: "Bank Account Photo",
        key: "bankdetailspic",
        file: printList.bankdetailspic ? printList.bankdetailspic : "",
        filename: bankdetailspic ? bankdetailspic : "",
      },
    ];
    // console.log("files :- ", files);
    this.props.customerKycFiles(files);
    this.props.openCustomerCreateModal({ showModal: true });
    this.props.editCustomer(printList);
  };

  openRowDetails = (e) => {
    this.props.history.push({
      pathname: "/admin/customer/" + this.props.printList.customerid,
      state: { selected: this.props.printList },
    });
  };

  // collectAmount = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   this.props.openCustomerPaymentModal({
  //     showModal: true,
  //     callfrom: this.props.callfrom,
  //     details: this.props.printList,
  //   });
  // };

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
              <DropdownItem onClick={this.edit}>
                {LocaleStrings.button_edit}
              </DropdownItem>
              {/* {printList.status === "active" &&
              printList.approvalstatus == "approved" ? (
                <DropdownItem onClick={this.collectAmount}>
                  {LocaleStrings.button_amount_collect}
                </DropdownItem>
              ) : null} */}
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
        <td className="text-capitalize">{printList.approvalstatus}</td>
        <td className="text-capitalize">{printList.status}</td>
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
  showSuccess,
  showError,
  activateDeactivateCustomer,
  // openCustomerPaymentModal,
  openCustomerApproveModal,
  editCustomer,
  openCustomerCreateModal,
  customerKycFiles,
})(CustomersList);
