import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'student', label: 'Student' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select a role';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms of service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const userData = {
        id: Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        role: formData?.role,
        registeredAt: new Date()?.toISOString()
      };

      // Store user data in localStorage for demo
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Redirect based on role
      switch (formData?.role) {
        case 'admin': navigate('/admin-dashboard');
          break;
        case 'mentor': navigate('/mentor-dashboard');
          break;
        case 'student': navigate('/student-profile');
          break;
        default:
          navigate('/user-login');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData?.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;

    const strengthMap = {
      0: { label: '', color: '' },
      1: { label: 'Very Weak', color: 'bg-red-500' },
      2: { label: 'Weak', color: 'bg-orange-500' },
      3: { label: 'Fair', color: 'bg-yellow-500' },
      4: { label: 'Good', color: 'bg-blue-500' },
      5: { label: 'Strong', color: 'bg-green-500' }
    };

    return { strength, ...strengthMap?.[strength] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="UserPlus" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join DropoutDash to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <div className="space-y-2">
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            {formData?.password && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                      style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{passwordStrength?.label}</span>
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />

          <Select
            label="Select Role"
            placeholder="Choose your role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          <div className="space-y-4">
            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e?.target?.checked)}
              error={errors?.terms}
              required
            />

            {errors?.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors?.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/user-login')}
              className="text-primary hover:text-accent font-medium transition-smooth"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;