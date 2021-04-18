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
  openAgentApproveModal,
  activateDeactivateAgent,
  deleteAgent,
  selectedAgentDetails,
} from "../action";
import { showSuccess, showError } from "../../Common/errorbar";
import { COMMON_FAIL_MESSAGE } from "../../Common/constant";
import LocaleStrings from "../../../languages";

class AgentsList extends Component {
  constructor(props) {
    super(props);
  }

  preventClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  openRowDetails = (e) => {
    this.props.selectedAgentDetails({ agentDetails: this.props.printList });
    this.props.history.push({
      pathname: "/admin/agent/" + this.props.printList.agentid,
      state: { selected: this.props.printList },
    });
  };

  approveAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.openAgentApproveModal({
      showModal: true,
      details: this.props.printList,
    });
  };

  activateDeactivate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let { session, printList, currentPage } = this.props;
    let values = {
      agentid: printList.agentid,
      status: printList.status == "active" ? "deactivated" : "active",
    };
    this.props.activateDeactivateAgent(session, values, (response) => {
      if (response.success === 0) {
        this.props.showError(COMMON_FAIL_MESSAGE);
      } else {
        this.props.showSuccess(
          printList.status == "active"
            ? LocaleStrings.agents_deactivated_success
            : LocaleStrings.agents_activated_success
        );
        this.props.pagination(currentPage);
      }
    });
  };

  delete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let { session, printList, currentPage } = this.props;
    let values = { agentid: printList.agentid, status: "deleted" };
    this.props.deleteAgent(session, values, (response) => {
      if (response.success === 0) {
        this.props.showError(COMMON_FAIL_MESSAGE);
      } else {
        this.props.showSuccess(LocaleStrings.agents_deleted_success);
        this.props.pagination(currentPage);
      }
    });
  };

  render() {
    let { printList } = this.props;
    let classname =
      printList.status == "deactivated"
        ? "deactivated"
        : printList.status == "deleted"
        ? "deleted"
        : "";

    return (
      <tr className={classname} onClick={this.openRowDetails}>
        <td>
          {printList.status != "deleted" ? (
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
                  {printList.status == "active"
                    ? LocaleStrings.button_deactivate
                    : LocaleStrings.button_activate}
                </DropdownItem>

                <DropdownItem onClick={this.delete}>
                  {LocaleStrings.button_delete}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <span className="pl-3"> - </span>
          )}
        </td>
        <td>{printList.agentcode}</td>
        <td>{printList.firstname + " " + printList.lastname}</td>
        <td>{printList.email}</td>
        <td>{printList.mobile}</td>
        <td>{printList.approvalstatus}</td>
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
  openAgentApproveModal,
  activateDeactivateAgent,
  deleteAgent,
  selectedAgentDetails,
  showSuccess,
  showError,
})(AgentsList);
