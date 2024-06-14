import React, {useEffect, useState} from 'react';
import {circle_paw} from "../../assets/index.js";
import { Our_Cats } from '../../../db.json';

const OurCatsGallery = () => {
    const dataCats = Our_Cats;
    const [model, setModel] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [animationClass, setAnimationClass] = useState('');

    const handleCatClick = (cat, index) => {
        setSelectedCat(cat);
        setCurrentIndex(index);
        setModel(true);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setSelectedCat(null);
        setModel(false);
        document.body.style.overflow = 'auto';
    };

    const handlePreviousCat = () => {
        setAnimationClass('slide-out-right');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex > 0 ? prevIndex - 1 : dataCats.length - 1;
                setSelectedCat(dataCats[newIndex]);
                setAnimationClass('slide-in-left');
                setTimeout(() => setAnimationClass(''), 600); // Reset animation class
                return newIndex;
            });
        }, 600);
    };

    const handleNextCat = () => {
        setAnimationClass('slide-out-left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex < dataCats.length - 1 ? prevIndex + 1 : 0;
                setSelectedCat(dataCats[newIndex]);
                setAnimationClass('slide-in-right');
                setTimeout(() => setAnimationClass(''), 600);
                return newIndex;
            });
        }, 600);
    };

    const CatDetailsModalImages = ({ selectedCat }) => {
        const [profileImage, setProfileImage] = useState(`${selectedCat.imgs}/1.jpg`);
        const [additionalImages, setAdditionalImages] = useState([
            `${selectedCat.imgs}/2.jpg`,
            `${selectedCat.imgs}/3.jpg`
        ]);

        useEffect(() => {
            setProfileImage(`${selectedCat.imgs}/1.jpg`);
            setAdditionalImages([
                `${selectedCat.imgs}/2.jpg`,
                `${selectedCat.imgs}/3.jpg`
            ]);
        }, [selectedCat]);

        const handleImageClick = (newProfileImage) => {
            setProfileImage(newProfileImage);
            setAdditionalImages(additionalImages.map(img =>
                img === newProfileImage ? profileImage : img
            ));
        };

        return (
            <div className="cat-details-modal-images">
                <img src={profileImage} alt={selectedCat.name} className="cat-profile-image" />
                <div className="additional-images">
                    {additionalImages.map((img, index) => (
                        <div key={index} className="additional-image-container">
                            <img
                                src={img}
                                alt={`${selectedCat.name} ${index + 2}`}
                                className="additional-image"
                                onClick={() => handleImageClick(img)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="cats-gallery">
            {dataCats.map((cat, index) => (
                <div key={cat.id} className="cat-card" onClick={() => handleCatClick(cat, index)}>
                    <img src={`${cat.imgs}/1.jpg`} alt={cat.name} className="cat-image"/>
                    <img src={circle_paw} alt="" className="cat-image-paw"/>
                    <h1 className="cat-name">{cat.name}</h1>
                </div>
            ))}

            {selectedCat && (
                <div className={model ? "cat-details-modal open" : "cat-details-modal"}>
                    <div className="cat-details-content-wrapper">
                        <button onClick={handleClose} className="close-button">×</button>
                        <button onClick={handlePreviousCat} className="left-button">{"<"}</button>
                        <button onClick={handleNextCat} className="right-button">{">"}</button>

                        <div className={`cat-details-content ${animationClass}`}>
                            <CatDetailsModalImages selectedCat={selectedCat} />

                            <div className="cat-details-bio">
                                <h1 className="cat-details-name">{selectedCat.name}</h1> <br />
                                <p className="hero-desc">
                                    <strong>Gender:</strong> {selectedCat.gender} {selectedCat.gender === 'male' ? '♂' : selectedCat.gender === 'female' ? '♀' : ''}
                                </p> <br />
                                <p className="hero-desc"><strong>Date of Birth:</strong> {selectedCat.dob}</p> <br />
                                <p className="hero-desc"><strong>Description:</strong> {selectedCat.desc}</p> <br />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurCatsGallery;