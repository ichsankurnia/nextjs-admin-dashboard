import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import UserMenu from "../components/UserMenu";
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
			<Head>
				<title>{titlePage || 'Dashboard'} | AppName</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col md:flex-row min-h-screen overflow-hidden font-roboto">
				<Sidebar />
				<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden text-gray-700" style={{ backgroundColor: '#eeeeee' }}>

					{/* Header */}
					<nav className="hidden md:block sticky top-0 py-6 px-4 sm:px-6 lg:px-8">
						<div className='flex justify-between items-center z-40'>
							<h1>{titleNav}</h1>
							<div className='flex items-center'>
								<UserMenu />
							</div>
						</div>
					</nav>
					{/* End Header */}

					<main>
						{children}
					</main>

					<footer className="flex justify-between items-center mt-auto py-5 px-4 sm:px-6 lg:px-8 text-sm">
						<p>Design & Develop By Ories</p>
						<p>© {new Date().getFullYear()} CompanyName</p>
					</footer>
				</div>
			</div>
		</>
	)
}
