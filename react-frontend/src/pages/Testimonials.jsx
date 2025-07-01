import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import all testimonial images
import user1 from '../assets/images/user-1.jpg';
import user2 from '../assets/images/user-2.jpg';
import user3 from '../assets/images/user-3.jpg';
import user4 from '../assets/images/user-4.jpg';
import user5 from '../assets/images/user-5.jpg';

const testimonials = [
  {
    image: user1,
    text: `"The best coffee I've ever had! The atmosphere is cozy and the staff is friendly."`,
    name: 'John Doe',
  },
  {
    image: user2,
    text: `"A perfect place to relax and enjoy a cup of coffee. Highly recommended!"`,
    name: 'Jane Smith',
  },
  {
    image: user3,
    text: `"Great coffee, great service! I love coming here every morning."`,
    name: 'Alice Johnson',
  },
  {
    image: user4,
    text: `"A hidden gem! The coffee is amazing and the ambiance is perfect for working."`,
    name: 'Bob Brown',
  },
  {
    image: user5,
    text: `"I love the variety of coffee options they have. Always a great experience!"`,
    name: 'Charlie Green',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="content-section">
        <h2 className="section-title">Testimonials</h2>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
          grabCursor={true}
          spaceBetween={20}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}>
            
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="testimonial-card swiper-slide">
              <img src={testimonial.image} alt={`Customer ${index + 1}`} className="testimonial-image" />
              <p className="testimonial-text">{testimonial.text}</p>
              <h4 className="customer-name">{testimonial.name}</h4>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;
