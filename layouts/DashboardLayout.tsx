import { useRouter } from "next/router";
import { ReactNode } from "react";
import Heading from "../components/Head";
import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/ProfileMenu";
import { RouteAdminRole } from "../routes";
import { getTitleNav } from "../utils/helpers";

type Props = {
	children: ReactNode,
	titlePage: string
};

export default function DashboardLayout({ children, titlePage }: Props) {
	const router = useRouter()
	const titleNav = getTitleNav(RouteAdminRole, router)
	
	return (
		<>
			<Heading titlePage={titlePage || "Dashboard"} />

			<div className="flex flex-col md:flex-row overflow-hidden font-roboto" style={{ backgroundColor: '#eeeeee' }}>
				
				<Sidebar />

				<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden text-gray-700">
					<div className="h-screen md:flex md:flex-col">
						
						{/* Navbar */}
						<nav className="hidden md:block sticky top-0 py-6 px-4 sm:px-6 lg:px-8 z-40" style={{background: '#eee'}}>
							<div className='flex justify-between items-center z-40'>
								<h1>{titleNav}</h1>
								<div className='flex items-center'>
									<ProfileMenu />
								</div>
							</div>
						</nav>
						{/* End Navbar */}

						<main>
							{children}
						</main>
					
						<footer className="block md:hidden h-[9.25rem] mt-3">
							<div className="flex justify-between items-center py-5 px-4 sm:px-6 lg:px-8 text-sm">
								<p>Design & Develop By Ories</p>
								<p>© {new Date().getFullYear()} CompanyName</p>
							</div>
						</footer>

						<footer className="hidden md:block mt-auto">
							<div className="flex justify-between items-center py-5 px-4 sm:px-6 lg:px-8 text-sm mt-10">
								<p>Design & Develop By Ories</p>
								<p>© {new Date().getFullYear()} CompanyName</p>
							</div>
						</footer>

					</div>
				</div>
				
			</div>
		</>
	)
}
