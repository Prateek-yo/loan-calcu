import { useState } from 'react';

/**
 * Contact Us Page Component
 * Professional contact form for user inquiries
 */
function Contact() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      alert('Thank you for your message! We will get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="contact-page fade-in">
      <div className="card">
        <h1>Contact Us</h1>
        <p style={{ color: '#718096', marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>
          Have questions about loan calculations or need help using our calculator? 
          We're here to help! Send us a message and we'll get back to you promptly.
        </p>

        {/* Contact form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-input"
              placeholder="What is this regarding?"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Contact information */}
      <div className="card">
        <h2>Get in Touch</h2>
        <div className="contact-info-grid">
          <div className="contact-info-item">
            <h3>Email Support</h3>
            <p>prateekshakya3@gmail.com</p>
            <p className="note">We typically respond within 24 hours</p>
          </div>
          
          <div className="contact-info-item">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p className="note">Closed on Sundays and public holidays</p>
          </div>
          
          <div className="contact-info-item">
            <h3>Response Time</h3>
            <p>General Inquiries: Within 24 hours</p>
            <p>Technical Support: Within 12 hours</p>
            <p className="note">Priority support for urgent matters</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>How accurate are the loan calculations?</h3>
            <p style={{ color: '#4a5568' }}>Our calculator uses standard EMI formulas used by banks and financial institutions. Results are highly accurate for estimation purposes.</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Can I use this for any type of loan?</h3>
            <p style={{ color: '#4a5568' }}>Yes! Our calculator works for personal loans, home loans, car loans, business loans, and education loans.</p>
          </div>
          
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Is my data secure?</h3>
            <p style={{ color: '#4a5568' }}>Absolutely. All calculations are performed locally in your browser. No financial data is stored or transmitted to our servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;