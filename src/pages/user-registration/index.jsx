import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadges from './components/SecurityBadges';

const UserRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - DropoutDash | Educational Analytics Platform</title>
        <meta name="description" content="Create your DropoutDash account to access AI-powered educational analytics and student dropout prediction tools." />
        <meta name="keywords" content="student analytics, dropout prediction, educational dashboard, student mentoring" />
      </Helmet>
      <div className="min-h-screen bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          <RegistrationHeader />
          
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 mt-12">
            <div className="w-full lg:w-auto">
              <RegistrationForm />
            </div>
            
            <div className="w-full lg:w-auto">
              <SecurityBadges />
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Trusted by Educational Institutions Worldwide
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">10,000+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">500+</div>
                  <div className="text-sm text-gray-600">Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">95%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; {new Date()?.getFullYear()} DropoutDash. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <button className="hover:text-primary transition-smooth">Privacy Policy</button>
                <button className="hover:text-primary transition-smooth">Terms of Service</button>
                <button className="hover:text-primary transition-smooth">Support</button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;