import React from 'react';
import { useState } from "react";

import {cat1, cat5, close, logo1, menu, red_wave_navbar} from "../assets";
import { navLinks, navButtons } from "../constants";
import styles from "../style.js";
import {Footer} from "./index.js";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    return (
        <body className="">

        <section className="banner">
            <div className="banner_container popup-modal">
                <a herf="#booking" className="banner_text ">BOOK NOW! For your purrfecttt
                    kitty experience!
                </a>
            </div>
        </section>

        <div className="bg-red w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <img src={logo1} alt="java-whiskers" className="site-logo"/>
                <div className={`${styles.boxWidth}`}>
                    <nav className="w-full flex py-6 justify-between items-center bg-red">
                        <ul className="list-none sm:flex hidden justify-end items-center flex-1"
                            style={{flexWrap: 'nowrap'}}>
                            {navLinks.map((nav, index) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] ${
                                        active === nav.title ? "text-white" : "text-dimWhite"
                                    } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                                    onClick={() => setActive(nav.title)}
                                >
                                    <a href={`#${nav.id}`} className="menu-titles englebert-regular">{nav.title}</a>
                                </li>
                            ))}
                            {navButtons.map(button => (
                                <li key={button.id} className="mr-0" style={{marginLeft: '40px'}}>
                                    <button
                                        className="nav_button popup-modal font-poppins font-normal cursor-pointer px-4 py-2 rounded-md uppercase">
                                        {button.title.toUpperCase()}
                                    </button>
                                </li>
                            ))}
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
                                            <a href={`#${nav.id}`}
                                               className="menu-titles baumans-regular">{nav.title}</a>
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

        <img src={cat1} alt="" className="absolute left-0 h-auto max-h-40 sm:max-h-60"
             style={{zIndex: 10, top: '305px',}}/>
        <img src={cat5} alt="" className="absolute right-0 h-auto max-h-40 sm:max-h-60"
             style={{zIndex: 10, top: '450px'}}/>


        </body>

    );
};

export default Navbar;