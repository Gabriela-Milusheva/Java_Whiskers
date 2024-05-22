import React from 'react';
import styles from '../style.js';
import { Navbar, Hero, AtmosphereSection, KidsZoneSection, RulesSection, Footer} from "../components/index.js";


const Home = () => {
    return (
            <div className={`home-page ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                    <Hero/>
                    <AtmosphereSection/>
                    <KidsZoneSection/>
                    <RulesSection/>
                    <Footer/>
                </div>
            </div>

    );
};

export default Home;