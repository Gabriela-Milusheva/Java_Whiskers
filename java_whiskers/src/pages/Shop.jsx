import React from 'react';
import styles from "../style.js";
import {ShopHero, ShopProductsGallery, Footer, Navbar} from "../components/index.js";



const Shop = () => {
    return (
        <div className={`page ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
                <ShopHero/>
                <ShopProductsGallery/>
                <Footer/>
            </div>
        </div>
    );
};

export default Shop;