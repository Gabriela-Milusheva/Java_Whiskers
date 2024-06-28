import React from 'react';
import {
    cats_play_1,
    girl_hugging_cat,
    orange_speech_bubble,
    pink_top_wave
} from "../../assets/index.js";

const KidsZoneHero = () => {
    return (
        <div className="hero-container">

            <h1 className="hero-title1">Kids Zone</h1>

            <img src={girl_hugging_cat} alt="" className="girl-hugging-cat-img "/>

            <img src={orange_speech_bubble} alt="" className="orange-speech-bubble-img"/>

            <img src={cats_play_1} alt="" className="cats-play-img-1"/>


            <div className="hero-text-container-r">

                <h2 className="hero-bubble-text">You can download, print and bring <br/> these paw-some games with
                    you to the café, <br/> or purchase them during your next visit!
                </h2>
            </div>


            <img src={pink_top_wave} alt="" className="absolute-behind w-full bottom-0" style={{zIndex: 10}}/>
        </div>
    );
};

export default KidsZoneHero;