import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, CafeMenu, Donate, Book, CartPage, OrderPage, CatPage, Shop, OurCats } from './pages';
import {ShopProductDetails} from './components';

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our_cats" element={<OurCats />} />
            <Route path="/cafe_menu" element={<CafeMenu />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/book" element={<Book />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/cat/:id" element={<CatPage />} />
            <Route path="/product/:id" element={<ShopProductDetails />} />
        </Routes>
    </div>
);

export default App;