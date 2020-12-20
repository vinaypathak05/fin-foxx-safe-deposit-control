import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {    
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import {activateDeactivatePlan} from '../action';
import {showSuccess,showError} from '../../Common/errorbar';
import {COMMON_FAIL_MESSAGE} from '../../Common/constant';
import LocaleStrings from '../../../languages';

class PlansList extends Component {
    constructor(props) {
        super(props);
    }

    activateDeactivate = () => {
        let {session, printList, currentPage} = this.props;
        let values = {planid: printList.planid, status: printList.status == 'active' ? 'deactivated' : 'active'};
        this.props.activateDeactivatePlan(session, values, (response)=>{
            if(response.success === 0) {
                this.props.showError(COMMON_FAIL_MESSAGE);
            } else {
                this.props.showSuccess(printList.status == 'active' ? LocaleStrings.plans_alert_deactivated : LocaleStrings.plans_alert_activated);
                this.props.pagination(currentPage)
            }
        });
    }
    
    render() {
        let {printList} = this.props;
        let classname = printList.status == "deactivated" ? 'deactivated' : '';
        
        return (
            <tr className={classname}>
                <td>{printList.planname}</td>
                <td>{printList.planduration}</td>
                <td>{printList.planamount}</td>
                <td>{printList.status}</td>
                <td>
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                onClick={this.activateDeactivate}
                            >
                                {printList.status === 'active' ? LocaleStrings.button_deactivate : LocaleStrings.button_activate}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
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

export default connect(mapStateToProps, {activateDeactivatePlan,showSuccess,showError})(PlansList);
