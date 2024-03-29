import React from 'react';
import styles from './style.js';
import { Routes, Route } from 'react-router-dom'

import {  Footer, Navbar, Hero } from "./components";
import {red_wave_navbar, logo1, cat1, cat5} from "./assets/index.js";
import {  Book, CartPage, CatPage, Donate, Home, Menu, OrderPage, OurCats, ProductPage, Shop} from "./pages";

const Appp = () => {
    return (
        <body className="">

        <section className="banner">
            <div className="banner__container popup-modal">
                <a herf="#booking" className="banner_text ">BOOK NOW! For ypur purrfecttt
                    kitty experience!</a>
            </div>
        </section>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cats" element={<OurCats/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/donate" element={<Donate/>}/>
            <Route path="/book" element={<Book/>}/>

            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="/cat/:id" element={<CatPage/>}/>
            <Route path="/product/:id" element={<ProductPage/>}/>
        </Routes>
        </body>
    );
};

export default Appp;


