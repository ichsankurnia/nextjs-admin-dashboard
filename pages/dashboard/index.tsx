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
