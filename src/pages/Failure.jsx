import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(15);

  const error = searchParams.get('error');
  const refNo = searchParams.get('ref') || searchParams.get('reference') || searchParams.get('trxref');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/cart');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
        @keyframes scaleIn { from { transform: scale(0.8); } to { transform: scale(1); } }
        .card { animation: slideUp 0.5s ease-out; }
        .x-mark { animation: scaleIn 0.4s ease-out, shake 0.5s ease-out 0.4s; }
      `}</style>

      <div className="card" style={{ background: 'white', borderRadius: '20px', padding: '40px 30px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        
        {/* Error Icon */}
        <div style={{ marginBottom: '25px' }}>
          <svg className="x-mark" width="80" height="80" viewBox="0 0 80 80" style={{ margin: '0 auto' }}>
            <circle cx="40" cy="40" r="38" fill="#ef4444" stroke="none"/>
            <line x1="28" y1="28" x2="52" y2="52" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <line x1="52" y1="28" x2="28" y2="52" stroke="white" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', margin: '0 0 8px 0' }}>
          Payment Failed
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px', lineHeight: '1.5' }}>
          We couldn't process your payment
        </p>

        {/* Reference Number */}
        {refNo && (
          <div style={{ background: '#fef2f2', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: '#991b1b', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Reference Number
            </div>
            <div style={{ fontSize: '16px', color: '#1f2937', fontFamily: 'monospace', fontWeight: '600' }}>
              {refNo}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '14px', marginBottom: '20px', fontSize: '13px', color: '#991b1b', lineHeight: '1.6', textAlign: 'left' }}>
            <strong>Error:</strong> {decodeURIComponent(error)}
          </div>
        )}

        {/* Common Issues */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#92400e', marginBottom: '10px' }}>
            Common Issues:
          </div>
          <ul style={{ fontSize: '13px', color: '#78350f', margin: 0, paddingLeft: '18px', lineHeight: '1.8' }}>
            <li>Insufficient funds</li>
            <li>Incorrect card details</li>
            <li>Card expired or declined</li>
            <li>Network connection issue</li>
          </ul>
        </div>

        {/* Buttons */}
        <button 
          onClick={() => navigate('/checkout')}
          style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)' }}
          onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)'; }}
          onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'; }}
        >
          Try Again
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          <button 
            onClick={() => navigate('/cart')}
            style={{ background: 'white', color: '#6b7280', border: '2px solid #d1d5db', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.target.style.background = '#f9fafb'; e.target.style.borderColor = '#9ca3af'; }}
            onMouseOut={(e) => { e.target.style.background = 'white'; e.target.style.borderColor = '#d1d5db'; }}
          >
            Review Cart
          </button>
          <button 
            onClick={() => window.location.href = 'mailto:accounts@lincoln.edu.gh?subject=Payment Issue - ' + (refNo || 'Unknown')}
            style={{ background: 'white', color: '#ef4444', border: '2px solid #ef4444', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.target.style.background = '#fef2f2'; }}
            onMouseOut={(e) => { e.target.style.background = 'white'; }}
          >
            Get Help
          </button>
        </div>

        {/* Countdown */}
        <div style={{ marginTop: '20px', fontSize: '13px', color: '#9ca3af' }}>
          Redirecting to cart in <strong style={{ color: '#ef4444' }}>{countdown}s</strong>
        </div>

        {/* Support Links */}
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', fontSize: '13px', color: '#6b7280' }}>
          <div style={{ marginBottom: '8px' }}>
            <a href="tel:+233302218100" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>
              📞 +233 302 218 100
            </a>
          </div>
          <div>
            <a href="mailto:accounts@lincoln.edu.gh" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>
              ✉️ accounts@lincoln.edu.gh
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failure;
