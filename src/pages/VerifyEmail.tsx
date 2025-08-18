import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const VerifyEmail: React.FC = () => {
  const { verifyEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (!token || !email) {
      toast.error('Invalid verification link.');
      setStatus('error');
      return;
    }

    const doVerify = async () => {
      try {
        // email from URL might be percent-encoded
        const ok = await verifyEmail(token, decodeURIComponent(email));
        if (ok) {
          toast.success('Email verified! Redirecting...');
          setStatus('success');
          // Redirect to dashboard or home after brief delay
          setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
        } else {
          toast.error('Verification failed. The token may be invalid or expired.');
          setStatus('error');
          // Redirect to login so user can request resend
          setTimeout(() => navigate('/login', { replace: true }), 2000);
        }
      } catch (err: any) {
        console.error('Email verification error (frontend):', err);
        toast.error(err?.message || 'Verification failed.');
        setStatus('error');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    };

    doVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster />
      <div className="max-w-xl w-full bg-white p-8 rounded shadow">
        {status === 'loading' && (
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <h2 className="mt-4 text-lg font-medium">Verifying your email...</h2>
            <p className="mt-2 text-sm text-gray-600">Please wait while we verify your account.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">Email verified</h2>
            <p className="mt-2 text-sm text-gray-700">You're all set — redirecting now.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600">Verification failed</h2>
            <p className="mt-2 text-sm text-gray-700">The verification link is invalid or has expired.</p>
            <div className="mt-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
