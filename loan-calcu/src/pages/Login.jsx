import { useState } from 'react';

/**
 * Login Page Component
 * Simple login form with email and password fields
 * No real authentication - just UI for a professional loan calculator
 */
function Login({ onLogin }) {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation (just check if fields are not empty)
    if (email && password) {
      // Call the onLogin function passed from parent
      onLogin();
    } else {
      alert('Please fill in both email and password fields');
    }
  };

  return (
    <div className="login-page fade-in">
      <div className="login-container">
        <div className="card">
          {/* Welcome message */}
          <div className="text-center mb-2">
            <h1>Loan Calcu</h1>
            <p style={{ color: '#718096', fontSize: '1.1rem', marginTop: '1rem' }}>
              Calculate your EMI in seconds
                         Plan better - borrow smarter
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Get Started
            </button>
          </form>

          {/* Simple demo instructions */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', 
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <p style={{ fontSize: '0.95rem', color: '#4a5568', textAlign: 'center', margin: 0 }}>
              <strong></strong> Enter any credentials to experience the tool
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;