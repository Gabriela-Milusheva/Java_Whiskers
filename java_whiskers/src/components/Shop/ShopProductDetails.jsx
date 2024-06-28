import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import styles from '../../style';
import { Navbar, Footer } from '../index.js';
import { user_cat_photo } from "../../assets/index.js";

const ShopProductDetails = () => {
    const { id } = useParams(); //извличане на id на артикула от текущия маршрут (URL)

    const [product, setProduct] = useState(null);
    const [profileImage, setProfileImage] = useState(''); //състояние за URL на основното/профилното изображение на продукта
    const [additionalImages, setAdditionalImages] = useState([]); //състояние за масив от URL-и на допълнителните изображения на продукта
    const [quantity, setQuantity] = useState(1); //състояние за количеството на продукта

    const [averageRating, setAverageRating] = useState(0);

    const [review, setReview] = useState(''); //текст на настоящото написано ревю
    const [rating, setRating] = useState(0); //оценка на настоящото написано ревю
    const [userName, setUserName] = useState(''); //подател на настоящото написано ревю

    const calculateAverageRating = (reviews) => {
        if (reviews.length > 0) {
            const totalStars = reviews.reduce((acc, review) => acc + parseInt(review.starRating), 0);
            const average = totalStars / reviews.length;
            setAverageRating(average);
        }
    };

    useEffect(() => {

        // ф-я, която асинхронно извлича данни за артикула от сървъра на БД
        const fetchProduct = async () => {

                const response = await fetch(`http://localhost:3003/Shop_Products/${id}`);

                const data = await response.json();

                setProduct(data); //задаване на състоянието за данните за продукта --> product

                setProfileImage(`${data.imgs}-1.jpg`); // задаване на основното изображение на продукта
                setAdditionalImages([ // задаване на допълнителните изображения на продукта
                    `${data.imgs}-2.jpg`,
                    `${data.imgs}-3.jpg`
                ]);
                calculateAverageRating(data.reviews); //изчисляване на средния рейтинг при зареждане на продукта

        };

        fetchProduct();
    }, [id]);


    //ф-я за промяна на основното изображение на продукта при кликване върху някое от допълнителните изображения
    const handleImageClick = (newProfileImage) => {
        setProfileImage(newProfileImage);
    };

    //ф-я за промяна на количеството на продукта
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return; //не може да е по-малко от 1
        setQuantity(newQuantity);
    };


    // ф-я за обработка на кликване в/у бутона "Add to Cart"
    const handleAddToCart = () => {
        toggleCart(product.id, quantity);
    };

    // async ф-я за добавяне на продукт в Cart
    const toggleCart = async (productId, quantity) => {

        // създаване на обект item с данни за артикула (productId и количество), който ще бъде добавен в Cart в БД
        const item = {
            productId,
            quantity
        };

        // Изпращане на POST заявка към сървъра на адрес 'http://localhost:3003/Cart'
        const response = await fetch('http://localhost:3003/Cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', //указва, че данните, които изпращаме към сървъра, са в JSON формат
                },
                body: JSON.stringify(item), //преобразува JavaScript обекта item в JSON формат и го задава като тяло на заявката
        });

    };

    //ПУБЛИКУВАНЕ НА REVIEW
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSubmitReview = async () => {
        const newReview = {
            reviewerUsername: userName || "Anonymous",
            reviewId: Math.floor(Math.random() * 1000), //генериране на уникален идентификатор за ревюто
            content: review,
            starRating: rating.toString() // оценка на ревюто, конвертирана в низ
        };

        //актуализиране на ревютатата на даден продукт в БД
        //изпраща PATCH заявка (за частично актуализиране) към сървъра на адрес `http://localhost:3003/Shop_Products/${id}`
            const response = await fetch(`http://localhost:3003/Shop_Products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', //указва, че данните, които изпращаме към сървъра, са в JSON формат
                },
                body: JSON.stringify({
                    reviews: [...product.reviews, newReview] //изграждане на нов масив от ревюта като към старите product.reviews добавим newReview
                }),  //преобразува JavaScript обекта reviews[] в JSON формат и го изпраща като тяло на заявката
            });

            if (response.ok) {
                setProduct(prevProduct => ({
                    ...prevProduct,
                    reviews: [...prevProduct.reviews, newReview]
                }));

                setReview('');
                setRating(0);
                setUserName('');
                calculateAverageRating([...product.reviews, newReview]);
            }

    };

    const handlePreviousImg = () => {
        const currentIndex = additionalImages.indexOf(profileImage);
        const newIndex = (currentIndex - 1 + additionalImages.length) % additionalImages.length;
        setProfileImage(additionalImages[newIndex]);
    };

    const handleNextImg = () => {
        const currentIndex = additionalImages.indexOf(profileImage);
        const newIndex = (currentIndex + 1) % additionalImages.length;
        setProfileImage(additionalImages[newIndex]);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const renderStars = () => {
        const stars = [];
        const roundedRating = Math.round(averageRating);

        for (let i = 0; i < 5; i++) {
            if (i < roundedRating) {
                stars.push(<span key={i} className="star filled">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="star">&#9733;</span>);
            }
        }

        return stars;
    };

    const renderReviewStars = (starRating) => {
        const filledStars = parseInt(starRating); // Determine how many stars should be filled
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < filledStars) {
                stars.push(<span key={i} className="star filled">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="star">&#9733;</span>);
            }
        }

        return stars;
    };

    return (
        <div className={`page ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
                <div className="shop-product">

                    <div className="shop-product-details">


                        <div className="product-photos-container">
                            <div className="product-details-images">

                                <button onClick={handlePreviousImg} className="left-img-button">{"<"}</button>
                                <button onClick={handleNextImg} className="right-img-button">{">"}</button>

                                <img
                                    src={profileImage}
                                    alt={`${product.title}-main`}
                                    className="product-detail-image"
                                />
                                <div className="product-additional-images">

                                    {additionalImages.map((img, index) => (
                                        <div key={index} className="product-additional-image-container">

                                            <img
                                                src={img}
                                                alt={`${product.title}-${index + 2}`}
                                                className="product-additional-image"
                                                onClick={() => handleImageClick(img)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="product-details-content">

                            <h1 className="product-details-title">{product.title}</h1>

                            <div className="average-rating">
                                {renderStars()}
                            </div>

                            <div className="product-main-content">

                                <p className="product-details-desc">{product.desc}</p>

                                <div className="buy-options-container">

                                    <p className="product-details-price">{product.price.toFixed(2)} BGN</p>

                                    <div className="quantityOptions">

                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            className="quantity-button-left">-</button>

                                        <span className="quantity-number">{quantity}</span>

                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            className="quantity-button-right">+</button>
                                    </div>

                                    <button className="addToCartButton" onClick={handleAddToCart}>
                                        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="reviews-container">
                        <h1>Reviews</h1>
                        {product.reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            <ul>
                                {product.reviews.map((review, index) => (
                                    <li className="review-container" key={index}>
                                        <div className="review-stars">
                                            {renderReviewStars(review.starRating)}
                                        </div>
                                        <div className="review-header">
                                            <img src={user_cat_photo} alt="" className="user-cat-photo"/>
                                            <h1>{review.reviewerUsername}</h1>
                                        </div>
                                        <p>{review.content}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <h2>Rate & Review</h2>
                        <h3>Name:</h3>
                        <input
                            className="review-name-input"
                            type="text"
                            value={userName}
                            onChange={handleNameChange}
                            placeholder="Your name (optional)"
                        />
                        <h3>Review:</h3>
                        <textarea
                            className="review-textarea"
                            value={review}
                            onChange={handleReviewChange}
                            placeholder="Write your review here..."
                            rows="4"
                            cols="50"
                        />


                        <h3>Rating:</h3>
                        <select id="rating" value={rating} onChange={handleRatingChange} className="rating">
                            <option value="0">Select Rating</option>
                            <option value="1">&#9733;</option>
                            <option value="2">&#9733;&#9733;</option>
                            <option value="3">&#9733;&#9733;&#9733;</option>
                            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                        </select>
                        <button onClick={handleSubmitReview} className="submitReviewButton">
                            Submit Review
                        </button>
                    </div>
                </div>
                <Footer/>

            </div>
        </div>
    );
};

export default ShopProductDetails;