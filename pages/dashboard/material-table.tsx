import MaterialTable, { MTableToolbar } from "material-table";
import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

type Props = {};

interface Person {
	name: string,
	surname: string,
	birthYear: number,
	birthCity: string,
	imageUrl: string,
	videoUrl: string
}

interface PersonAfterRowUpdate extends Person {
	tableData: { id: number };
}


const MaterialTables = ({ }: Props) => {
	const [isBrowser, setIsBrowser] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [data, setData] = useState([
		{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', videoUrl: 'https://youtube.com/embed/CIWMl0C936s' },
		{ name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', videoUrl: 'https://youtube.com/embed/LSYHgrDI0xQ' },
	])

	const tableRef = useRef<any>(null)

	const mobile = typeof window !== 'undefined' && window.screen.width<768

	useEffect(() => {
		setIsBrowser(process.browser);
	}, [])

	return (
		<div className="flex flex-col items-center px-4 md:px-6 py-5">
			{isBrowser &&
			<>

			
			<div className="w-full z-0">
				<MaterialTable
					title="Simple Action Preview"
					columns={[
						{ title: 'Avatar', field: 'imageUrl', editable: 'never', export: false, filtering: false, sorting: false, render: rowData => <img src={rowData.imageUrl} style={{ width: 20, borderRadius: '50%' }} /> },
						{
							title: 'Name', field: 'name', editComponent: props => (
								<input type="text" value={props.value} onChange={e => props.onChange(e.target.value)} className="outline-none rounded border px-2 py-0.50.5 border-gray-700 focus:ring-1 focus:border-sky-200" />)
						},
						{ title: 'Surname', field: 'surname' },
						{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
						{ title: 'Birth Place', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
					]}
					data={data}
					actions={[
						{
							icon: 'save',
							tooltip: 'Save User',
							isFreeAction: false,	// true position right top of corner
							onClick: (event, rowData: any) => alert("You saved " + rowData.name)
						},
						// rowData => ({
						// 	icon: 'delete',
						// 	tooltip: 'Delete User',
						// 	onClick: (event, rowData:any) => confirm("You want to delete " + rowData.name),
						// 	disabled: rowData.birthYear < 2000
						// })
					]}

					// PANEL DETAIL
					detailPanel={rowData => {
						return (
							<iframe
								width="100%"
								height="315"
								src={rowData.videoUrl}
								frameBorder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						)
					}}
					onRowClick={(event, rowData, togglePanel: any) => togglePanel()}
					// END PANEL DETAIL

					// EDITABLE
					editable={{
						isEditable: rowData => rowData.birthYear < 2000 ? false : true,
						isDeletable: rowData => rowData.birthYear < 2000 ? true : false,
						onRowAdd: newData =>
							new Promise((resolve: any, reject) => {
								setTimeout(() => {
									setData([...data, newData]);

									resolve();
								}, 1000)
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve: any, reject) => {
								setTimeout(() => {
									const dataUpdate = [...data];
									const index = (oldData as any).tableData.id;
									dataUpdate[index] = newData;
									setData([...dataUpdate]);

									resolve();
								}, 1000)
							}),
						onRowDelete: oldData =>
							new Promise((resolve: any, reject) => {
								setTimeout(() => {
									const dataDelete = [...data];
									const index = (oldData as any).tableData.id;
									dataDelete.splice(index, 1);
									setData([...dataDelete]);

									resolve();
								}, 1000)
							}),
					}}
					// END EDITABLE


					options={{
						actionsColumnIndex: -1,
						exportButton: { csv: true, pdf: true },
						exportAllData: true,
						exportDelimiter: '||',
						exportFileName: new Date().getTime().toString(),
						filtering: true,
						// fixedColumns: {right: 1},
						sorting: true,
					}}
				/>
			</div>

			<div className="w-full z-0 mt-10 font-poppins text-xs md:text-sm">
				<MaterialTable
					style={{padding:'0px 25px'}}
					// title={<h1 className='font-medium text-lg'>Selection and Validation Example</h1>}
					title={mobile?'Selection and Validation Example':<h1 className='font-medium text-lg'>Selection and Validation Example</h1>}
					columns={[
						{ title: 'Name', field: 'name', validate: rowData => rowData.name === '' ? { isValid: false, helperText: 'Name cannot be empty' } : true,},
						{ title: 'Surname', field: 'surname', validate: rowData => rowData.surname?.length < 3 ? { isValid: false, helperText: 'Surname must be longer than 3 Chars' } : true, },
						{ title: 'Birth Year', field: 'birthYear', type: 'numeric', validate: rowData => rowData.birthYear < 1900 ? { isValid: true, helperText: 'Birthyear should be after 1900' } : true, },
						{ title: 'Birth Place', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
					]}
					data={data}

					// EDITABLE
					editable={{
						isEditable: rowData => rowData.birthYear < 2000 ? false : true,
						isDeletable: rowData => rowData.birthYear < 2000 ? true : false,
						onRowAdd: newData =>
							new Promise((resolve: any, reject) => {
								setTimeout(() => {
									setData([...data, newData]);

									resolve();
								}, 1000)
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve: any, reject) => {
								setTimeout(() => {
									const dataUpdate = [...data];
									const index = (oldData as any).tableData.id;
									dataUpdate[index] = newData;
									setData([...dataUpdate]);

									resolve();
								}, 1000)
							}),
						onRowDelete: oldData =>
							new Promise((resolve: any, reject) => {
								setTimeout(() => {
									const dataDelete = [...data];
									const index = (oldData as any).tableData.id;
									dataDelete.splice(index, 1);
									setData([...dataDelete]);

									resolve();
								}, 1000)
							}),
					}}
					// END EDITABLE

					onRowClick={(evt, selectedRow: any ) =>
						setSelectedRow(selectedRow.tableData.id)
					}

					components={{
						Toolbar: (props) => (
							<div style={{ /* alignItems: "center", justifyContent: "center", display: "flex", */ padding: '15px 0px' }}>
								<MTableToolbar {...props} />
							</div>
						)
					}}

					options={{
						selection: true,
						actionsColumnIndex: -1,
						toolbar: true,
						tableLayout: 'auto',	// auto || fixed
						rowStyle: rowData => ({
							backgroundColor:
								selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
						}),
						headerStyle: {fontFamily: 'inherit', backgroundColor: '#eee', border: 'none'},
						searchFieldStyle: {fontFamily: 'inherit'},
						padding: 'default',		// default || dense
					}}

					actions={[
						{
							tooltip: 'Remove All Selected Data',
							icon: 'delete',
							onClick: (evt, arrData: any) => {
								let i;
								const dataDelete = [...data];
								for (i = arrData.length - 1; i >= 0; i--) {
									let index = arrData[i].tableData.id;
									dataDelete.splice(index, 1);
								}
								setData([...dataDelete])
							}
						}
					]}
				/>
			</div>

			<div className="z-0 w-11/12 mt-10">
				<MaterialTable
					title="Refresh Data Preview"
					tableRef={tableRef}
					columns={[
						{
							title: 'Avatar',
							field: 'avatar',
							render: rowData => (
								<img
									style={{ height: 36, borderRadius: '50%' }}
									src={rowData.avatar}
								/>
							),
						},
						{ title: 'Id', field: 'id' },
						{ title: 'First Name', field: 'first_name' },
						{ title: 'Last Name', field: 'last_name' },
					]}
					data={query =>
						new Promise((resolve, reject) => {
							let url = 'https://reqres.in/api/users?'
							url += 'per_page=' + query.pageSize
							url += '&page=' + (query.page + 1)
							fetch(url)
								.then(response => response.json())
								.then(result => {
									resolve({
										data: result.data,
										page: result.page - 1,
										totalCount: result.total,
									})
								})
						})
					}
					actions={[
						{
							icon: 'refresh',
							tooltip: 'Refresh Data',
							isFreeAction: true,
							onClick: () => tableRef.current && tableRef.current.onQueryChange(),
						}
					]}
				/>
			</div>

			</>
			}
		</div>
	);
};

MaterialTables.layout = DashboardLayout

export default MaterialTables;
