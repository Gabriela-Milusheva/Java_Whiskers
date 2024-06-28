import React from 'react';
import styles from "../style.js";
import {Footer, Navbar, KidsZoneHero, KidsZoneGames} from "../components/index.js";
import {orange_top_wave} from "../assets/index.js";

const KidsZone = () => {

    return (
        <div className={`page ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
                <KidsZoneHero/>
                <KidsZoneGames/>
                <Footer/>
            </div>
        </div>
    );
};

export default KidsZone;