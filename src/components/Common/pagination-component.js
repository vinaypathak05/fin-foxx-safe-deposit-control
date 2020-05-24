import React, {Component} from 'react';
import {
    PaginationItem,
    PaginationLink
} from "reactstrap";

export default class PaginationComponent extends Component {
    constructor(props){
        super(props);
        // this.onPageSelected = this.onPageSelected.bind(this);
    }

    onPageSelected = () => {
        this.props.callback(this.props.pageNumber);
    }

    render() {
        return (
            <PaginationItem className={this.props.active ? 'active' : ''}>
                <PaginationLink
                    // href="#pablo"
                    onClick={this.onPageSelected}
                >
                    {this.props.pageNumber}
                </PaginationLink>
            </PaginationItem>
        );
    }

}
