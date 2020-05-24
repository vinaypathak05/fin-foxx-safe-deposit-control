import React, {Component} from 'react';

class LoginErrorBar extends Component {

    render() {
        return(
            <div className="alert alert-danger animated fadeIn text-center" style={this.props.style}>
                {this.props.alertMessage}
            </div>
        );
    }
}

export default LoginErrorBar;
