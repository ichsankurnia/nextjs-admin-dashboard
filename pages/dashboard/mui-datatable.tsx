import { useState } from 'react'
import MUIDataTable, { FilterType, MUIDataTableOptions, Responsive, ToolbarButton } from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import DashboardLayout from "../../layouts/DashboardLayout";

type Props = {};

const MUITable = ({ }: Props) => {
	const [responsive, setResponsive] = useState("standard");
	const [tableBodyHeight, setTableBodyHeight] = useState("");
	const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
	const [filterType, setFilterType] = useState('multiselect');
	const [searchBtn, setSearchBtn] = useState('true');
	const [downloadBtn, setDownloadBtn] = useState('true');
	const [printBtn, setPrintBtn] = useState('true');
	const [viewColumnBtn, setViewColumnBtn] = useState('true');
	const [filterBtn, setFilterBtn] = useState('true');

	const [data, setData] = useState([
		{ Name: "Gabby George", Title: "Business Analyst", Location: "Minneapolis", Age: 30, Salary: "$100,000" },
		{ Name: "Aiden Lloyd", Title: "Business Consultant", Location: "Dallas", Age: 55, Salary: "$200,000" },
		{ Name: "Jaden Collins", Title: "Attorney", Location: "Santa Ana", Age: 27, Salary: "$500,000" },
		{ Name: "Franky Rees", Title: "Business Analyst", Location: "St. Petersburg", Age: 22, Salary: "$50,000" },
		{ Name: "Aaren Rose", Title: "Business Consultant", Location: "Toledo", Age: 28, Salary: "$75,000" },
		{ Name: "Blake Duncan", Title: "Business Management Analyst", Location: "San Diego", Age: 65, Salary: "$94,000" },
		{ Name: "Frankie Parry", Title: "Agency Legal Counsel", Location: "Jacksonville", Age: 71, Salary: "$210,000" },
		{ Name: "Lane Wilson", Title: "Commercial Specialist", Location: "Omaha", Age: 19, Salary: "$65,000" },
		{ Name: "Robin Duncan", Title: "Business Analyst", Location: "Los Angeles", Age: 20, Salary: "$77,000" },
		{ Name: "Mel Brooks", Title: "Business Consultant", Location: "Oklahoma City", Age: 37, Salary: "$135,000" },
		{ Name: "Harper White", Title: "Attorney", Location: "Pittsburgh", Age: 52, Salary: "$420,000" },
		{ Name: "Kris Humphrey", Title: "Agency Legal Counsel", Location: "Laredo", Age: 30, Salary: "$150,000" },
		{ Name: "Frankie Long", Title: "Industrial Analyst", Location: "Austin", Age: 31, Salary: "$170,000" },
		{ Name: "Brynn Robbins", Title: "Business Analyst", Location: "Norfolk", Age: 22, Salary: "$90,000" },
		{ Name: "Justice Mann", Title: "Business Consultant", Location: "Chicago", Age: 24, Salary: "$133,000" },
		{ Name: "Addison Navarro", Title: "Business Management Analyst", Location: "New York", Age: 50, Salary: "$295,000" },
		{ Name: "Jesse Welch", Title: "Agency Legal Counsel", Location: "Seattle", Age: 28, Salary: "$200,000" },
		{ Name: "Eli Mejia", Title: "Commercial Specialist", Location: "Long Beach", Age: 65, Salary: "$400,000" },
		{ Name: "Gene Leblanc", Title: "Industrial Analyst", Location: "Hartford", Age: 34, Salary: "$110,000" },
		{ Name: "Danny Leon", Title: "Computer Scientist", Location: "Newark", Age: 60, Salary: "$220,000" },
		{ Name: "Lane Lee", Title: "Corporate Counselor", Location: "Cincinnati", Age: 52, Salary: "$180,000" },
		{ Name: "Jesse Hall", Title: "Business Analyst", Location: "Baltimore", Age: 44, Salary: "$99,000" },
		{ Name: "Danni Hudson", Title: "Agency Legal Counsel", Location: "Tampa", Age: 37, Salary: "$90,000" },
		{ Name: "Terry Macdonald", Title: "Commercial Specialist", Location: "Miami", Age: 39, Salary: "$140,000" },
		{ Name: "Justice Mccarthy", Title: "Attorney", Location: "Tucson", Age: 26, Salary: "$330,000" },
		{ Name: "Silver Carey", Title: "Computer Scientist", Location: "Memphis", Age: 47, Salary: "$250,000" },
		{ Name: "Franky Miles", Title: "Industrial Analyst", Location: "Buffalo", Age: 49, Salary: "$190,000" },
		{ Name: "Glen Nixon", Title: "Corporate Counselor", Location: "Arlington", Age: 44, Salary: "$80,000" },
		{ Name: "Gabby Strickland", Title: "Business Process Consultant", Location: "Scottsdale", Age: 26, Salary: "$45,000" },
		{ Name: "Mason Ray", Title: "Computer Scientist", Location: "San Francisco", Age: 39, Salary: "$142,000" }
	]);

	const columns = [
		{
			name: "Delete",
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: number) => {
					return (
						<button onClick={() => {
							data.shift();
							setData(data)
						}}>
							Delete
						</button>
					);
				}
			}
		},
		{
			name: "Edit",
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
					return (
						<button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
							Edit
						</button>
					);
				}
			}
		},
		{
			name: "Name",
			options: {
				filter: true,
			}
		},
		{
			label: "Modified Title Label",
			name: "Title",
			options: {
				filter: true,
			}
		},
		{
			name: "Location",
			options: {
				filter: false,
			}
		},
		{
			name: "Age",
			options: {
				filter: true,
			}
		},
		{
			name: "Salary",
			options: {
				filter: true,
				sort: false,
			}
		},
		{
			name: "Add",
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: number) => {
					return (
						<button onClick={() => {
							// data.unshift(["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]);
							setData(data)
						}}>
							Add
						</button>
					);
				}
			}
		},
	];

	const options: MUIDataTableOptions = {
		search: searchBtn as ToolbarButton,
		download: downloadBtn as ToolbarButton,
		print: printBtn as ToolbarButton,
		viewColumns: viewColumnBtn as ToolbarButton,
		filter: filterBtn as ToolbarButton,
		filterType: filterType as FilterType,
		responsive: responsive as Responsive,
		tableBodyHeight,
		tableBodyMaxHeight,
		onTableChange: (action: any, state: any) => {
			console.log(action);
			console.dir(state);
		}
	};

	let theme = createTheme({
		components: {
			// @ts-ignore custom component
			MUIDataTable:{
				styleOverrides: {
					root: { padding: 10},
				},
			},
			MUIDataTableToolbar: {
				styleOverrides: {
					root: {paddingTop: 20, paddingBottom:10},
					filterPaper: { width: "450px"},
				},
			},
			// MUIDataTableViewCol: {
			// 	styleOverrides: {
			// 		formGroup: { paddingLeft: 20, paddingRight:5, paddingBottom: 10 },
			// 		title: { paddingTop: 15, paddingLeft: 15, paddingBottom: 5 },
			// 		label: {paddingLeft:8}
			// 	},
			// },
		},
	})
	
	theme = responsiveFontSizes(theme)

	return (
		<div className="flex flex-col items-center">
			<h1 className='w-full text-left mt-5 ml-10 mb-3 font-medium'>Table Option</h1>
			<div className='flex flex-col md:flex-row flex-wrap justify-center md:items-center px-5 md:space-x-7 space-y-3 mb-5'>
				<div>
					<label>Responsive : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={responsive} onChange={(e)=>setResponsive(e.target.value)}>
						<option value={'vertical'}>vertical</option>
						<option value={'standard'}>standard</option>
						<option value={'simple'}>simple</option>
						<option value={'scroll'}>scroll (deprecated)</option>
						<option value={'scrollMaxHeight'}>scrollMaxHeight (deprecated)</option>
						<option value={'stacked'}>stacked (deprecated)</option>
					</select>
				</div>
				<div>
					<label>Table Body Height : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={tableBodyHeight} onChange={e => setTableBodyHeight(e.target.value)}>
						<option value={''}>[blank]</option>
						<option value={'400px'}>400px</option>
						<option value={'800px'}>800px</option>
						<option value={'100%'}>100%</option>
					</select>
				</div>
				<div>
					<label>Max Table Body Height : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={tableBodyMaxHeight} onChange={e => setTableBodyMaxHeight(e.target.value)}>
						<option value={''}>[blank]</option>
						<option value={'400px'}>400px</option>
						<option value={'800px'}>800px</option>
						<option value={'100%'}>100%</option>
					</select>
				</div>
				<div>
					<label>Search : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={searchBtn} onChange={e => setSearchBtn(e.target.value)}>
						<option value={'true'}>{'true'}</option>
						<option value={'false'}>{'false'}</option>
						<option value={'disabled'}>disabled</option>
					</select>
				</div>
				<div>
					<label>Download : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={downloadBtn} onChange={e => setDownloadBtn(e.target.value)}>
						<option value={'true'}>{'true'}</option>
						<option value={'false'}>{'false'}</option>
						<option value={'disabled'}>disabled</option>
					</select>
				</div>
				<div>
					<label>Print : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={printBtn} onChange={e => setPrintBtn(e.target.value)}>
						<option value={'true'}>{'true'}</option>
						<option value={'false'}>{'false'}</option>
						<option value={'disabled'}>disabled</option>
					</select>
				</div>
				<div>
					<label>View Column : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={viewColumnBtn} onChange={e => setViewColumnBtn(e.target.value)}>
						<option value={'true'}>{'true'}</option>
						<option value={'false'}>{'false'}</option>
						<option value={'disabled'}>disabled</option>
					</select>
				</div>
				<div>
					<label>Filter : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={filterBtn} onChange={e => setFilterBtn(e.target.value)}>
						<option value={'true'}>{'true'}</option>
						<option value={'false'}>{'false'}</option>
						<option value={'disabled'}>disabled</option>
					</select>
				</div>
				<div>
					<label>FilterType : </label>
					<select className='outline-none focus:ring-2 px-2 py-1 rounded border border-gray-700 focus:border-sky-200 cursor-pointer' value={filterType} onChange={e => setFilterType(e.target.value)}>
						<option value={'checkbox'}>{'checkbox'}</option>
						<option value={'dropdown'}>{'dropdown'}</option>
						<option value={'multiselect'}>multiselect</option>
						<option value={'textField'}>textField</option>
					</select>
				</div>
			</div>
			<div className='w-11/12 z-0'>
				<ThemeProvider theme={theme}>
					{typeof window !== 'undefined' &&
						<MUIDataTable title={"ACME Employee list"} data={data} columns={columns} options={options} />
					}
				</ThemeProvider>
			</div>
		</div>
	)
};


MUITable.layout = DashboardLayout

export default MUITable;
