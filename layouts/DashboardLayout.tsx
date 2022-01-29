import Head from "next/head";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import Sidebar from "../components/Sidebar";
import { titleNavState } from "../utils/atoms";

type Props = {
	children: ReactNode,
	titlePage: string
};

export default function DashboardLayout({ children, titlePage }: Props) {
	const titleNav = useRecoilValue(titleNavState)
	return (
		<>
			<Head>
				<title>{titlePage || 'Dashboard'}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col md:flex-row min-h-screen overflow-hidden font-roboto">
				<Sidebar />
				<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden" style={{ backgroundColor: '#eeeeee' }}>

					{/* Header */}
					<nav className="hidden md:block sticky top-0 py-5 px-4 sm:px-6 lg:px-8">
						<div className='flex justify-between items-center z-40'>
							<h1>{titleNav}</h1>
							<div className='flex items-center'>
								<p>Profile Setting</p>
							</div>
						</div>
					</nav>
					{/* End Header */}

					<main>
						{children}
					</main>

					<footer className="flex justify-between items-center mt-auto">
						<p>Design & Develop By Ories</p>
						<p>© {new Date().getFullYear()} CompanyName</p>
					</footer>
				</div>
			</div>
		</>
	)
}
