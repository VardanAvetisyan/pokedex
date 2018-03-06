import React, {Component} from 'react'

import {connect} from 'react-redux'

import {changePerPage, fetchPagePokemons, activePageChanged, fetchPageChangedPokemons} from "../actions/pagesActions";


class Pagination extends Component {
    handleChange(event) {
        this.props.dispatch(changePerPage(event.target.value));
        this.props.dispatch(fetchPagePokemons(event.target.value));
    }

    handlePageChange(page, limit) {
        let offset = (page - 1) * limit;
        this.props.dispatch(activePageChanged(page));
        this.props.dispatch(fetchPageChangedPokemons(limit, offset))
    }


    render() {
        if (this.props.pageLimit === 949) {
            return null
        } else {
            let pageLimit = this.props.pageLimit, currentPage = this.props.activePage,
                pagesArray = this.props.pagesArray;

            let mappedPages = [];

            for (let i = 0, len = pagesArray.length; i < len; i++) {
                if (this.props.activePage > 3 && this.props.activePage < len - 3) {
                    if (pagesArray[i] === this.props.activePage) {
                        mappedPages[0] = 1;
                        mappedPages[1] = '...';
                        mappedPages[2] = pagesArray[i - 1];
                        mappedPages[3] = pagesArray[i];
                        mappedPages[4] = pagesArray[i + 1];
                        mappedPages[5] = '...';
                        mappedPages[6] = pagesArray[len - 1];
                    }
                } else if (this.props.activePage <= 3) {
                    if (pagesArray[i] === this.props.activePage) {

                        mappedPages[0] = pagesArray[0];
                        mappedPages[1] = pagesArray[1];
                        mappedPages[2] = pagesArray[2];
                        mappedPages[3] = '...';
                        mappedPages[4] = pagesArray[len - 1];
                    }
                } else if (this.props.activePage > pagesArray[len - 3]) {
                    if (pagesArray[i] === this.props.activePage) {

                        mappedPages[0] = 1;
                        mappedPages[1] = '...';
                        mappedPages[2] = pagesArray[len - 3];
                        mappedPages[3] = pagesArray[len - 2];
                        mappedPages[4] = pagesArray[len - 1];
                    }
                }
            }

            let newMappedPages = mappedPages.map((page, i) => {
                return <li key={i} onClick={page === '...' ? null : this.handlePageChange.bind(this, page, pageLimit)}
                           className={page === currentPage ? "page-item active" : "page-item"}
                ><a className='page-link'>  {page}</a></li>
            });

            return (
                <div className='container'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link"
                                   onClick={this.handlePageChange.bind(this, currentPage - 1, pageLimit)}
                                   aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            {newMappedPages}
                            <li className="page-item">
                                <a className="page-link"
                                   onClick={this.handlePageChange.bind(this, currentPage + 1, pageLimit)}
                                   aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                        <div className="form-group">
                            <label>Pokemon per page</label>
                            <select className="form-control" id="perPage"
                                    defaultValue={this.props.pageLimit}
                                    onChange={this.handleChange.bind(this)}
                            >
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                            </select>
                        </div>
                    </nav>
                    <br/>
                    <br/>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    pageLimit: state.pages.perPage,
    pagesArray: state.pages.pagesArray,
    activePage: state.pages.activePage
})

export default connect(mapStateToProps)(Pagination);