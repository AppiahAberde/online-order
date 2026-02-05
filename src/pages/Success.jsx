import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);

  const refNo = searchParams.get('ref') || searchParams.get('reference') || searchParams.get('trxref');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes checkDraw { from { stroke-dashoffset: 166; } to { stroke-dashoffset: 0; } }
        @keyframes scaleIn { from { transform: scale(0.8); } to { transform: scale(1); } }
        .card { animation: slideUp 0.5s ease-out; }
        .check { stroke-dasharray: 166; stroke-dashoffset: 166; animation: checkDraw 0.6s ease-out 0.3s forwards; }
        .circle { animation: scaleIn 0.4s ease-out; }
      `}</style>

      <div className="card" style={{ background: 'white', borderRadius: '20px', padding: '40px 30px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        
        {/* Success Icon */}
        <div style={{ marginBottom: '25px' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ margin: '0 auto' }}>
            <circle className="circle" cx="40" cy="40" r="38" fill="#10b981" stroke="none"/>
            <path className="check" d="M25 40 L35 50 L55 30" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', margin: '0 0 8px 0' }}>
          Payment Successful!
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px', lineHeight: '1.5' }}>
          Your transaction has been processed successfully
        </p>

        {/* Reference Number */}
        {refNo && (
          <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '16px', marginBottom: '25px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Reference Number
            </div>
            <div style={{ fontSize: '16px', color: '#1f2937', fontFamily: 'monospace', fontWeight: '600' }}>
              {refNo}
            </div>
          </div>
        )}

        {/* Info Message */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px', marginBottom: '25px', fontSize: '13px', color: '#1e40af', lineHeight: '1.6', textAlign: 'left' }}>
          <strong>✓ Email Sent:</strong> Check your inbox for the receipt and transaction details.
        </div>

        {/* Buttons */}
        <button 
          onClick={() => navigate('/')}
          style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)' }}
          onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)'; }}
          onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'; }}
        >
          Return to Home
        </button>

        <button 
          onClick={() => navigate('/fieldtrips')}
          style={{ width: '100%', background: 'white', color: '#667eea', border: '2px solid #667eea', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.target.style.background = '#f5f7ff'; }}
          onMouseOut={(e) => { e.target.style.background = 'white'; }}
        >
          Continue Shopping
        </button>

        {/* Countdown */}
        <div style={{ marginTop: '25px', fontSize: '13px', color: '#9ca3af' }}>
          Redirecting in <strong style={{ color: '#667eea' }}>{countdown}s</strong>
        </div>

        {/* Support Link */}
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
          <a href="mailto:accounts@lincoln.edu.gh" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>
            Need help? <span style={{ color: '#667eea', textDecoration: 'underline' }}>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
