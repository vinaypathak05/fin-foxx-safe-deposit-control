import React, { Component } from "react";
import { connect } from "react-redux";
import { converDateIntoLocal } from "../../../Common/constant";

class CustomerPaymentItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { printList } = this.props;

    return (
      <tr>
        <td width="20%">{converDateIntoLocal(printList.createdon)}</td>
        <td width="40%">{printList.description}</td>
        <td width="20%">
          {printList.transactiontype === "CRA" ? printList.amountpaid : ""}
        </td>
        <td width="20%">
          {printList.transactiontype === "CASHBACK" ||
          printList.transactiontype === "REWARD"
            ? printList.amountpaid
            : ""}
        </td>
      </tr>
    );
  }
}

export var mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(CustomerPaymentItems);
