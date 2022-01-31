import { Transition } from '@tailwindui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import  { useState, useRef, useEffect } from 'react';

const BG_AVATAR = ['152e4d', '0891b2', '2E8B57', '8B4513', '4B0082', '999', '000']

function ProfileMenu() {
    const [modalOut, showModalOut] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [bgAvatar, setBgAvatar] = useState(BG_AVATAR[0])

    const router = useRouter()
    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: any) => {
        if (!dropdownOpen || dropdown.current?.contains(target) || trigger.current?.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: any) => {
        if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        setBgAvatar(BG_AVATAR[Math.floor(Math.random() * BG_AVATAR.length)])
    }, [])

    
    const handleLogout = async () => {
        localStorage.clear()
        router.replace('/auth')
    }

    return (
        <div className="relative inline-flex">
            <button
                ref={trigger} className="inline-flex justify-center items-center group" aria-haspopup="true" aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)} 
            >
                <div className="w-8 h-8 rounded-full bg-gray-400">
                    <img src={`https://ui-avatars.com/api/?name=${'User'}&background=${bgAvatar}&color=fff`} className='rounded-full' />
                </div>
                <div className="flex items-center truncate">
                    <span className="truncate ml-2 mr-1 font-medium group-hover:text-red-600">{'Username'}</span>
                    <svg className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                </div>
            </button>

            {/* {dropdownOpen && */}
            <Transition show={dropdownOpen}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className="origin-top-right z-10 absolute top-full right-0 w-max bg-white border border-gray-200 py-1.5 px-1 rounded shadow-lg overflow-hidden mt-1"
            >
                <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)} >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
                        <div className="font-medium text-gray-800">{'Username'}</div>
                        <div className="text-xs text-gray-500 italic">{'Administrator'}</div>
                    </div>
                    <ul>
                        <li>
                            <Link href='/dashboard/profile'>
                                <a className="font-medium hover:bg-gray-800 hover:text-white rounded flex items-center py-1 px-3" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <i className="ri-user-3-fill mr-2"></i>My Profile
                                </a>
                            </Link>
                        </li>
                        <li>
                            <button className="font-medium text-red-400 hover:bg-gray-800 hover:text-white rounded flex items-center py-1 px-3 w-full"
                                onClick={() => showModalOut(true)}
                            >
                                <i className="ri-logout-circle-fill mr-2"></i>Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </Transition>
            {/* } */}
            
            {/* {modalOut && <ModalConfirm message='Are you sure to logout?' onCancel={()=>showModalOut(false)} onOK={handleLogout} />} */}
        </div>
    )
}

export default ProfileMenu