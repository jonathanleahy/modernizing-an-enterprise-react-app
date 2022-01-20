import React from 'react';
import { formatPrice } from '../../helpers/formatPrice';
import './CheckoutItem.css';

const CheckoutItem = ({ item, removeItemFromCheckout }) => {
  const { name, brand, description, retailPrice } = item;

  return (
    <li className="checkout-item">
      <div>
        <div className="checkout-item-wrapper">
          <div className="checkout-item-data strong">{name}</div>
          <div className="checkout-item-data">
            <span className="strong">By: </span>
            <span>{brand}</span>
          </div>
          <div className="checkout-item-wrapper">{description}</div>
        </div>
      </div>
      <div className="checkout-item-price strong">
        {formatPrice(retailPrice)}
      </div>
      <div>
        <button
          className="primary"
          onClick={() => removeItemFromCheckout(item.id)}
        >
          Remove Product from Checkout
        </button>
      </div>
    </li>
  );
};

export default CheckoutItem;
