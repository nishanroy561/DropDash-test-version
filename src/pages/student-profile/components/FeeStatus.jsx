import React from 'react';
import Icon from '../../../components/AppIcon';

const FeeStatus = ({ feeData }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'overdue':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <Icon name="CreditCard" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Fee Status</h3>
          <p className="text-sm text-gray-600">Payment history and outstanding amounts</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Fees</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(feeData?.totalFees)}</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
          <p className="text-xl font-bold text-green-600">{formatCurrency(feeData?.paidAmount)}</p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Outstanding</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(feeData?.outstandingAmount)}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Payment History</h4>
        {feeData?.paymentHistory?.map((payment, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name={getStatusIcon(payment?.status)} size={20} />
              <div>
                <p className="font-medium text-gray-900">{payment?.description}</p>
                <p className="text-sm text-gray-600">Due: {formatDate(payment?.dueDate)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(payment?.amount)}</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment?.status)}`}>
                <Icon name={getStatusIcon(payment?.status)} size={12} className="mr-1" />
                {payment?.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      {feeData?.outstandingAmount > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <div>
              <p className="font-medium text-red-800">Payment Overdue</p>
              <p className="text-sm text-red-600">
                Outstanding amount of {formatCurrency(feeData?.outstandingAmount)} is overdue by {feeData?.overdueDays} days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStatus;