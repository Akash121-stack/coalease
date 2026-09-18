import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  User,
  Mail,
  Lock,
  Building,
  HardHat,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { registerUser } from '../utils/storage';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Geologist',
    department: 'Geological Services & Exploration',
    location: 'Ranchi Regional Center',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    try {
      registerUser(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  const handleRoleChange = (role) => {
    let defaultDept = 'General Mining Operations';
    if (role === 'Management') defaultDept = 'Executive Operations & Strategic Planning';
    if (role === 'Geologist') defaultDept = 'Geological Services & Core Exploration';
    if (role === 'Mining Engineer') defaultDept = 'Mine Planning & Heavy Extraction';
    if (role === 'Field Worker') defaultDept = 'Borehole Drilling & Pit Survey';

    setFormData({ ...formData, role, department: defaultDept });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#12161d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(181, 138, 58, 0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Brand Banner */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #b58a3a 0%, #8c6826 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '18px',
              marginBottom: '10px',
              boxShadow: '0 4px 12px rgba(181, 138, 58, 0.4)',
            }}
          >
            CI
          </div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.3px',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
            }}
          >
            Coal Intelligence
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
            }}
          >
            User Registration & Access Authorization
          </p>
        </div>

        {/* Form Card */}
        <div
          className="card"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #334155',
            boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.5)',
            padding: '28px',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>
              Create Account
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Select your role to tailor your repository workspace.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: '6px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#991b1b',
                fontSize: '12.5px',
                marginBottom: '16px',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              style={{
                backgroundColor: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '6px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#14532d',
                fontSize: '12.5px',
                marginBottom: '16px',
              }}
            >
              <CheckCircle2 size={16} />
              <span>Registration successful! Launching workspace...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name & Title</label>
              <div style={{ position: 'relative' }}>
                <User
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                  }}
                />
                <input
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="e.g., Dr. Sunita Mahato"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email & Password */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8',
                    }}
                  />
                  <input
                    type="email"
                    required
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                    placeholder="user@domain.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8',
                    }}
                  />
                  <input
                    type="password"
                    required
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="form-group">
              <label className="form-label">Role Classification</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}
              >
                {['Management', 'Geologist', 'Mining Engineer', 'Field Worker'].map(
                  (r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRoleChange(r)}
                      style={{
                        padding: '10px',
                        border: `1.5px solid ${
                          formData.role === r ? '#b58a3a' : '#cbd5e1'
                        }`,
                        backgroundColor:
                          formData.role === r ? '#fbf6ec' : '#f8fafc',
                        borderRadius: '6px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: formData.role === r ? 700 : 500,
                        color: formData.role === r ? '#8c6826' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{r}</span>
                      {formData.role === r && (
                        <CheckCircle2 size={14} color="#b58a3a" />
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">Department / Unit</label>
              <div style={{ position: 'relative' }}>
                <Building
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                  }}
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '8px' }}
            >
              <span>Register & Access Platform</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '18px',
              textAlign: 'center',
              fontSize: '12.5px',
              color: '#64748b',
            }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#b58a3a',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
