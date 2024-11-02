import {Button, PageButton} from "./Button";

const TablePagination = ({
    tableCaption,
    totalCount,
    pageCount,
    pageIndex,
    pageSize,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    gotoPage,
    refresh
}) => {

    return (
        <div className="py-1 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
            </div>
            {(tableCaption != null)
                ? <div>
                        <p className="font-normal text-BreadcrumbText">{tableCaption}</p>
                    </div>
                : <div></div>}
            <div className="hidden sm:flex-1 sm:flex gap-x-2  justify-end">
                <div className="flex gap-x-2 py-2">
                   
                    {/* <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label> */}
                </div>


  {/* navigation button */}
                <div className="flex gap-x-2" >
                    <div className="flex justify-center cursor-pointer" onClick={()=>refresh()}>
                    <span className="icon-[ic--sharp-refresh] h-full w-5 font-lg"></span>
                    <span className="text-md text-gray-600 ml-1 mr-2">
                        Refresh</span>
                        </div>
                    <span className="text-md text-gray-600">
                        <span className="font-medium">{(pageIndex * pageSize) + 1}
                            - { totalCount< (pageIndex + 1) * pageSize ? totalCount:(pageIndex + 1) * pageSize }</span>
                        &nbsp; of   &nbsp;
                        <span className="font-medium">{totalCount} </span>
                    </span>
                   
                    <div className="flex justify-center " >
                        <PageButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <span
                                className="icon-[ic--round-keyboard-double-arrow-left] h-full w-5 text-gray-600"></span>
                        </PageButton>
                        <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <span className="icon-[ic--round-keyboard-arrow-left] h-full w-5 text-gray-600"></span>
                        </PageButton>
                        <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                            <span className="icon-[ic--round-keyboard-arrow-right] h-full w-5 text-gray-600"></span>
                        </PageButton>
                        <PageButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <span
                                className="icon-[ic--round-keyboard-double-arrow-right] h-full w-5 text-gray-600"></span>
                        </PageButton>
                        </div>
                </div>
            </div>
        </div>
    );

}

export default TablePagination;