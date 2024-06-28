import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import { logo1, red_wave_navbar } from "../assets";
import { navLinks, navButtons } from "../constants";
import styles from "../style.js";
import CartSlideSide from './CartSlideSide';

const Navbar = () => {
    const [active, setActive] = useState("Home"); //-> React hook за управление на състоянието active
    // active="Home" - начално състояние
    // setActive - функция, която се използва за промяна на стойността на състоянието active

    const [cartOpen, setCartOpen] = useState(false); //-> React hook за управление на състоянието cartOpen
    // cartOpen = false - начално състояние (страничния панел за количката е скрит)
    // setCartOpen - функция, която се използва за промяна на стойността на състоянието cartOpen

    // Функция за смяна на активната страница
    const handlePageChange = (page) => {
        setActive(page);
    };

    // Функция за отваряне и затваряне на количката (превключване на състоянието на cartOpen)
    const handleCartClick = () => {
        setCartOpen(!cartOpen);
    };


    useEffect(() => {
        const currentPath = location.pathname; // вземане на текущия път от location
        const foundNav = navLinks.find(nav => nav.link === currentPath); // търсене на навигационен елемент със съответния път

        if (foundNav) {
            setActive(foundNav.title); //актуализиране на активния елемент, ако е намерен
        }
    }, [location.pathname]); // изпълняване на useEffect при промяна в location.pathname


    return (
        <div className="relative">

            <div className="navbar-container">

                <div className={`${styles.paddingX} ${styles.flexCenter}`}>

                    <img src={logo1} alt="java-whiskers" className="site-logo" />

                    <div className={`${styles.boxWidth}`}>

                        <nav className="w-full flex py-6 justify-between items-center bg-red">
                            <ul className="list-none sm:flex hidden justify-end items-center flex-1"
                                style={{flexWrap: 'nowrap'}}>

                                {/* Итерация през навигационните елементи, където nav - текущ елемент, а index - индексът му */}
                                {navLinks.map((nav, index) => (

                                    <li key={nav.id}
                                        className={`font-poppins font-normal cursor-pointer text-[16px] 
                                        ${active === nav.title ? "text-white" : "text-dimWhite"} 
                                        ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}>

                                        {/* Използване на Link от React Router */}
                                        <Link
                                            to={nav.link}
                                            className="menu-titles englebert-regular"
                                            onClick={() => handlePageChange(nav.title)} // промяна на активния елемент
                                        >
                                            {nav.title} {/* Изписва се текстът в nav.title, например "Home" */}
                                        </Link>
                                    </li>
                                ))}

                                {/* Бутон за резервация на маса */}
                                <button className="nav_button popup-modal cursor-pointer rounded-md"
                                        style={{marginLeft: '40px'}}>
                                    {navButtons.find(button => button.id === 'book_table').title.toUpperCase()}
                                </button>

                                {/* Икона за количката */}
                                <FiShoppingCart
                                    className="text-white cursor-pointer"
                                    size={24}
                                    onClick={handleCartClick}
                                    style={{marginLeft: '20px'}}
                                />
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <img src={red_wave_navbar} alt="" className="absolute-behind w-full" style={{zIndex: 10}}/>
            {/* Компонент за показване на количката */}

            <CartSlideSide handleCartClick={handleCartClick} isOpen={cartOpen}/>
        </div>
    );
};

export default Navbar;