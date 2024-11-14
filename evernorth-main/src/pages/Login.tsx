import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Calendar, Phone, ArrowLeft } from 'lucide-react';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  validateMemberId,
  validateDOB,
  validateMobile,
  validateOTP,
} from '../utils/validation';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    memberId: '',
    dob: '',
    mobile: '',
    otp: '',
  });
  const [errors, setErrors] = useState({
    memberId: '',
    dob: '',
    mobile: '',
    otp: '',
  });
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateForm = (): boolean => {
    const newErrors = {
      memberId: validateMemberId(formData.memberId) || '',
      dob: validateDOB(formData.dob) || '',
      mobile: validateMobile(formData.mobile) || '',
      otp: showOTP ? validateOTP(formData.otp) || '' : '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate OTP generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOTP(true);
      setTimer(30); // Start 30-second timer
      toast.success('OTP sent successfully!');
    } catch (error) {
      toast.error('Failed to generate OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      login();
      navigate('/profile-setup');
      toast.success('Validation successful!');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate('/')}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Member Validation</h1>
            <p className="mt-1 text-gray-600">Please verify your identity to continue</p>
          </div>
        </div>

        <form onSubmit={showOTP ? handleValidate : handleGenerateOTP} className="space-y-4">
          <Input
            icon={UserCheck}
            label="Member ID"
            placeholder="Enter your member ID"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            error={errors.memberId}
            required
            disabled={showOTP}
          />

          <Input
            icon={Calendar}
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            error={errors.dob}
            required
            disabled={showOTP}
          />

          <Input
            icon={Phone}
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            error={errors.mobile}
            required
            disabled={showOTP}
          />

          {showOTP && (
            <div className="space-y-2">
              <Input
                label="OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                error={errors.otp}
                required
                maxLength={6}
              />
              {timer > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend OTP in {timer} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(30);
                    toast.success('New OTP sent successfully!');
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || (showOTP && timer === 0)}
          >
            {loading ? 'Processing...' : showOTP ? 'Validate OTP' : 'Generate OTP'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;