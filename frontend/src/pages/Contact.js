import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual contact form submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container" style={{ maxWidth: '600px', paddingTop: '60px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
            <h2>Message Sent!</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '20px 0' }}>
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn btn-primary">
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '900px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>Contact Us</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: '20px' }}>📞 Phone Support</h3>
            <p style={{ fontSize: '20px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              <a href="tel:+250780866714" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                +250 780 866 714
              </a>
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Monday - Friday<br />
              8:00 AM - 6:00 PM (EAT)
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: '20px' }}>📧 Email Support</h3>
            <p style={{ fontSize: '18px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              <a href="mailto:r.kaze@alustudent.com" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                r.kaze@alustudent.com
              </a>
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              We respond within 24 hours
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Send us a Message</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+250 780 866 714"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <select
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                className="form-control"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-body">
          <h3 style={{ marginBottom: '20px' }}>📍 Visit Our Office</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
            <strong>AGRITRACE Headquarters</strong><br />
            KG 11 Ave, Kigali<br />
            Kigali, Rwanda
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Office Hours: Monday - Friday, 8:00 AM - 5:00 PM (EAT)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
