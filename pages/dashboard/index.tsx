import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

type Props = {};

function index({}: Props) {
  return (
      <div className='text-2xl'>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
          <h1>Home Dashboard</h1>
      </div>
  )
}

// index.getLayout = function getLayout(page: ReactElement){
//     return (
//         <DashboardLayout titlePage='Dashboard'>
//           {/* <Sidebar /> */}
//           {page}
//         </DashboardLayout>
//       )
// }


index.layout = DashboardLayout

export default index;


export const getServerSideProps: GetServerSideProps = async (context) => {
	const { cookies, url } = context.req

	console.log(cookies, url)

	return {
		props: {}, // will be passed to the page component as props
	}
}
