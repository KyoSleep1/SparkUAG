import React, { useState, useRef, useEffect } from 'react';

interface VerifyCodeProps {
  email: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
  onResend: () => void;
}

export const VerifyCode: React.FC<VerifyCodeProps> = ({ email, onSubmit, onBack, onResend }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onSubmit(fullCode);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <img 
          src="/app_icon.svg" 
          alt="SmartPark Logo" 
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-white mb-2">Verify Code</h1>
        <p className="text-gray-300">
          We've sent a verification code to<br />
          <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-white text-xl font-bold focus:ring-2 focus:ring-[#D58A31] focus:border-transparent transition-all duration-200"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D58A31] text-white py-3 rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium shadow-lg"
          >
            Verify Code
          </button>

          <div className="text-center space-y-4">
            <button
              type="button"
              onClick={onResend}
              className="text-[#D58A31] hover:text-white transition-colors duration-200"
            >
              Resend Code
            </button>

            <button
              type="button"
              onClick={onBack}
              className="block w-full text-white/80 hover:text-white py-2 transition-colors duration-200"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};