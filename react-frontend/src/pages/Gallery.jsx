import React from 'react';

// Import gallery images
import img1 from '../assets/images/gallery-1.jpg';
import img2 from '../assets/images/gallery-2.jpg';
import img3 from '../assets/images/gallery-3.jpg';
import img4 from '../assets/images/gallery-4.jpg';
import img5 from '../assets/images/gallery-5.jpg';
import img6 from '../assets/images/gallery-6.jpg';

const galleryImages = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  return (
    <section className="gallery-section" id="gallery">
      <div className="content-section">
        <h2 className="section-title">Gallery</h2>
        <ul className="gallery-list">
          {galleryImages.map((img, index) => (
            <li className="gallery-images" key={index}>
              <img src={img} alt={`Gallery ${index + 1}`} className="gallery-image" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Gallery;
