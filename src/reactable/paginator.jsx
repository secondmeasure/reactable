import React from 'react';

function pageHref(num) {
    return `#page-${num + 1}`
}

export class Paginator extends React.Component {
    handlePrevious(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.currentPage - 1)
    }

    handleNext(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.currentPage + 1);
    }

    handleFirst(e) {
        e.preventDefault();
        this.props.onPageChange(0)
    }

    handleLast(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.numPages - 1);
    }

    handlePageButton(page, e) {
        e.preventDefault();
        this.props.onPageChange(page);
    }

    renderPrevious() {
        const enabled = this.props.currentPage > 0;
        if(this.props.alwaysShowPreviousAndNext || enabled) {
            return <a className='reactable-previous-page'
                      disabled={!enabled}
                      href={pageHref(this.props.currentPage - 1)}
                      onClick={enabled ? this.handlePrevious.bind(this) : undefined}>
                        {this.props.previousPageLabel || 'Previous'}
                   </a>
        }
    }

    renderNext() {
        const enabled = this.props.currentPage < this.props.numPages - 1;
        if(this.props.alwaysShowPreviousAndNext || enabled) {
            return <a className='reactable-next-page'
                      disabled={!enabled}
                      href={pageHref(this.props.currentPage + 1)}
                      onClick={enabled ? this.handleNext.bind(this) : undefined}>
                      {this.props.nextPageLabel || 'Next'}
                   </a>
        }
    }

    renderFirst() {
        const enabled = this.props.numPages !== 0;
        if(this.props.showFirstAndLast) {
            return <a className='reactable-first-page'
                      disabled={!enabled}
                      href={pageHref(0)}
                      onClick={enabled ? this.handleFirst.bind(this) : undefined}>
                        {this.props.firstPageLabel || 'First'}
                   </a>
        }
    }

    renderLast() {
        const enabled = this.props.numPages !== 0;
        if(this.props.showFirstAndLast) {
            return <a className='reactable-last-page'
                      disabled={!enabled}
                      href={pageHref(this.props.numPages - 1)}
                      onClick={enabled ? this.handleLast.bind(this) : undefined}>
                      {this.props.lastPageLabel || 'Last'}
                   </a>
        }
    }

    renderPageButton(className, pageNum) {
        return <a className={className}
                  key={pageNum}
                  href={pageHref(pageNum)}
                  onClick={this.handlePageButton.bind(this, pageNum)}>
                  {pageNum + 1}
               </a>
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Paginator');
        }

        if (typeof this.props.numPages === 'undefined') {
            throw new TypeError('Must pass a non-zero numPages argument to Paginator');
        }

        if (typeof this.props.currentPage === 'undefined') {
            throw new TypeError('Must pass a currentPage argument to Paginator');
        }

        let pageButtons = [];
        let pageButtonLimit = this.props.pageButtonLimit;
        let currentPage = this.props.currentPage;
        let numPages = this.props.numPages;
        let lowerHalf = Math.round( pageButtonLimit / 2 );
        let upperHalf = (pageButtonLimit - lowerHalf);

        for (let i = 0; i < this.props.numPages; i++) {
            let showPageButton = false;
            let pageNum = i;
            let className = "reactable-page-button";
            if (currentPage === i) {
                className += " reactable-current-page";
            }
            pageButtons.push( this.renderPageButton(className, pageNum));
        }

        if(currentPage - pageButtonLimit + lowerHalf > 0) {
            if(currentPage > numPages - lowerHalf) {
                pageButtons.splice(0, numPages - pageButtonLimit)
            } else {
                pageButtons.splice(0, currentPage - pageButtonLimit + lowerHalf);
            }
        }

        if((numPages - currentPage) > upperHalf) {
            pageButtons.splice(pageButtonLimit, pageButtons.length - pageButtonLimit);
        }

        return (
            <tbody className="reactable-pagination">
                <tr>
                    <td colSpan={this.props.colSpan}>
                        {this.renderFirst()}
                        {this.renderPrevious()}
                        {pageButtons}
                        {this.renderNext()}
                        {this.renderLast()}
                    </td>
                </tr>
            </tbody>
        );
    }
};

