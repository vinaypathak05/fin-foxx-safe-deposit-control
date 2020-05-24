import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {    
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
// import {activateDeactivatePost,openPostStatisticsModal} from '../action';
import {showSuccess,showError} from '../../Common/errorbar';
import {COMMON_FAIL_MESSAGE} from '../../Common/constant';
import LocaleStrings from '../../../languages';

class AgentsList extends Component {
    constructor(props) {
        super(props);
    }

    openStatisticsModal = () => {
        // this.props.openPostStatisticsModal({showModal: true, postDetails: this.props.post});
    }

    activateDeactivate = () => {
        // let {session, post, currentPage} = this.props;
        // let values = {active: post.active ? 0 : 1};
        // this.props.activateDeactivatePost(session, post, values, (response)=>{
        //     if(response.success === 0) {
        //         this.props.showError(COMMON_FAIL_MESSAGE);
        //     } else {
        //         this.props.showSuccess(post.active ? LocaleStrings.posts_alert_deactivated : LocaleStrings.posts_alert_activated);
        //         this.props.pagination(currentPage)
        //     }
        // });
    }
    
    render() {
        let {printList} = this.props;
        let style = printList.status != "active" ? {backgroundColor: '#eeefeb'} : {};
        
        return (
            <tr style={style}>
                <td>{printList.firstname +' '+printList.lastname}</td>
                <td>{printList.email}</td>
                <td>{printList.mobile}</td>
                <td>{printList.approvalstatus}</td>
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
                                {printList.active ? LocaleStrings.button_deactivate : LocaleStrings.button_activate}
                            </DropdownItem>
                            {/* <DropdownItem
                                onClick={this.openStatisticsModal}
                            >
                                {LocaleStrings.button_statistics}
                            </DropdownItem> */}
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

export default connect(mapStateToProps, {showSuccess,showError})(AgentsList);
