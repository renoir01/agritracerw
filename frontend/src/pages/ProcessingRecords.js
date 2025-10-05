import React, { useState } from 'react';

const ProcessingRecords = () => {
  const [formData, setFormData] = useState({
    raw_product_qr: '',
    processing_type: '',
    output_quantity: '',
    quality_grade: '',
    processing_date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing record:', formData);
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '10px' }}>🏭 Processing Records</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Track product processing and quality control
      </p>

      {/* Processing Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚙️</div>
            <h3 style={{ marginBottom: '5px' }}>0 kg</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Processed Today</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
            <h3 style={{ marginBottom: '5px' }}>0%</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Quality Pass Rate</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📦</div>
            <h3 style={{ marginBottom: '5px' }}>0</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Batches Processed</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏱️</div>
            <h3 style={{ marginBottom: '5px' }}>0 hrs</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Avg Processing Time</p>
          </div>
        </div>
      </div>

      {/* New Processing Record */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-header">Record New Processing</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Raw Product QR Code *</label>
              <input
                type="text"
                name="raw_product_qr"
                className="form-control"
                placeholder="Scan raw product QR code"
                value={formData.raw_product_qr}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Processing Type *</label>
                <select
                  name="processing_type"
                  className="form-control"
                  value={formData.processing_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Sorting">Sorting</option>
                  <option value="Milling">Milling</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Fortification">Fortification</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Output Quantity (kg) *</label>
                <input
                  type="number"
                  name="output_quantity"
                  className="form-control"
                  placeholder="e.g., 95"
                  value={formData.output_quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quality Grade *</label>
                <select
                  name="quality_grade"
                  className="form-control"
                  value={formData.quality_grade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select grade</option>
                  <option value="A">Grade A (Premium)</option>
                  <option value="B">Grade B (Standard)</option>
                  <option value="C">Grade C (Basic)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Processing Date *</label>
                <input
                  type="date"
                  name="processing_date"
                  className="form-control"
                  value={formData.processing_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Record Processing
            </button>
          </form>
        </div>
      </div>

      {/* Processing History */}
      <div className="card">
        <div className="card-header">Processing History</div>
        <div className="card-body">
          <div className="alert alert-info">
            No processing records yet. Start recording your processing activities above.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingRecords;
