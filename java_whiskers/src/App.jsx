import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, CafeMenu, BookNowDialog,  Shop, OurCats, KidsZone } from './pages';
import { ShopProductDetails } from './components';


function App() {

return (
    <div>

        {/* дефиниране на навигац. контейнер */}
        <Routes>

            {/* дефиниране на рутове за различните страници (страницата която ще се показва, когато потребителя отиде на определен адрес)*/}
            <Route path="/" element={<Home />} />
            <Route path="/our_cats" element={<OurCats />} />
            <Route path="/cafe_menu" element={<CafeMenu />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/kids_zone" element={<KidsZone />} />
            <Route path="/product/:id" element={<ShopProductDetails/>} />
            <Route path="/book" element={<BookNowDialog />} />
        </Routes>
    </div>
 )
}


export default App;