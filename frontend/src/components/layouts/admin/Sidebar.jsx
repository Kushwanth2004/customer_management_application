import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiMenuUnfold3Fill } from 'react-icons/ri';
import { IoCaretBackSharp } from 'react-icons/io5';
import useAuth from '../../../hooks/useAuth';
import { MdSpaceDashboard } from 'react-icons/md'; // Added MdShoppingCart
import { RiLogoutBoxFill } from 'react-icons/ri';
import { PiStudentFill } from "react-icons/pi";
import { PiCertificate } from "react-icons/pi";

const settings = [
    { title: "Dashboard", url: "/admin", icon: <MdSpaceDashboard /> },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const savedState = localStorage.getItem('sidebarOpenAdmin');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const { logout } = useAuth();
    const location = useLocation();
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prevState) => {
            localStorage.setItem('sidebarOpenAdmin', JSON.stringify(!prevState));
            return !prevState;
        });
    };

    return (
        <div className={`flex flex-col h-screen p-3 bg-gray-900 ${isOpen ? 'w-64' : 'w-20'} duration-300 overflow-y-auto no-scrollbar`}>
            <nav className="flex flex-col space-y-2 mt-10">
                <button onClick={toggleSidebar} className="text-white text-3xl">
                    {isOpen ? <IoCaretBackSharp /> : <RiMenuUnfold3Fill />}
                </button>
                {settings.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.title === 'Product' ? (
                            <>
                                <Link
                                    to={item.url}
                                    className={`flex items-center space-x-2 p-3 rounded text-gray-100 hover:bg-gray-700 
                    ${location.pathname === item.url ? 'bg-gray-700' : ''}`}
                                    onClick={() => setProductDropdownOpen((prev) => !prev)}>
                                    {item.icon}
                                    {isOpen && <span>{item.title}</span>}
                                </Link>
                            </>
                        ) : (
                            <Link
                                to={item.url}
                                className={`flex items-center space-x-2 p-3 rounded text-gray-100 hover:bg-gray-700 
                  ${location.pathname === item.url ? 'bg-gray-700' : ''}`}>
                                {item.icon}
                                {isOpen && <span>{item.title}</span>}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
                <div className="mt-auto flex flex-col space-y-2">
                    <button
                        className="flex items-center space-x-2 p-3 text-gray-100 hover:bg-gray-700 rounded"
                        onClick={logout}>
                        <RiLogoutBoxFill />
                        {isOpen && <span className="text-white">Logout</span>}
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
