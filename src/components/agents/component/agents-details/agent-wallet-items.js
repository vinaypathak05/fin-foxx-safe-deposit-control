import React, {Component} from 'react';
import {connect} from 'react-redux';
import {converDateIntoLocal} from '../../../Common/constant';

class TokenItems extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {printList} = this.props;
        
        return (
            <tr>                
                <td>{printList.amountpaid}</td>
                <td>{printList.insentive}</td>
                <td>{converDateIntoLocal(printList.createdon)}</td>
                <td className="text-right"></td>
            </tr>
        );
    }
}

export var mapStateToProps = (state) => {

    return {
        session: state.session,
    }
}

export default connect(mapStateToProps)(TokenItems);
