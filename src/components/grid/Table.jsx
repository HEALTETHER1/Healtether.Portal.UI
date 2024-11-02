import React, {useEffect, useState} from 'react'
import regeneratorRuntime from "regenerator-runtime";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination
} from 'react-table'
import {Button, PageButton} from './Button'
import {classNames} from './Utils'
import {SortIcon, SortUpIcon, SortDownIcon} from './Icons'
import {Tooltip} from 'react-tooltip';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import TablePagination from './Pagination';
import ReactTablePagination from 'utils/react-table-pagination';
import Loader from '../Loader/Loader';
import GridFilter from './GridFilter';
import DefaultTextboxClass from "utils/Classes";

// Define a default UI for filtering
function GlobalFilter({preGlobalFilteredRows, globalFilter, setGlobalFilter}) {
    const count = preGlobalFilteredRows.length
    const [value,
        setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">Search:
            </span>
            <input
                type="text"
                className={DefaultTextboxClass}
               // className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value || ""}
                onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
                placeholder={`${count} records...`}/>
        </label>
    )
}

// This is a custom filter UI for selecting a unique option from a list
export function SelectColumnFilter({
    column: {
        filterValue,
        setFilter,
        preFilteredRows,
        id,
        render
    }
}) {
    // Calculate the options for filtering using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">{render("Header")}:
            </span>
            <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                value={filterValue}
                onChange={e => {
                setFilter(e.target.value || undefined)
            }}>
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    )
}

