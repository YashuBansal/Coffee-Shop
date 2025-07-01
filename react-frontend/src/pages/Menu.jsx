import React from 'react';

// Import all images
import hotBeverages from '../assets/images/hot-beverages.png';
import coldBeverages from '../assets/images/cold-beverages.png';
import refreshment from '../assets/images/refreshment.png';
import specialCombo from '../assets/images/special-combo.png';
import desserts from '../assets/images/desserts.png';
import burgerFries from '../assets/images/burger-frenchfries.png';

const menuItems = [
  {
    title: 'Hot Beverage',
    description: 'A rich and bold coffee shot, perfect for a quick pick-me-up.',
    price: '$3.00',
    image: hotBeverages
  },
  {
    title: 'Cold Beverages',
    description: 'A delightful blend of espresso, steamed milk, and frothy foam.',
    price: '$4.50',
    image: coldBeverages
  },
  {
    title: 'Refreshment',
    description: 'Smooth and creamy, our latte is a perfect balance of espresso and milk.',
    price: '$4.00',
    image: refreshment
  },
  {
    title: 'Special Combo',
    description: 'A delicious combination of espresso, chocolate, and steamed milk.',
    price: '$5.00',
    image: specialCombo
  },
  {
    title: 'Dessert',
    description: 'A classic coffee drink made with espresso and hot water.',
    price: '$3.50',
    image: desserts
  },
  {
    title: 'Burger Frenchfries',
    description: 'A velvety coffee with a perfect balance of espresso and microfoam.',
    price: '$4.25',
    image: burgerFries
  }
];

const Menu = () => {
  return (
    <section className="menu-section" id="menu">
      <div className="content-section">
        <h2 className="section-title">Our Menu</h2>
        <div className="menu-items">
          {menuItems.map((item, idx) => (
            <div key={idx} className="menu-item">
              <img src={item.image} alt={item.title} className="menu-image" />
              <h3 className="menu-item-title">{item.title}</h3>
              <p className="menu-item-description">{item.description}</p>
              <span className="menu-item-price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
