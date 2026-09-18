import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Database,
  CheckCircle2,
  HardHat,
  Compass,
  Briefcase,
  Users,
} from 'lucide-react';
import { loginUser, getCurrentUser } from '../utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('management@coalintel.demo');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      loginUser(email, password);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 250);
    } catch (err) {
      setError(err.message || 'Authentication failed.');
      setLoading(false);
    }
  };

  const handleDemoSelect = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
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
      {/* Background Subtle Industrial Grid Pattern */}
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
          maxWidth: '460px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Brand Banner */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #b58a3a 0%, #8c6826 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '20px',
              marginBottom: '14px',
              boxShadow: '0 4px 12px rgba(181, 138, 58, 0.4)',
            }}
          >
            CI
          </div>
          <h1
            style={{
              fontSize: '24px',
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
              fontSize: '12.5px',
              color: '#94a3b8',
              marginTop: '4px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Digital Mining & Geological Information System
          </p>
        </div>

        {/* Login Card */}
        <div
          className="card"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #334155',
            boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.5)',
            padding: '28px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>
              Sign In to Repository
            </h2>
            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
              Enter your credentials to access verified datasets.
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

          <form onSubmit={handleLogin}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@coalintel.demo"
                />
              </div>
            </div>

            <div className="form-group">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <label className="form-label">Password</label>
                <span
                  className="font-mono"
                  style={{ fontSize: '11px', color: '#64748b' }}
                >
                  (demo: demo123)
                </span>
              </div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Demo Fill Selector */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Quick Demo Account Switcher:
            </span>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}
            >
              <button
                type="button"
                onClick={() =>
                  handleDemoSelect('management@coalintel.demo', 'demo123')
                }
                className={`btn btn-secondary btn-sm ${
                  email === 'management@coalintel.demo'
                    ? 'btn-outline-gold'
                    : ''
                }`}
                style={{ justifyContent: 'flex-start', padding: '6px 10px' }}
              >
                <Briefcase size={13} color="#b58a3a" />
                <span>Management</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDemoSelect('geologist@coalintel.demo', 'demo123')
                }
                className={`btn btn-secondary btn-sm ${
                  email === 'geologist@coalintel.demo' ? 'btn-outline-gold' : ''
                }`}
                style={{ justifyContent: 'flex-start', padding: '6px 10px' }}
              >
                <Compass size={13} color="#b58a3a" />
                <span>Geologist</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDemoSelect('engineer@coalintel.demo', 'demo123')
                }
                className={`btn btn-secondary btn-sm ${
                  email === 'engineer@coalintel.demo' ? 'btn-outline-gold' : ''
                }`}
                style={{ justifyContent: 'flex-start', padding: '6px 10px' }}
              >
                <HardHat size={13} color="#b58a3a" />
                <span>Mining Eng.</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDemoSelect('field@coalintel.demo', 'demo123')
                }
                className={`btn btn-secondary btn-sm ${
                  email === 'field@coalintel.demo' ? 'btn-outline-gold' : ''
                }`}
                style={{ justifyContent: 'flex-start', padding: '6px 10px' }}
              >
                <Users size={13} color="#b58a3a" />
                <span>Field Worker</span>
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '12.5px',
              color: '#64748b',
            }}
          >
            Need a new account?{' '}
            <Link
              to="/register"
              style={{
                color: '#b58a3a',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Register demo user
            </Link>
          </div>
        </div>

        {/* Security Stamp */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '11px',
            color: '#64748b',
            fontFamily: 'var(--font-mono)',
          }}
        >
          STANDALONE FRONTEND DEMO • LOCALSTORAGE PERSISTENCE
        </div>
      </div>
    </div>
  );
}
