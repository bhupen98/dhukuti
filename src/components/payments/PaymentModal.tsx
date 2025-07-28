"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: "card" | "bank" | "upi" | "wallet";
  last4?: string;
  bankName?: string;
  upiId?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
}

export function PaymentModal({ isOpen, onClose, groupId, groupName, amount, onSuccess }: PaymentModalProps) {
  const { data: session } = useSession();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"method" | "details" | "confirm" | "success">("method");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
  });

  // Demo payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card1",
      name: "Visa ending in 4242",
      icon: "💳",
      type: "card",
      last4: "4242"
    },
    {
      id: "card2", 
      name: "Mastercard ending in 8888",
      icon: "💳",
      type: "card",
      last4: "8888"
    },
    {
      id: "bank1",
      name: "HDFC Bank",
      icon: "🏦",
      type: "bank",
      bankName: "HDFC Bank"
    },
    {
      id: "upi1",
      name: "UPI",
      icon: "📱",
      type: "upi",
      upiId: "demo@upi"
    },
    {
      id: "wallet1",
      name: "Paytm Wallet",
      icon: "📱",
      type: "wallet"
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep("details");
  };

  const handleInputChange = (field: string, value: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      
      // Simulate success callback
      setTimeout(() => {
        onSuccess(`pay_${Date.now()}`);
        onClose();
        setStep("method");
        setPaymentDetails({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardholderName: "",
          upiId: "",
          bankAccount: "",
          ifscCode: "",
        });
      }, 2000);
    }, 3000);
  };

  const getSelectedMethod = () => {
    return paymentMethods.find(method => method.id === selectedMethod);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen pt-16 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">💳</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Make Payment</h3>
                  <p className="text-sm text-gray-500">{groupName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Amount Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Payment Amount</p>
                <p className="text-3xl font-bold text-gray-900">₹{amount.toLocaleString()}</p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                {["method", "details", "confirm", "success"].map((stepName, index) => (
                  <div key={stepName} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === stepName 
                        ? "bg-blue-600 text-white" 
                        : index < ["method", "details", "confirm", "success"].indexOf(step)
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {index < ["method", "details", "confirm", "success"].indexOf(step) ? "✓" : index + 1}
                    </div>
                    {index < 3 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        index < ["method", "details", "confirm", "success"].indexOf(step) ? "bg-green-600" : "bg-gray-200"
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            {step === "method" && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Select Payment Method</h4>
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleMethodSelect(method.id)}
                    className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{method.name}</p>
                        {method.last4 && (
                          <p className="text-sm text-gray-500">•••• {method.last4}</p>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Payment Details */}
            {step === "details" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-medium text-gray-900">Payment Details</h4>
                
                {getSelectedMethod()?.type === "card" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          value={paymentDetails.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={paymentDetails.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </>
                )}

                {getSelectedMethod()?.type === "upi" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input
                      type="text"
                      value={paymentDetails.upiId}
                      onChange={(e) => handleInputChange("upiId", e.target.value)}
                      placeholder="username@upi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}

                {getSelectedMethod()?.type === "bank" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={paymentDetails.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                        placeholder="1234567890"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={paymentDetails.ifscCode}
                        onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                        placeholder="HDFC0001234"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep("method")}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {/* Confirmation */}
            {step === "confirm" && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Confirm Payment</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group:</span>
                    <span className="font-medium">{groupName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-medium">{getSelectedMethod()?.name}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep("success")}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}

            {/* Success */}
            {step === "success" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Payment Successful!</h4>
                  <p className="text-sm text-gray-600 mt-1">Your contribution has been processed successfully.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    Transaction ID: <span className="font-mono">TXN{Date.now().toString().slice(-8)}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Processing */}
            {isProcessing && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Processing Payment...</h4>
                  <p className="text-sm text-gray-600 mt-1">Please don't close this window.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== "success" && !isProcessing && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 