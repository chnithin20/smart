import React from 'react';

const ContactForm = () => {
  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <style>{`
        .contact-form {
          background-color: #2b313b;
          padding: 20px;
          border-radius: 8px;
          color: #e0e0e0;
        }
        .contact-form h2 {
          margin-bottom: 20px;
        }
        .contact-form div {
          margin-bottom: 15px;
        }
        .contact-form label {
          display: block;
          margin-bottom: 5px;
        }
        .contact-form input, .contact-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #30363d;
          border-radius: 4px;
          background-color: #1a1e27;
          color: #e0e0e0;
        }
        .contact-form button {
          background-color: #58a6ff;
          color: #ffffff;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .contact-form button:hover {
          background-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;