import React from 'react';
import { formatPrice } from '../../helpers/formatPrice';
import './Product.css';

const Product = ({ product, addItemToCheckout }) => {
  return (
    <div key={product.id} className="product">
      <div>
        <h3 className="product-name">{product.name}</h3>
      </div>
      <dl>
        <dt>Brand:</dt>
        <dd>{product.brand}</dd>
        <dt>Retail Price:</dt>
        <dd>{formatPrice(product.retailPrice)}</dd>
        <dt>Description:</dt>
        <dd>{product.description}</dd>
      </dl>
      <div className="product-button-wrapper">
        <button className="primary" onClick={() => addItemToCheckout(product)}>
          Add to Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;
