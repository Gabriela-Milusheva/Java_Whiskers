import React, { useState, useEffect } from 'react';
import styles from '../style.js';
import "../index.css";
import { Navbar, Footer } from '../components';
import { cat1, cat5, pink_top_wave, circle_paw } from "../assets/index.js";
import { Our_Cats } from '../../db.json';

const OurCats = () => {
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
                setTimeout(() => setAnimationClass(''), 600); // Reset animation class
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
        <div>
            <div className={`our_cats-page ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                    <div className="hero-container overflow-hidden relative">
                        <img src={cat1} alt="" className="hidden-on-smaller absolute h-auto" style={{ zIndex: -1, top: '90px', left: '-10px', height: '300px' }} />
                        <img src={cat5} alt="" className="hidden-on-smaller absolute h-auto" style={{ zIndex: -1, top: '160px', right: '-40px', height: '300px' }} />
                        <div className="hero-content">
                            <h2 className="hero-title1">Meet the cats</h2>
                            <p className="hero-desc">
                                Java Whiskers Café is a re-homing and care facility for cats and kittens from a range of
                                backgrounds.
                                From rescue cats, to strays, to cats which have had medical issues -<br />
                                we take them in and look after them until they find their forever home.
                            </p>
                        </div>
                        <img src={pink_top_wave} alt="" className="absolute-behind w-full bottom-0" style={{ zIndex: 10 }} />
                    </div>

                    <div className="cats-gallery">
                        {dataCats.map((cat, index) => (
                            <div key={cat.id} className="cat-card" onClick={() => handleCatClick(cat, index)}>
                                <img src={`${cat.imgs}/1.jpg`} alt={cat.name} className="cat-image" />
                                <img src={circle_paw} alt="" className="cat-image-paw" />
                                <h1 className="cat-name">{cat.name}</h1>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            </div>
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

export default OurCats;