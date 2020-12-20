import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from "reactstrap";
import {openCustomerPaymentModal} from '../../../customers/action';
import LocaleStrings from '../../../../languages';

class CustomerItem extends Component {

    constructor(props) {
        super(props);
    }

    preventClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    collectAmount = () => {
        this.props.openCustomerPaymentModal({showModal: true, details: this.props.printList});
    }

    render() {
        let {printList} = this.props;
        
        return (
            <tr>                
                <td>{printList.fullname}</td>
                <td>{printList.email}</td>
                <td>{printList.mobile}</td>
                <td className="text-capitalize">{printList.paymentmode}</td>
                <td>{printList.paidtilldate}</td>
                <td>{printList.planleftamount}</td>
                <td>{printList.planamount}</td>
                <td>
                    {printList.status === 'active' ?
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
                                <DropdownItem
                                    onClick={this.collectAmount}
                                >
                                    {LocaleStrings.button_amount_collect}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    :
                        <span className="pl-3"> - </span>
                    }
                </td>
            </tr>
        );
    }
}

export var mapStateToProps = (state) => {

    return {
        session: state.session,
    }
}

export default connect(mapStateToProps, {openCustomerPaymentModal})(CustomerItem);
