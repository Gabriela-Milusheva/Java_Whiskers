import React, {useEffect, useState} from 'react';
import {circle_paw, red_top_wave} from "../../assets/index.js";
import { Our_Cats } from '../../../db.json';

const OurCatsGallery = () => {
    const dataCats = Our_Cats; //dataCats съхранява масив от котки, взети от Our_Cats
    const [model, setModel] = useState(false); //model съхранява състоянието на модалния прозорец (отворен или затворен)
    const [selectedCat, setSelectedCat] = useState(null); //selectedCat съхранява текущата избраната котка, за която ще се покаже детайлен изглед
    const [currentIndex, setCurrentIndex] = useState(null); //currentIndex съхранява текущия индекс на избраната котка в масива dataCats
    const [animationClass, setAnimationClass] = useState(''); //animationClass съхранява CSS класа за анимация на детайлния изглед (плъзгане)


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
        setAnimationClass('slide-out-right'); //анимиране на преместването (приплъзване)

        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                //ако стигнем началото на масива от котки се задава, следващ индекс края, за да започне прелистването наобратно
                const newIndex = prevIndex > 0 ? prevIndex - 1 : dataCats.length - 1;
                setSelectedCat(dataCats[newIndex]);
                setAnimationClass('slide-in-left');
                setTimeout(() => setAnimationClass(''), 600); // Reset animation class
                return newIndex;
            });
        }, 600);
    };

    const handleNextCat = () => {
        setAnimationClass('slide-out-left'); //анимиране на преместването (приплъзване)

        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                //ако стигнем края на масива от котки се задава следващ индекс 0, за да започне прелистването отначало
                const newIndex = prevIndex < dataCats.length - 1 ? prevIndex + 1 : 0;
                setSelectedCat(dataCats[newIndex]);
                setAnimationClass('slide-in-right');
                setTimeout(() => setAnimationClass(''), 600);
                return newIndex;
            });
        }, 600);
    };

    const CatDetailsModalImages = ({ selectedCat }) => {

        const [profileImage, setProfileImage] = useState(`${selectedCat.imgs}/1.jpg`); //profileImage съхранява адреса на профилното изображение на избраната котка (1-вата снимка в imgs)
        const [additionalImages, setAdditionalImages] = useState([  //масива additionalImages съхранява адресите на допълнителните изображения на избраната котка
            `${selectedCat.imgs}/2.jpg`,
            `${selectedCat.imgs}/3.jpg`
        ]);

        //извиква се при промяна на selectedCat
        useEffect(() => {
            setProfileImage(`${selectedCat.imgs}/1.jpg`);
            setAdditionalImages([
                `${selectedCat.imgs}/2.jpg`,
                `${selectedCat.imgs}/3.jpg`
            ]);
        }, [selectedCat]);

        //при кликване за преглед на допълнително изобпажение
        const handleImageClick = (newProfileImage) => {

            //сетва профилното изображение, с допълнителното в/у което сме клекнали
            setProfileImage(newProfileImage);

            //сетва останалите снимки в additionalImages
            setAdditionalImages(additionalImages.map(img =>
                img === newProfileImage ? profileImage : img
            ));
        };

        //визуализация на компонента
        return (
            <div className="cat-details-modal-images">

                <img src={profileImage} alt="" className="cat-profile-image" />

                <div className="additional-images">

                    {additionalImages.map((img, index) => (
                        <div key={index} className="additional-image-container">

                            <img
                                src={img}
                                alt=""
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

                            {/*Визуализиране на секцияна със снимките на selectedCat*/}
                            <CatDetailsModalImages selectedCat={selectedCat}/>

                            {/*Визуализиране на секцияна с информацията на selectedCat*/}
                            <div className="cat-details-bio">
                                <h1 className="cat-details-name">{selectedCat.name}</h1> <br/>

                                <p className="hero-desc">
                                    <strong>Gender:</strong> {selectedCat.gender} {selectedCat.gender === 'male' ? '♂' : selectedCat.gender === 'female' ? '♀' : ''}
                                </p> <br/>

                                <p className="hero-desc"><strong>Date of Birth:</strong> {selectedCat.dob}</p> <br/>
                                <p className="hero-desc"><strong>Description:</strong> {selectedCat.desc}</p> <br/>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default OurCatsGallery;