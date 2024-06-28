import React from 'react';
import {cafe_menu, cat4, cat7, orange_top_wave} from "../../assets/index.js";
import "../../index.css";
import { navButtons } from "../../constants/index.js";

const CafeMenuHero = () => {

    const downloadMenuButton = navButtons.find(button => button.id === 'download_menu');

    return (
        <div className="hero-container overflow-hidden relative">

            <img src={cat4} alt="" className="hidden-on-smaller absolute h-auto"
                 style={{zIndex: -1, top: '90px', left: '-10px', height: '300px'}}/>
            <img src={cat7} alt="" className="hidden-on-smaller absolute h-auto"
                 style={{zIndex: -1, top: '190px', right: '-40px', height: '300px'}}/>

            <div className="hero-content">

                <h2 className="hero-title1">Our Menu</h2>

                <p className="hero-desc">
                    All of our food is prepared by our team of trained kitchen staff from the sealed glass
                    kitchen
                    where you can see your food being made, without risk of little paws getting involved.
                    The cafe is kept at the highest standard of hygiene and cleanliness, which is proven
                    from our
                    Food Standard rating of 5 - something the kitties are very proud of!
                </p>

                <a href={cafe_menu} download
                   className="download_button popup-modal font-poppins font-normal cursor-pointer px-4 py-2 rounded-md uppercase"
                   style={{marginLeft: '40px', top: '35px'}}>
                    {downloadMenuButton.title.toUpperCase()}
                </a>
            </div>

            <img src={orange_top_wave} alt="" className="absolute-behind w-full bottom-0"
                 style={{zIndex: 10}}/>

        </div>
    );
};

export default CafeMenuHero;