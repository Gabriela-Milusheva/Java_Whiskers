import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../../../db.json';

const ShopProductDetails = () => {
    const { id } = useParams();
    const product = productsData.Shop_Products.find(p => p.id === parseInt(id));
    const [model, setModel] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate(); // Променено име на променливата

    // Close modal function
    const handleClose = () => {
        setSelectedProduct(null);
        setModel(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className={`shop-product-details ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="product-details-content">
                    <button onClick={handleClose} className="close-button">×</button>
                    <div className="product-details-images">
                        {/* Display images here */}
                        <img src={`${product.imgs}/1.jpg`} alt={product.title} className="product-detail-image"/>
                    </div>
                    <div className="product-details-info">
                        <h1 className="product-details-name">{product.title}</h1>
                        <p className="hero-desc"><strong>Description:</strong> {product.desc}</p>
                        <p className="hero-desc"><strong>Price:</strong> {product.price.toFixed(2)} BGN</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopProductDetails;