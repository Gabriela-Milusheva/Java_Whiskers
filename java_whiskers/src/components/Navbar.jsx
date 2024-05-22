import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logo1, menu, red_wave_navbar } from "../assets";
import { navLinks, navButtons } from "../constants";
import styles from "../style.js";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
    const bookTableButton = navButtons.find(button => button.id === 'book_table');

    return (
        <body className="">
        <section>
            <div className="banner-container popup-modal">
                <a href="#booking" className="banner-text">BOOK NOW! For your purrfecttt kitty experience!</a>
            </div>
        </section>

        <div className="navbar-container w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <img src={logo1} alt="java-whiskers" className="site-logo"/>
                <div className={`${styles.boxWidth}`}>
                    <nav className="w-full flex py-6 justify-between items-center bg-red">
                        <ul className="list-none sm:flex hidden justify-end items-center flex-1" style={{flexWrap: 'nowrap'}}>
                            {navLinks.map((nav, index) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] ${
                                        active === nav.title ? "text-white" : "text-dimWhite"
                                    } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                                    onClick={() => setActive(nav.title)}
                                >
                                    <Link to={nav.link} className="menu-titles englebert-regular">{nav.title}</Link>
                                </li>
                            ))}
                            <button
                                className="nav_button popup-modal cursor-pointer rounded-md"
                                style={{marginLeft: '40px'}}
                            >
                                {bookTableButton.title.toUpperCase()}
                            </button>
                        </ul>

                        <div className="sm:hidden flex flex-1 justify-end items-center">
                            <img
                                src={toggle ? close : menu}
                                alt="menu"
                                className="w-[28px] h-[28px] object-contain"
                                onClick={() => setToggle(!toggle)}
                            />
                            <div
                                className={`${
                                    !toggle ? "hidden" : "flex"
                                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                            >
                                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                                    {navLinks.map((nav, index) => (
                                        <li
                                            key={nav.id}
                                            className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                                active === nav.title ? "text-white" : "text-dimWhite"
                                            } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                            onClick={() => setActive(nav.title)}
                                        >
                                            <Link to={nav.link} className="menu-titles baumans-regular">{nav.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <img src={red_wave_navbar} alt="" className="absolute-behind w-full" style={{zIndex: 10}}/>
        </body>
    );
};

export default Navbar;