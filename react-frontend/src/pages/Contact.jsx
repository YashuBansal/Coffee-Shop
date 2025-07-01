import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setStatus(data.message || 'Message sent!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error sending message');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="content-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-details">
          <ul className="contact-info-list">
            <li className="contact-info"><i className="far fa-map"></i><span>123 Coffee Street, Brewtown</span></li>
            <li className="contact-info"><i className="far fa-envelope"></i><span>info.support@gmail.com</span></li>
            <li className="contact-info"><i className="fa fa-phone"></i><span>+1 234 567 890</span></li>
            <li className="contact-info"><i className="fa-regular fa-clock"></i><span>Mon - Fri: 8:00 AM - 8:00 PM</span></li>
            <li className="contact-info"><i className="fa-regular fa-clock"></i><span>Saturday: Closed</span></li>
            <li className="contact-info"><i className="fa-regular fa-clock"></i><span>Sunday: 9:00 AM - 9:00 PM</span></li>
          </ul>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" className="contact-input" id="name" 
              value={form.name}
              onChange={handleChange}
              required
            />
            <input type="email" placeholder="Your Email" className="contact-input" id="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea placeholder="Your Message" className="contact-input" id="message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-button">Send Message</button>
            <div className="status-message">
              <p id="status" style={{ color: status.includes('Error') ? 'red' : 'green' }}>{status}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
