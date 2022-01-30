import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { RouteAdminRole } from "../routes";
import { collapseState, titleNavState } from "../utils/atoms";
import { getTitleNav } from "../utils/helpers";
import UserMenu from "./UserMenu";


const SIDEBAR_IMG = [
    '/sidebar-1.jpg',
    '/sidebar-2.jpg',
    '/sidebar-3.jpg',
    '/sidebar-4.jpg'
]

type Props = {};

function Sidebar({ }: Props) {
    const [sidebarImg, setSidebarImg] = useState('/sidebar-1.jpg')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
    const [collapse, setCollapse] = useRecoilState<boolean>(collapseState)
    const [titleNav, setTitleNav] = useRecoilState<string>(titleNavState)

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    const router = useRouter()
    const { pathname } = router
	const titleNavBar = getTitleNav(RouteAdminRole, router)

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: any) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: any) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        setSidebarImg(SIDEBAR_IMG[Math.floor(Math.random() * SIDEBAR_IMG.length)])
    }, [pathname])

    const handleClickRoute = (title: string) => {
        setSidebarOpen(false)
        setTitleNav(title)
    }

    return (
        <>
            <div className={`z-20`}>
                {/* SIDEBAR MOBILE */}
                <div className={`fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden md:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
                <div className='md:hidden sticky top-0 w-full px-4 sm:px-6 lg:px-8 z-30'>
                    <div className="flex items-center justify-between pt-4 pb-2">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)}
                            className='inline-flex items-center justify-center p-1 rounded-md text-gray-700 hover:bg-black hover:text-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                        >
                            {sidebarOpen ?
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                :
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            }
                        </button>

                        {/* Header */}
                        <div className='flex h-full justify-between items-center'>
                            <span />
                            <UserMenu />
                        </div>
                    </div>
                    <h1>{titleNavBar}</h1>
                </div>

                {/* SIDEBAR */}
                <div id="sidebar" ref={sidebar}
                    className={`absolute z-40 left-0 top-0 md:static md:left-auto md:top-auto h-screen bg-black md:translate-x-0 transform transition-all duration-700 ease-in-out
                    ${sidebarOpen? 'translate-x-0' : '-translate-x-64'} ${collapse? 'w-64':'md:w-[4.4rem]'} `}
                >
                    <div className={`overflow-y-auto overflow-x-hidden h-full flex flex-col items-center text-white`}>
                        <div className='cursor-pointer z-10 w-full px-4' onClick={() => window.location.reload()}>
                            {collapse?
                            <div className="flex justify-center items-center border-b border-gray-500 p-5">
                                <img src='/next-logo.png' className="w-8 mr-3.5" />
                                <h1>APPS NAME</h1>
                            </div>
                            :
                            <img src='/next-logo.png' className="w-10 mt-5" />
                            }
                        </div>

                        {collapse?
                        <div className='w-full h-full px-4 mt-5 flex flex-col space-y-3 text-sm z-10'>
                            {RouteAdminRole.map(({url_var, name_var, icon_var}, key) => 
                                <Link href={'/dashboard' + url_var} key={key}>
                                    <a className={`flex item-center px-3 py-2.5 hover:bg-white hover:text-gray-700 rounded ${pathname==='/dashboard'+url_var&&'bg-white text-gray-700'}`}
                                        onClick={() => handleClickRoute(name_var)}
                                    >
                                        <i className={`${icon_var} text-xl mr-4`} />
                                        <p className="flex items-center justify-center">{name_var}</p>
                                    </a>
                                </Link>
                            )}
                        </div>
                        :
                        <div className='w-full h-full mt-4 flex flex-col items-center z-10'>
                            {RouteAdminRole.map(({url_var, name_var, icon_var}, key) => 
                                <Link href={'/dashboard' + url_var} key={key}>
                                    <a className={`w-full flex justify-center item-center text-center my-2.5 border-l-[3px] hover:text-white hover:border-white ${pathname==='/dashboard'+url_var?'border-white text-white':'border-transparent text-gray-400'}`}
                                        onClick={() => handleClickRoute(name_var)}
                                    >
                                        <i className={`${icon_var} text-2xl`} />
                                    </a>
                                </Link>
                            )}
                        </div>
                        }
                        
                        <div className='fixed top-0 left-0 w-full h-full bg-cover bg-center z-0' style={{opacity: 0.215}}>
                            <Image
                                alt="Mountains"
                                src={sidebarImg}
                                layout="fill"
                                objectFit="cover"
                                priority
                                quality={100}
                            />
                        </div>
                        
                        <button onClick={()=>setCollapse(!collapse)}
                            className={`hidden md:flex absolute ${collapse? 'left-[14.6rem]':'left-[3rem]'} bottom-10 justify-center items-center bg-white 
                            text-black rounded-lg shadow-lg w-10 h-10 hover:scale-125 transform transition-all duration-700 ease-in-out z-10`}
                        >
                            {collapse? <i className="ri-arrow-left-s-line text-3xl"></i>: <i className="ri-arrow-right-s-line text-3xl"></i> }
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Sidebar;
