import { GetServerSideProps } from 'next';
import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import SearchField from '../../components/SearchField';
import DashboardLayout from '../../layouts/DashboardLayout';


type Props = {
    columnTable: any[],
    dataTable: any[]
};

const Table = ({ columnTable, dataTable }: Props) => {
    const columns = useMemo(() => columnTable, [columnTable])
    const data = useMemo(() => dataTable, [dataTable])

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canPreviousPage, canNextPage, pageOptions, state, gotoPage, pageCount, setPageSize, prepareRow
    } = useTable(
        {
            columns,
            data,
            //   initialState: { pageIndex: 2 }
        },
        usePagination
    )

    const { pageIndex, pageSize } = state

    return (
        <>
            <div className="overflow-x-auto md:overflow-x-visible">
                <table className="align-middle min-w-175% md:min-w-full" {...getTableProps()}>
                    <thead className='bg-gray-100 text-left'>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className={`${columnTable.length > 6 ? 'py-4' : 'py-4'} text-left`} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr className='border-b-2' {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td className='py-3 px-1' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className='mt-5 mb-2 sm:mb-0 flex justify-between items-center'>
                <div className='hidden sm:flex items-center'>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <span className='mr-5'>
                        {' '}&nbsp;| Go to page :{' '}
                        <input
                            type='number'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                            className='w-20 outline-none border-1 border-gray-400 rounded-2xl px-3 py-1'
                        />
                    </span>{' '}
                </div>

                <div className='flex items-center justify-between md:justify-end w-full md:w-max'>
                    <div className='flex items-center md:mr-5'>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={`${canPreviousPage ? 'text-black hover:text-lightcayn' : 'text-gray-400 cursor-text'} font-bold mr-2`}>
                            {'<<'}
                        </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`${canPreviousPage ? 'text-black hover:text-lightcayn' : 'text-gray-400 cursor-text'} mr-2`}>
                            Previous
                        </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className={`${canNextPage ? 'text-black hover:text-lightcayn' : 'text-gray-400 cursor-text'} mr-2`}>
                            Next
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={`${canNextPage ? 'text-black hover:text-lightcayn' : 'text-gray-400 cursor-text'} font-bold`}>
                            {'>>'}
                        </button>
                    </div>
                    <select className='outline-none px-2 py-1 border-1 border-gray-400 rounded-2xl' value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}>
                        {[10, 20, 50, 100, 200, 500].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

        </>
    )
}


interface ReactTableProps {
    posts: any[]
}

const ReactTable = ({ posts }: ReactTableProps) => {
    const COLUMNS = [
        {
            Header: () => <span className='p-4'>Id</span>,
            accessor: 'id',
            Cell: ({ value }: any) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Body',
            accessor: 'body'
        },
        {
            Header: 'Image',
            accessor: 'img'
        },
        {
            Header: 'UserId',
            accessor: 'userId'
        },
        {
            Header: 'Action',
            Cell: ({row}: any) => {
                const data = row.original
                return (
                    <div className='text-xl scale-110 space-x-1 2xl:space-x-1.5'>
                        <i className="ri-edit-box-line text-primary hover:text-green-400 cursor-pointer"></i>
                        <i className="ri-delete-bin-2-line text-red-500 hover:text-red-400 cursor-pointer"></i>
                    </div>
                )

            }
        }
    ]
    
    return (
        <>
            <div className='flex item-center flex-col p-6 font-poppins'>

                <div className='w-full bg-white rounded-lg shadow-xl p-6'>
                    <div className='mb-5'>
                        <h1 className='font-bold'>User List</h1>
                    </div>

                    {/* TABLE */}
                    <div className='flex justify-between md:items-center flex-col md:flex-row space-y-2 md:space-y-0 mb-3'>
                        <button className='btn-primary'>Create New</button>
                        <SearchField placeholder='Search data...' />
                    </div>
                    <Table dataTable={posts} columnTable={COLUMNS} />

                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3004/posts`)
    const data = await res.json()

    // Pass data to the page via props
    return {
        props: {
            posts: data
        }
    }
}

ReactTable.layout = DashboardLayout

export default ReactTable