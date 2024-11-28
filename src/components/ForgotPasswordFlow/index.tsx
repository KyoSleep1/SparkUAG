import React, { useState } from 'react';
import { RequestReset } from './RequestReset';
import { VerifyCode } from './VerifyCode';
import { ResetPassword } from './ResetPassword';
import { SuccessReset } from './SuccessReset';

interface ForgotPasswordFlowProps {
  onBackToLogin: () => void;
}

type Step = 'request' | 'verify' | 'reset' | 'success';

export const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({ onBackToLogin }) => {
  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');

  const handleRequestSubmit = (email: string) => {
    setEmail(email);
    // Here you would typically call an API to send the reset code
    setStep('verify');
  };

  const handleVerifySubmit = (code: string) => {
    // Here you would typically verify the code with an API
    setStep('reset');
  };

  const handleResendCode = () => {
    // Here you would typically call an API to resend the code
  };

  const handleResetSubmit = (password: string) => {
    // Here you would typically call an API to update the password
    setStep('success');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181A2D] to-[#68262F] flex flex-col items-center justify-center p-4 sm:p-6">
      {step === 'request' && (
        <RequestReset 
          onSubmit={handleRequestSubmit}
          onBack={onBackToLogin}
        />
      )}
      {step === 'verify' && (
        <VerifyCode 
          email={email}
          onSubmit={handleVerifySubmit}
          onBack={() => setStep('request')}
          onResend={handleResendCode}
        />
      )}
      {step === 'reset' && (
        <ResetPassword 
          onSubmit={handleResetSubmit}
        />
      )}
      {step === 'success' && (
        <SuccessReset 
          onBackToLogin={onBackToLogin}
        />
      )}
    </div>
  );
};