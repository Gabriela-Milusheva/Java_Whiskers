// here we are going to create the structure and the layout
//in this App we are going to import all the other components and then we are going them one by one
import React from 'react';
import { Routes, Route } from 'react-router-dom'

import styles from './style.js';
import {  Footer, Navbar, Hero } from "./components";
import {red_wave_navbar, logo1, cat1, cat5} from "./assets/index.js";
import {Book, CartPage, CatPage, Donate, Home, Menu, OrderPage, OurCats, ProductPage, Shop} from "./pages";

const App = () => (
    //to start creating the layout
    //we are creating a div that is going to wrap our intire application
    <div>
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
    </div>
);

export default App;