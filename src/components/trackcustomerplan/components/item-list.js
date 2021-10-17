import React, { Component } from "react";
import { connect } from "react-redux";
import { converDateIntoLocalDate } from "../../Common/constant";

class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { printList } = this.props;

    return (
      <tr>
        <td>{printList.fullname}</td>
        <td>{printList.planname}</td>
        <td>{printList.planamount}</td>
        <td>{printList.paidtilldate}</td>
        <td>{printList.planleftamount}</td>
        <td>{converDateIntoLocalDate(printList.planactivatedate)}</td>
        <td>{converDateIntoLocalDate(printList.planexpirydate)}</td>
      </tr>
    );
  }
}

export var mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps, {})(ItemList);
