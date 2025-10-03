import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock user credentials for different roles
  const mockUsers = [
    { email: "admin@dropoutdash.com", password: "admin123", role: "admin", name: "Rajesh Kumar" },
    { email: "mentor@dropoutdash.com", password: "mentor123", role: "mentor", name: "Priya Sharma" },
    { email: "student@dropoutdash.com", password: "student123", role: "student", name: "Arjun Patel" },
    { email: "ravi.sharma@student.edu", password: "ravi123", role: "student", name: "Ravi Sharma" },
    { email: "anjali.verma@mentor.edu", password: "anjali123", role: "mentor", name: "Anjali Verma" }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials against mock users
      const user = mockUsers?.find(u => 
        u?.email === formData?.email && u?.password === formData?.password
      );

      if (!user) {
        setErrors({ 
          general: 'Invalid email or password. Please check your credentials and try again.' 
        });
        return;
      }

      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        name: user?.name,
        email: user?.email,
        role: user?.role,
        loginTime: new Date()?.toISOString()
      }));

      // Role-based redirect
      switch (user?.role) {
        case 'admin': navigate('/admin-dashboard');
          break;
        case 'mentor': navigate('/mentor-dashboard');
          break;
        case 'student': navigate('/student-profile');
          break;
        default:
          navigate('/student-profile');
      }

    } catch (error) {
      setErrors({ 
        general: 'Login failed. Please try again later.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be available soon. Please contact your administrator.');
  };

  const handleRegisterRedirect = () => {
    navigate('/user-registration');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your DropoutDash account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} color="#EF4444" />
              <p className="text-sm text-red-700">{errors?.general}</p>
            </div>
          )}

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-accent transition-smooth"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Registration Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleRegisterRedirect}
              className="text-primary hover:text-accent font-medium transition-smooth"
              disabled={isLoading}
            >
              Create Account
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-3 flex items-center">
            <Icon name="Info" size={16} className="mr-2" />
            Demo Credentials
          </h3>
          <div className="space-y-2 text-xs text-blue-800">
            <div><strong>Admin:</strong> admin@dropoutdash.com / admin123</div>
            <div><strong>Mentor:</strong> mentor@dropoutdash.com / mentor123</div>
            <div><strong>Student:</strong> student@dropoutdash.com / student123</div>
          </div>
        </div>
      </div>
      {/* Security Badge */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="Shield" size={16} />
          <span>Secured with SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;