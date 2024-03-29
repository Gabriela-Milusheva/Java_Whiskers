import React, { useState, useEffect } from 'react';
import "../index.css";
import { Atmosphere_Gallery } from '../../db.json';

const AtmosphereSection = () => {
    const dataImages = Atmosphere_Gallery;

    const [model, setModel] =useState(false);
    const [tempImgSrc, setTempImgSrc] =useState('');

    const getImg=(imgSrc) =>{
        setTempImgSrc(imgSrc);
        setModel(true);
    }

    return (
        <div className="atmosphere_container">
            <h1 className="atmosphere_title">
                Atmosphere
            </h1>

            <div className={model? "model open" : "model"}>
                <img src={tempImgSrc} />
                <button title="Close" type="button" className="close-button" onClick={()=>setModel(false)}>×</button>
            </div>

            <div className="gallery">
            {dataImages.map((item,index)=>{
                    return(
                        <div className="pics" key={index} onClick={()=> getImg(item.imgSrc)}>
                            <img src={item.imgSrc}  alt=""/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AtmosphereSection;