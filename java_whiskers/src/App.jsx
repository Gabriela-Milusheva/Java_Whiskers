import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Menu, Shop, Donate, Book, CartPage, OrderPage, CatPage, ProductPage, OurCats } from './pages';

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/our_cats" element={<OurCats/>}/>
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