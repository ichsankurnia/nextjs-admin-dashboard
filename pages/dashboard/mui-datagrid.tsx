import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    DataGrid, GridColDef, GridColumnHeaderParams, GridCsvExportMenuItem, GridCsvExportOptions, GridExportMenuItemProps,
    gridFilteredSortedRowIdsSelector, GridPrintExportMenuItem, GridRenderCellParams, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer,
    GridToolbarContainerProps, GridToolbarDensitySelector, GridToolbarExport, GridToolbarExportContainer, GridToolbarExportProps, GridToolbarFilterButton, gridVisibleColumnFieldsSelector,
    useGridApiContext,
    gridPageCountSelector,
    gridPageSelector,
    useGridSelector,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GetServerSideProps } from 'next';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { LicenseInfo } from '@mui/x-data-grid-pro';
import { LinearProgress, MenuItem } from '@material-ui/core';
import { Pagination } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import SearchField from '../../components/SearchField';


LicenseInfo.setLicenseKey(
    'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
);


type tplotOptions = {
    [key: string]: any
}

const getJson = (apiRef: any) => {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
        const row: tplotOptions = {};
        visibleColumnsField.forEach((field: any) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
        });
        return row;
    });

    // Stringify with some indentation
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
    return JSON.stringify(data, null, 2);
};

const exportBlob = (blob: any, filename: string) => {
    // Save the blob in a json file
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    });
};

const JsonExportMenuItem = (props: GridExportMenuItemProps<{}>) => {
    const apiRef = useGridApiContext();

    const { hideMenu } = props;

    return (
        <MenuItem
            onClick={() => {
                const jsonString = getJson(apiRef);
                const blob = new Blob([jsonString], {
                    type: 'text/json',
                });
                exportBlob(blob, 'posts.json');

                // Hide the export menu after the export
                hideMenu?.();
            }}
        >
            Export JSON
        </MenuItem>
    );
};

const csvOptions: GridCsvExportOptions = {
    fileName: 'posts',
    delimiter: ';',
    utf8WithBom: true,
};

const CustomExportButton = (props: GridToolbarExportProps) => (
    <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
        <JsonExportMenuItem />
        <GridPrintExportMenuItem />
    </GridToolbarExportContainer>
);

const CustomToolbar = (props: GridToolbarContainerProps) => (
    <GridToolbarContainer {...props}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {/* <CustomExportButton /> */}
    </GridToolbarContainer>
);


function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    // return (
    //   <Pagination
    //     color="primary"
    //     variant="outlined"
    //     shape="rounded"
    //     page={page + 1}
    //     count={pageCount}
    //     // @ts-expect-error
    //     renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
    //     onChange={(event: React.ChangeEvent<unknown>, value: number) =>
    //       apiRef.current.setPage(value - 1)
    //     }
    //   />
    // );

    return (
        <Pagination
            sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

interface QuickSearchToolbarProps {
    clearSearch?: () => void;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => any;
    value?: string;
}

const CustomToolbarSearch = ({ onChange, clearSearch, value }: QuickSearchToolbarProps) => {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='hidden md:block'>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </div>
                <button className='btn-primary w-full lg:w-max'>Create New</button>
            </div>
            <div className='my-2 lg:mb-1'>
                <SearchField placeholder='Search data...' value={value} onChange={onChange} clearSearch={clearSearch} />
            </div>
        </div>
    )
}


type Props = {
    posts: any
};

const MUIDataGrid = ({ posts }: Props) => {
    const [pageSize, setPageSize] = React.useState(5);
    const [rows, setRows] = React.useState<any[]>(posts);
    const [searchText, setSearchText] = React.useState('');
    const [loading, setLoading] = useState(true)

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 100,
    });


    const COLUMNS: GridColDef[] = [
        { field: "id", hide: true },
        {
            field: 'title',
            headerName: 'Title',
            headerClassName: 'bg-gray-100',
            description:
                'The identification used by the person with access to the online service.',
            minWidth: 200, editable: true,
        },
        {
            field: 'body', headerName: 'Body',
            headerClassName: 'bg-gray-100',
            flex: 1, minWidth: 250
        },
        {
            field: 'img',
            headerName: 'Image',
            headerClassName: 'bg-gray-100',
            disableReorder: true,
            disableExport: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <span className='font-medium'>
                    {'Image '}
                    <span role="img" aria-label="enjoy">
                        🎂
                    </span>
                </span>
            ),
            renderCell: (params: GridRenderCellParams) => (
                <img src={params.value} alt="" />
            ),
        },
        {
            field: 'actions',
            headerName: 'Action',
            headerClassName: 'bg-gray-100',
            type: 'actions',
            minWidth: 150,
            renderCell: (params: GridRenderCellParams) => (
                <div className='flex items-center space-x-2'>
                    <button className='bg-cyan-500 text-white flex item-center px-2 py-1 space-x-1 rounded-md'>
                        <p>Edit</p>
                        <i className='ri-edit-box-fill'></i>
                    </button>
                    <button className='bg-red-500 text-white flex item-center px-2 py-1 space-x-1 rounded-md'>
                        <p>Delete</p>
                        <i className='ri-delete-bin-4-fill'></i>
                    </button>
                </div>
            ),
        },
    ]

    React.useEffect(() => {
        setRows(posts);
        setLoading(false)
    }, [posts]);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue)

        const newData = [...posts]
        if(searchValue){
            const filtered = newData.filter((item: any) => {
                return (
                    item?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item?.body?.toLowerCase().includes(searchValue.toLowerCase())
                )
            });

            setRows(filtered)
        }else{
            setRows(posts)
        }
    };

    console.log(data)

    return (
        <div className="flex flex-col items-center px-4 md:px-6 py-5 font-poppins">
            <div className='w-full bg-white rounded-lg shadow-xl p-6'>
                <div className='mb-5'>
                    <h1 className='font-bold'>Post Lists</h1>
                </div>
                <div>
                    <div>
                        <DataGrid
                            sx={{
                                fontFamily: 'poppins',
                            }}
                            columns={COLUMNS}
                            rows={rows}
                            // components={{ Toolbar: GridToolbar }}
                            components={{
                                // Toolbar: CustomToolbar,
                                Toolbar: CustomToolbarSearch,
                                LoadingOverlay: LinearProgress,
                                // Pagination: CustomPagination, 
                            }}
                            componentsProps={{
                                toolbar: {
                                    value: searchText,
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value),
                                    clearSearch: () => requestSearch("")
                                }
                            }}
                            // getRowClassName={() => 'font-poppins'}

                            pagination
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            autoHeight
                            loading={loading}
                            disableSelectionOnClick
                        // disableColumnFilter
                        />
                    </div>
                </div>
            </div>
            

            <div className='h-[400px] w-full m-10'>
                <div className='flex h-full'>
                    <DataGridPro
                        components={{ Toolbar: GridToolbar }}
                        {...data}
                    />
                </div>
            </div>
        </div>
    );
}

MUIDataGrid.layout = DashboardLayout



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

export default MUIDataGrid;