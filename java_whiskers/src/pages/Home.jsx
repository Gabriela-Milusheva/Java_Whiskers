import React from 'react';
import styles from '../style.js';
import { Navbar, HomeHero, AtmosphereGallery, KidsZoneSection, RulesSection, Footer} from "../components/index.js";


const Home = () => {
    return (
            <div className={`page ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                    <HomeHero/>
                    <AtmosphereGallery/>
                    <KidsZoneSection/>
                    <RulesSection/>
                    <Footer/>
                </div>
            </div>

    );
};

export default Home;