import React from 'react';
import styles from '../style.js';
import "../index.css";
import { OurCatsHero, OurCatsGallery, Navbar, Footer } from '../components';

const OurCats = () => {

    return (
        <div>
            <div className={`page ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                    <OurCatsHero/>
                    <OurCatsGallery/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default OurCats;