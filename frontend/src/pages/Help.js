import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  const faqs = [
    {
      question: "How do I verify a product?",
      answer: "Go to the Verify page and either scan the QR code on the product label using your camera, or enter the QR code manually. The system will check the blockchain and display product information."
    },
    {
      question: "What is biofortification?",
      answer: "Biofortification is the process of increasing the nutritional value of crops through conventional plant breeding, transgenic techniques, or agronomic practices. Our platform tracks biofortified crops with enhanced iron content."
    },
    {
      question: "How does blockchain ensure authenticity?",
      answer: "Every product registered on AGRITRACE is recorded on the blockchain with a unique hash. This creates an immutable record that cannot be altered, ensuring product authenticity and traceability throughout the supply chain."
    },
    {
      question: "Can I track my product's supply chain?",
      answer: "Yes! Once a product is registered, you can view its complete journey from farm to consumer, including all transactions and transfers."
    },
    {
      question: "How do I register a new product?",
      answer: "Login to your account, go to Products > Register Product, fill in the product details including variety, iron content, and quantity. The system will generate a unique QR code for your product."
    },
    {
      question: "What user types are available?",
      answer: "AGRITRACE supports multiple user types: Farmer, Trader/Aggregator, Processor/Retailer, Consumer, Seed Producer, and Administrator. Each type has specific permissions and features."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and security practices. Your personal data is protected, and blockchain records are immutable and transparent."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email or phone number, and follow the instructions sent to you."
    }
  ];

  return (
    <div className="container" style={{ maxWidth: '900px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>Help Center</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Find answers to common questions and learn how to use AGRITRACE effectively.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📖</div>
            <h3>User Guide</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              Learn how to use all features
            </p>
            <Link to="/how-it-works" className="btn btn-outline">
              Read Guide
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📹</div>
            <h3>Video Tutorials</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              Watch step-by-step videos
            </p>
            <button className="btn btn-outline">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>💬</div>
            <h3>Contact Support</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
              Get help from our team
            </p>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Frequently Asked Questions</div>
        <div className="card-body">
          {faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: index < faqs.length - 1 ? '30px' : '0', paddingBottom: index < faqs.length - 1 ? '30px' : '0', borderBottom: index < faqs.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>
                {index + 1}. {faq.question}
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-body">
          <h3 style={{ marginBottom: '20px' }}>Still Need Help?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div>
              <strong>📞 Phone:</strong> <a href="tel:+250780866714" style={{ color: 'var(--primary-color)' }}>+250 780 866 714</a>
            </div>
            <div>
              <strong>📧 Email:</strong> <a href="mailto:r.kaze@alustudent.com" style={{ color: 'var(--primary-color)' }}>r.kaze@alustudent.com</a>
            </div>
            <div>
              <strong>🕐 Hours:</strong> Mon-Fri, 8AM-6PM (EAT)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
