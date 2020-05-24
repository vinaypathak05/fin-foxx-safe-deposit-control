import React, {Component} from 'react';
import {itemCount} from './constant';
import PaginationComponent from './pagination-component';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

export default class PaginationList extends Component {
    constructor(props) {
        super(props);
    }

    callPagination = (pageNumber) => {
        if(pageNumber !== this.props.activePage) {
            this.props.onChange(pageNumber);
        }
    }

    callPaginationPrevious = () => {
        var call = this.props.activePage-1;
        this.callPagination(call);
    }

    callPaginationNext = () => {
        var call = this.props.activePage+1;
        this.callPagination(call);
    }

    renderPagination() {
        let {activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed} = this.props;
        
        let totalPageCount = Math.ceil(totalItemsCount / itemsCountPerPage) ;
        var pageCount = Math.ceil(totalItemsCount / itemsCountPerPage) ;
        pageCount = pageCount > pageRangeDisplayed ? pageRangeDisplayed : pageCount // check page number range
        
        var startFrom = 1;
        // startFrom = activePage > pageRangeDisplayed ? (activePage-pageRangeDisplayed)+startFrom : startFrom;
        startFrom = activePage > pageRangeDisplayed ? (activePage-pageRangeDisplayed)+startFrom : startFrom;

        var endTo = pageCount;
        endTo = activePage > pageRangeDisplayed ? activePage : endTo;
        // endTo = activePage > pageRangeDisplayed ? totalPageCount == activePage ? totalPageCount : Math.ceil((endTo+pageRangeDisplayed)-1) : endTo;

        var paginationItems = [];
        paginationItems.push(
            <PaginationItem key="previous" className={activePage == '1' ? "disabled" : ''}>
                <PaginationLink
                    onClick={this.callPaginationPrevious}
                >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                </PaginationLink>
            </PaginationItem>
        );
        for(var pageNumber=startFrom; pageNumber<=endTo; pageNumber++) {
            var isactive = (activePage === pageNumber);
            paginationItems.push(
                <PaginationComponent 
                    key={pageNumber.toString()} 
                    active={isactive} 
                    pageNumber={pageNumber}
                    callback={this.callPagination} 
                />
            );
        }
        paginationItems.push(
            <PaginationItem key="next" className={activePage === totalPageCount ? "disabled" : ''}>
                <PaginationLink
                    onClick={this.callPaginationNext}
                >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                </PaginationLink>
            </PaginationItem>
        )
        return paginationItems;
    }

    render() {
        return (
            <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
            >                
                {this.renderPagination()}
            </Pagination>
        );
    }
}
