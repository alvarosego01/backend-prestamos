


export interface _argsPagination {
    findObject: any;
    options: _dataPaginator
}


export interface _dataPaginator {


    page: number;
    limit: number;
    customLabels: any;
    // sort: { '_id': -1 }, <- example
    sort?: any;
    // select: "-pass" <- example
    select?: any;

}

export const _configPaginator = {
  page: 1,
  limit: 12,
  customLabels: {
    totalDocs: "itemCount",
    docs: "itemsList",
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    pagingCounter: "pageCounter",
    meta: "paginator",
  },
};

