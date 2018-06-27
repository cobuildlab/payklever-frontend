import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink, } from 'reactstrap';

class PaginationComponent extends Component {

  render() {
    let pagesList = [];

    if (this.props.pages > 1) {
      pagesList = [...Array(this.props.pages + 1).keys()].slice(0, -1);
    }

    return (<div>
      {(this.props.pages > 1) ?
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={(this.props.page === 0)}>
              <PaginationLink previous onClick={() => this.props.onPageChange(0)}/>
          </PaginationItem>
          { pagesList.map((page) =>
            <PaginationItem disabled={(page === this.props.page)} key={page} active={(page === this.props.page)}>
              <PaginationLink onClick={() => this.props.onPageChange(page)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>)}
          <PaginationItem disabled={(this.props.page === this.props.pages - 1)}>
            <PaginationLink next onClick={() => this.props.onPageChange(this.props.pages - 1)} />
          </PaginationItem>
        </Pagination>
        : null}
      </div>);
  }
}

PaginationComponent.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
