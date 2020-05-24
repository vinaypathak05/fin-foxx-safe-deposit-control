import React, {Component} from 'react';

class ErrorBar extends Component {

    render() {
        return(
            <div className="alert alert-danger animated fadeIn text-center">
                {this.props.alertMessage}
            </div>
        );
    }
}

export default ErrorBar;
