import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <div className="container" style={{ maxWidth: '800px', paddingTop: '40px' }}>
        <div className="alert alert-info">Loading user information...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '40px', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>User Profile</h1>
        <button 
          className="btn btn-secondary"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="card">
        <div className="card-header">Personal Information</div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <strong>Username:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{user.username}</p>
            </div>
            <div>
              <strong>Email:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{user.email || 'Not provided'}</p>
            </div>
            <div>
              <strong>First Name:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{user.first_name || 'Not provided'}</p>
            </div>
            <div>
              <strong>Last Name:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{user.last_name || 'Not provided'}</p>
            </div>
            <div>
              <strong>Phone Number:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{user.phone_number || 'Not provided'}</p>
            </div>
            <div>
              <strong>User Type:</strong>
              <p style={{ margin: '5px 0 0 0', textTransform: 'capitalize' }}>{user.user_type || 'Not specified'}</p>
            </div>
            <div>
              <strong>Preferred Language:</strong>
              <p style={{ margin: '5px 0 0 0', textTransform: 'uppercase' }}>{user.preferred_language || 'EN'}</p>
            </div>
            <div>
              <strong>Account Status:</strong>
              <p style={{ margin: '5px 0 0 0' }}>
                <span style={{
                  background: user.is_active ? '#4caf50' : '#f44336',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {user.cooperative_name && (
        <div className="card">
          <div className="card-header">Organization</div>
          <div className="card-body">
            <div>
              <strong>Cooperative Name:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{user.cooperative_name}</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">Account Details</div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <strong>Member Since:</strong>
              <p style={{ margin: '5px 0 0 0' }}>
                {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div>
              <strong>Last Login:</strong>
              <p style={{ margin: '5px 0 0 0' }}>
                {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
              </p>
            </div>
            <div>
              <strong>Verified:</strong>
              <p style={{ margin: '5px 0 0 0' }}>
                <span style={{
                  background: user.verified_status ? '#4caf50' : '#ff9800',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {user.verified_status ? 'Verified' : 'Pending'}
                </span>
              </p>
            </div>
            <div>
              <strong>Data Consent:</strong>
              <p style={{ margin: '5px 0 0 0' }}>
                {user.data_consent ? 'Granted' : 'Not granted'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Actions</div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Change Password</button>
            <button className="btn btn-secondary">Update Profile</button>
            <button className="btn btn-outline">Download My Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