function Table({headerColumn,rowClick, tableCaption, serverCall, showRow,tabButton,showFilter=true,showHeader=true,tableBg="bg-BgDisabled",defaultKeywords,externalCall}) {
    const [loading,
        setLoading] = useState(() => false);
    const [loaded,
        setLoaded] = useState(() => true);
    const initialState = {
        queryPageIndex: 0,
        queryPageSize: showRow,
        totalCount: 0,
        queryPageFilter: "",
        queryPageSortBy: []
    };
    let columns = React.useMemo(() => headerColumn, [])

    const [keyword,
        setKeyword] = useState(defaultKeywords || {text:'',
            option:{}
        });
    const [useFilter,
        setUseFilter] = useState(false);
    useEffect(() => {
        if (externalCall!=null && externalCall.count>0) {
           let resetKeyword=  externalCall.SetKeywordDetails(keyword);
           if(resetKeyword!=null)
           setUseFilter(true)
           setKeyword(resetKeyword);
        }
    }, [externalCall]);
    const onClickFilterCallback = ( filter) => {
          if(filter?.text?.trim() === "" && filter?.option?.status==null) {
              alert('Please enter a keyword to search!')
              return
          }
          if(filter?.text === keyword.text && filter?.option==keyword?.option)   {
              alert('No change in search')
              return
          }
          setUseFilter(true)
          setKeyword({text:filter.text,
            option:filter.option
          })
      }
    const reducer = (state, {type, payload}) => {
        switch (type) {
            case ReactTablePagination.PAGE_CHANGED:
                return {
                    ...state,
                    queryPageIndex: payload
                };
            case ReactTablePagination.PAGE_SIZE_CHANGED:
                return {
                    ...state,
                    queryPageSize: payload
                };
            case ReactTablePagination.PAGE_SORT_CHANGED:
                return {
                    ...state,
                    queryPageSortBy: payload
                };
            case ReactTablePagination.PAGE_FILTER_CHANGED:
                return {
                    ...state,
                    queryPageFilter: payload
                };
            case ReactTablePagination.TOTAL_COUNT_CHANGED:
                return {
                    ...state,
                    totalCount: payload
                };
            default:
                throw new Error(`Unhandled action type: ${type}`);
        }
    };
    const [
        {
            queryPageIndex,
            queryPageSize,
            totalCount,
            queryPageFilter,
            queryPageSortBy
        },
        dispatch] = React.useReducer(reducer, initialState);

    const {isLoading, error, data, isSuccess} = useQuery([
        'users', queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy
    ], () => serverCall(queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy), {
        keepPreviousData: false,
        staleTime: Infinity
    });
    const totalPageCount = Math.ceil(totalCount / queryPageSize);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        pageCount,
        pageOptions,
        gotoPage,
        previousPage,
        canPreviousPage,
        nextPage,
        canNextPage,
        setPageSize,
        state: {
            pageIndex,
            pageSize,
            sortBy
        }
    } = useTable({
        columns,
        data: data
            ?.results || [],
        initialState: {
            pageIndex: queryPageIndex,
            pageSize: queryPageSize,
            sortBy: queryPageSortBy
        },
        manualPagination: true,
        pageCount: data
            ? totalPageCount
            : null,
        autoResetSortBy: false,
        autoResetExpanded: false,
        autoResetPage: false
    }, useSortBy, usePagination,);
    const manualPageSize = []
    useEffect(() => {
        dispatch({type: ReactTablePagination.PAGE_CHANGED, payload: pageIndex});
    }, [pageIndex]);

    useEffect(() => {
        dispatch({type: ReactTablePagination.PAGE_SIZE_CHANGED, payload: pageSize});
        gotoPage(0);
    }, [pageSize, gotoPage]);

    useEffect(() => {
        dispatch({type: ReactTablePagination.PAGE_SORT_CHANGED, payload: sortBy});
        gotoPage(0);
    }, [sortBy, gotoPage]);

    useEffect(() => {
        if (useFilter) {
            dispatch({type: ReactTablePagination.PAGE_FILTER_CHANGED, payload: keyword});
            gotoPage(0);
        }
    }, [keyword, gotoPage, useFilter]);

    useEffect(() => {
        if (data
            ?.count) {
            dispatch({type: ReactTablePagination.TOTAL_COUNT_CHANGED, payload: data.count});
        }
    }, [data
            ?.count]);
    React.useEffect(() => {
        setLoaded(isSuccess);
        setLoading(isLoading);
    }, [isLoading, isSuccess]);

    // Render the UI for your table
    return (
       <>
        {/* <div className="sm:flex sm:gap-x-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div> */}
      <div className='w-full'>
 
<GridFilter onClickFilterCallback={onClickFilterCallback} defaultKeyword={keyword} showFilter={showFilter} tabButton={tabButton} />
</div>
    {/* Pagination */} 
    <TablePagination canNextPage = {
        canNextPage
    }
    canPreviousPage = {
        canPreviousPage
    }
    nextPage = {
        nextPage
    }
    pageCount = {
        pageCount
    }
    pageIndex = {
        pageIndex
    }
    pageSize = {
        pageSize
    }
    previousPage = {
        previousPage
    }
    tableCaption = {
        tableCaption
    }
    totalCount = {
        totalCount
    }
    gotoPage = {
        gotoPage
    }
    refresh = {
        () => {
            dispatch({type: ReactTablePagination.PAGE_SIZE_CHANGED, payload: pageSize});
            gotoPage(0);
        }
    }/> 
    {/* table */} 
    <Tooltip id = "grid-tooltip" /> 
    <div className="mt-1 flex flex-col">
        <div className="align-middle inline-block  overflow-x-auto">

            <table {...getTableProps()} className="min-w-full  text-center font-light font-['Montserrat']">
              {showHeader? <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup
                                .headers
                                .map(column => (
                                // Add the sorting props to control sorting. For this example we can add them
                                // into the header props 
                                <th scope = "col" className = "group px-6 py-2 text-center tracking-wider border-b-4 border-white bg-BgSecondary text-md text-TextPrimary font-medium "
                                {
                                    ...column.getHeaderProps(column.getSortByToggleProps())
                                }>
                                   <div className="flex  justify-center">
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <SortDownIcon className="w-4 h-4 text-gray-400"/>
                                                : <SortUpIcon className="w-4 h-4 text-gray-400"/>
                                            : (<SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100"/>)}
                                    </span>
                                </div>
                                 </th>
                      ))}
                        </tr>
                    ))}
                </thead>:<></>}
                {(loaded)
                    ? <tbody {...getTableBodyProps()} className="overflow-y-scroll">
                            {page.map((row, i) => { // new
                                prepareRow(row)
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className={'border-b border-TableRowBorder capitalize text-TextPrimary font-["poppins"] font-normal '+tableBg} onClick={(e)=>{e.preventDefault(); rowClick(row.original);}}>
                                        {row
                                            .cells
                                            .map(cell => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-4 py-2 whitespace-nowrap"
                                                        role="cell">
                                                        {cell.column.Cell.name === "defaultRenderer"
                                                            ? <div className="text-md">{cell.render('Cell')}</div>
                                                            : cell.render('Cell')
}
                                                    </td>
                                                )
                                            })}
                                    </tr>
                                )
                            })}
                        </tbody>

                    : <tbody></tbody>}
                {(loading)
                    ? <tbody>
                            <tr>
                                <td colSpan={headerColumn.length} className='content-center'>
                                    <div className='flex justify-center mt-6'><Loader/></div>
                                </td>
                            </tr>
                        </tbody>
                    : <tbody></tbody>}
            </table>
        </div>
    </div> </>
  )
}

export default Table;
