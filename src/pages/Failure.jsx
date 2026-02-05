import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../App.css';

/**
 * Failure page component displayed after a failed payment.
 * Shows error details and options to retry or get help.
 * 
 * @component
 * @returns {JSX.Element} The rendered Failure page component.
 */
const Failure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(15);

  const sessionId = searchParams.get('session_id');
  const error = searchParams.get('error');
  const refNo = searchParams.get('ref');

  useEffect(() => {
    // Countdown timer to redirect to cart
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

  const handleRetry = () => {
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:accounts@lincoln.edu.gh?subject=Payment Issue - ' + (refNo || sessionId || 'Unknown Reference');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with animated X icon */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Payment Failed
          </h1>
          <p className="text-red-100 text-lg">
            We couldn't process your payment
          </p>
        </div>

        {/* Error Details */}
        <div className="px-8 py-8">
          <div className="bg-red-50 rounded-xl p-6 mb-6 border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Transaction Failed
            </h2>

            <div className="space-y-3">
              {refNo && (
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-gray-600 font-medium">Reference Number:</span>
                  <span className="text-gray-900 font-semibold">{refNo}</span>
                </div>
              )}
              {sessionId && (
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-gray-600 font-medium">Session ID:</span>
                  <span className="text-gray-900 font-mono text-sm break-all">{sessionId}</span>
                </div>
              )}
              {error && (
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-gray-600 font-medium">Error:</span>
                  <span className="text-red-700 font-semibold">{decodeURIComponent(error)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Failed
                </span>
              </div>
            </div>
          </div>

          {/* Troubleshooting Guide */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                  Common Reasons for Payment Failure:
                </h3>
                <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                  <li>Insufficient funds in your account</li>
                  <li>Incorrect card details or expired card</li>
                  <li>Bank declined the transaction</li>
                  <li>Network or connection issues</li>
                  <li>Payment security validation failed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What to do next */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  What You Can Do:
                </h3>
                <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                  <li>Try a different payment method</li>
                  <li>Check your card details and try again</li>
                  <li>Contact your bank for more information</li>
                  <li>Reach out to our support team for assistance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again with Different Payment
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoToCart}
                className="flex-1 bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Review Cart
              </button>
              <button
                onClick={handleContactSupport}
                className="flex-1 bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </button>
            </div>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Redirecting to cart in <span className="font-semibold text-gray-700">{countdown}</span> seconds...
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Need immediate assistance? Call{' '}
            <a
              href="tel:+233302218100"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              +233 302 218 100
            </a>
            {' '}or email{' '}
            <a
              href="mailto:accounts@lincoln.edu.gh"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              accounts@lincoln.edu.gh
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Failure;
