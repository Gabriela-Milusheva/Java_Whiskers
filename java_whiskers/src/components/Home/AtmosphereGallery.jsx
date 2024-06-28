import React, { useState } from 'react';
import "../../index.css";
import { Atmosphere_Gallery } from '../../../db.json';
import { navButtons } from "../../constants/index.js";
import {orange_top_wave} from "../../assets/index.js";

const AtmosphereGallery = () => {
    const dataImages = Atmosphere_Gallery;
    const viewMoreButton = navButtons.find(button => button.id === 'view_more');
    const viewLessButton = navButtons.find(button => button.id === 'view_less');

    const [model, setModel] =useState(false);
    const [tempImgSrc, setTempImgSrc] =useState('');
    const [visibleImages, setVisibleImages] = useState(dataImages.length/2); // служи за изобразяване само на първата половина


    const handleViewMore = () => {
        setVisibleImages(prevVisibleImages => prevVisibleImages + 12);
    };

    const handleViewLess = () => {
        setVisibleImages(prevVisibleImages => prevVisibleImages - 12);
    };

    //отваряне на снимката на голям екран
    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModel = () => {
        setModel(false);

        document.body.style.overflow = 'auto';
    };


    return (
        <div className="atmosphere_container">
            <div>

                <h1 className="atmosphere_title">
                    Atmosphere
                </h1>

                <div className={model ? "model open" : "model"}>
                    <img src={tempImgSrc}/>
                    <button title="Close" type="button" className="close-button" onClick={handleCloseModel}>×</button>
                </div>

                <div className="gallery">
                    {dataImages.slice(0, visibleImages).map((item, index) => { // Изобразете само първите visibleImages
                        return (
                            <div className="pics" key={index} onClick={() => getImg(item.imgSrc)}>
                                <img src={item.imgSrc} alt=""/>
                            </div>
                        )
                    })}
                </div>

                {visibleImages < dataImages.length && (
                    <button
                        className="view_button popup-modal font-poppins font-normal cursor-pointer px-4 py-2 rounded-md uppercase"
                        style={{marginLeft: '40px'}}
                        onClick={handleViewMore}
                    >
                        {viewMoreButton.title.toUpperCase()}
                    </button>
                )}

                {visibleImages === dataImages.length && (
                    <button
                        className="view_button popup-modal font-poppins font-normal cursor-pointer px-4 py-2 rounded-md uppercase"
                        style={{marginLeft: '40px'}}
                        onClick={handleViewLess}
                    >
                        {viewLessButton.title.toUpperCase()}
                    </button>
                )}

            </div>
            
        </div>
    );
};

export default AtmosphereGallery;