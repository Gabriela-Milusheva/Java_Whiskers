import React from 'react';
import styles from "../style.js";
import {CafeMenuFlipBook, CafeMenuHero, Footer, Navbar} from "../components/index.js";

const CafeMenu = () => {

    return (
        <div className={`page ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
                <CafeMenuHero/>
                <CafeMenuFlipBook/>
                <Footer/>
            </div>
        </div>
    );
};

export default CafeMenu;